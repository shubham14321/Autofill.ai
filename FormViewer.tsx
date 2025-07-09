import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '../hooks/useAuth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useParams } from 'wouter';
import { mapProfileToFormData, getMissingFields, getFieldLabel } from '../lib/forms';
import { generatePDF, downloadPDF } from '../lib/pdf';
import { apiRequest, queryClient } from '../lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export const FormViewer: React.FC = () => {
  const [textColor, setTextColor] = useState<'black' | 'blue'>('black');
  const [, setLocation] = useLocation();
  const { id } = useParams();
  const { dbUser } = useAuth();
  const { toast } = useToast();

  const { data: form, isLoading: formLoading } = useQuery({
    queryKey: ['/api/forms', id],
    enabled: !!id,
  });

  const { data: profile } = useQuery({
    queryKey: ['/api/profiles', dbUser?.id],
    enabled: !!dbUser?.id,
  });

  const createSubmissionMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/form-submissions', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/form-submissions'] });
      toast({
        title: "Form submitted successfully",
        description: "Your form has been saved and is ready for download",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error submitting form",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  if (formLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p>Loading form...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p>Form not found</p>
        </div>
      </div>
    );
  }

  const formData = profile ? mapProfileToFormData(profile, form.template) : {};
  const missingFields = profile ? getMissingFields(profile, form.template) : [];
  const hasSignature = profile?.signature && profile.signature.trim() !== '';
  const hasPhoto = profile?.profilePhoto && profile.profilePhoto.trim() !== '';

  const handleDownloadPDF = async () => {
    try {
      const pdfBytes = await generatePDF({
        textColor,
        formName: form.name,
        formData,
        includeSignature: hasSignature,
        includePhoto: hasPhoto,
        signature: profile?.signature,
        photo: profile?.profilePhoto,
      });

      const fileName = `${form.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadPDF(pdfBytes, fileName);

      // Create form submission record
      const status = missingFields.length > 0 ? 'pending_info' : 'completed';
      await createSubmissionMutation.mutateAsync({
        userId: dbUser?.id,
        formId: form.id,
        status,
        formData,
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error generating PDF",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => setLocation('/forms')}
                  className="mr-4"
                >
                  <i className="fas fa-arrow-left"></i>
                </Button>
                <div>
                  <CardTitle className="text-2xl font-bold">{form.name}</CardTitle>
                  <p className="text-muted-foreground">
                    {form.category} • Auto-filled from your profile
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Text Color:</span>
                  <Select value={textColor} onValueChange={(value: 'black' | 'blue') => setTextColor(value)}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleDownloadPDF}
                  className="bg-primary hover:bg-primary/90"
                  disabled={createSubmissionMutation.isPending}
                >
                  {createSubmissionMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-download mr-2"></i>
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Form Preview */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {form.name.toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600">APPLICATION FORM</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {form.template?.fields?.map((fieldId: string) => (
                    <div key={fieldId}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {getFieldLabel(fieldId)}
                      </label>
                      <div className={`px-4 py-2 rounded-lg border ${
                        formData[fieldId] 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <span className="text-gray-900">
                          {formData[fieldId] || 'Not provided'}
                        </span>
                        <i className={`fas ${
                          formData[fieldId] ? 'fa-check text-green-600' : 'fa-times text-red-600'
                        } float-right mt-1`}></i>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Missing Information Alert */}
                {missingFields.length > 0 && (
                  <Alert className="mt-6 border-amber-200 bg-amber-50">
                    <i className="fas fa-exclamation-triangle text-amber-600"></i>
                    <AlertDescription>
                      <strong>Missing Information:</strong> {missingFields.length} field(s) are incomplete.{' '}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary hover:underline"
                        onClick={() => setLocation('/profile')}
                      >
                        Edit Profile
                      </Button>{' '}
                      to complete them.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Photo and Signature Placeholders */}
                <div className="mt-8 flex justify-between items-end">
                  <div className="text-center">
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-2">
                      {hasPhoto ? (
                        <i className="fas fa-check text-green-600 text-2xl"></i>
                      ) : (
                        <i className="fas fa-camera text-gray-400 text-2xl"></i>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Photo</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-2">
                      {hasSignature ? (
                        <i className="fas fa-check text-green-600"></i>
                      ) : (
                        <i className="fas fa-signature text-gray-400"></i>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Digital Signature</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
