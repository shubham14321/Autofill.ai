import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FormStatusBadge } from '../components/FormStatusBadge';
import { useLocation } from 'wouter';

export const FormHistory: React.FC = () => {
  const { t } = useLanguage();
  const { dbUser } = useAuth();
  const [, setLocation] = useLocation();

  const { data: formSubmissions = [], isLoading } = useQuery({
    queryKey: ['/api/form-submissions', dbUser?.id],
    enabled: !!dbUser?.id,
  });

  const { data: forms = [] } = useQuery({
    queryKey: ['/api/forms'],
    enabled: !!dbUser,
  });

  // Create a map of form IDs to form details
  const formMap = React.useMemo(() => {
    const map: { [key: number]: any } = {};
    forms.forEach((form: any) => {
      map[form.id] = form;
    });
    return map;
  }, [forms]);

  const enrichedSubmissions = formSubmissions.map((submission: any) => ({
    ...submission,
    form: formMap[submission.formId],
  }));

  const handleViewForm = (formId: number) => {
    setLocation(`/form/${formId}`);
  };

  const handleDownloadPDF = async (submission: any) => {
    // In a real implementation, this would re-generate or retrieve the stored PDF
    console.log('Download PDF for submission:', submission.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p>Loading form history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{t('history.title')}</CardTitle>
            <p className="text-muted-foreground">
              Track all your form submissions and downloads
            </p>
          </CardHeader>
          <CardContent>
            {enrichedSubmissions.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-file-alt text-6xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No forms filled yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start by filling out your first form from our library
                </p>
                <Button
                  onClick={() => setLocation('/forms')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Fill Your First Form
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('history.formName')}</TableHead>
                      <TableHead>{t('history.category')}</TableHead>
                      <TableHead>{t('history.status')}</TableHead>
                      <TableHead>{t('history.date')}</TableHead>
                      <TableHead>{t('history.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrichedSubmissions.map((submission: any) => (
                      <TableRow key={submission.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center">
                            <i className={`${submission.form?.icon || 'fas fa-file-alt'} text-primary mr-3`}></i>
                            <span className="font-medium">
                              {submission.form?.name || `Form #${submission.formId}`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">
                            {submission.form?.category || 'Unknown'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <FormStatusBadge status={submission.status} />
                        </TableCell>
                        <TableCell>
                          {new Date(submission.submittedAt).toLocaleDateString('en-IN')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {submission.status === 'completed' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadPDF(submission)}
                                className="text-primary hover:text-primary/80"
                              >
                                <i className="fas fa-download"></i>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewForm(submission.formId)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <i className="fas fa-eye"></i>
                            </Button>
                            {submission.status === 'pending_info' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewForm(submission.formId)}
                                className="text-amber-600 hover:text-amber-700"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
