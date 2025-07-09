import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '../lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../hooks/useAuth';

export const Admin: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingForm, setEditingForm] = useState<any>(null);
  const { dbUser } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    icon: '',
    template: { fields: [] as string[] },
  });

  // Fetch all forms for management
  const { data: forms = [], isLoading: formsLoading } = useQuery({
    queryKey: ['/api/forms'],
  });

  // Fetch all users for analytics
  const { data: users = [] } = useQuery({
    queryKey: ['/api/users'],
  });

  // Fetch all form submissions for analytics
  const { data: submissions = [] } = useQuery({
    queryKey: ['/api/form-submissions'],
  });

  const createFormMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/forms', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/forms'] });
      toast({
        title: "Form created successfully",
        description: "The new form template has been added to the library",
      });
      setShowCreateForm(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error creating form",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const updateFormMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return await apiRequest('PUT', `/api/forms/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/forms'] });
      toast({
        title: "Form updated successfully",
        description: "The form template has been updated",
      });
      setEditingForm(null);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error updating form",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const deleteFormMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest('DELETE', `/api/forms/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/forms'] });
      toast({
        title: "Form deleted successfully",
        description: "The form template has been removed from the library",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting form",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      icon: '',
      template: { fields: [] },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingForm) {
      updateFormMutation.mutate({ id: editingForm.id, data: formData });
    } else {
      createFormMutation.mutate(formData);
    }
  };

  const handleEdit = (form: any) => {
    setEditingForm(form);
    setFormData({
      name: form.name,
      category: form.category,
      description: form.description,
      icon: form.icon,
      template: form.template || { fields: [] },
    });
    setShowCreateForm(true);
  };

  const handleDelete = (formId: number) => {
    if (confirm('Are you sure you want to delete this form? This action cannot be undone.')) {
      deleteFormMutation.mutate(formId);
    }
  };

  const availableFields = [
    'fullName', 'dateOfBirth', 'gender', 'fatherName', 'motherName',
    'mobileNumber', 'email', 'aadhaarNumber', 'panNumber', 'passportNumber',
    'streetAddress', 'city', 'state', 'pinCode'
  ];

  const categories = ['Banking', 'Education', 'Government', 'Health', 'Job'];
  const icons = [
    'fas fa-university', 'fas fa-graduation-cap', 'fas fa-landmark',
    'fas fa-hospital', 'fas fa-briefcase', 'fas fa-id-card',
    'fas fa-credit-card', 'fas fa-school', 'fas fa-vote-yea',
    'fas fa-file-invoice-dollar', 'fas fa-home', 'fas fa-signature'
  ];

  // Calculate analytics
  const totalUsers = users.length;
  const totalForms = forms.length;
  const totalSubmissions = submissions.length;
  const completedSubmissions = submissions.filter((s: any) => s.status === 'completed').length;
  const pendingSubmissions = submissions.filter((s: any) => s.status === 'pending_info').length;

  // Category distribution
  const categoryStats = categories.reduce((acc, category) => {
    acc[category] = forms.filter((f: any) => f.category === category).length;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage form templates, view analytics, and monitor system usage
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forms">Form Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <i className="fas fa-users text-2xl text-blue-600"></i>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    Registered users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
                  <i className="fas fa-file-alt text-2xl text-green-600"></i>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalForms}</div>
                  <p className="text-xs text-muted-foreground">
                    Available form templates
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                  <i className="fas fa-paper-plane text-2xl text-purple-600"></i>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalSubmissions}</div>
                  <p className="text-xs text-muted-foreground">
                    Forms submitted
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <i className="fas fa-chart-line text-2xl text-orange-600"></i>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {totalSubmissions > 0 ? Math.round((completedSubmissions / totalSubmissions) * 100) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Forms completed
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Forms by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(categoryStats).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {submissions.slice(0, 5).map((submission: any) => (
                      <div key={submission.id} className="flex items-center justify-between text-sm">
                        <span>Form #{submission.formId} submitted</span>
                        <span className="text-muted-foreground">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Form Management Tab */}
          <TabsContent value="forms" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Form Templates</h2>
              <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetForm(); setEditingForm(null); }}>
                    <i className="fas fa-plus mr-2"></i>
                    Create New Form
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingForm ? 'Edit Form Template' : 'Create New Form Template'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Form Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="icon">Icon</Label>
                      <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                        <SelectContent>
                          {icons.map((icon) => (
                            <SelectItem key={icon} value={icon}>
                              <i className={`${icon} mr-2`}></i>
                              {icon}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Required Fields</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {availableFields.map((field) => (
                          <label key={field} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.template.fields.includes(field)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    template: {
                                      ...prev.template,
                                      fields: [...prev.template.fields, field]
                                    }
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    template: {
                                      ...prev.template,
                                      fields: prev.template.fields.filter(f => f !== field)
                                    }
                                  }));
                                }
                              }}
                            />
                            <span className="text-sm">{field}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={createFormMutation.isPending || updateFormMutation.isPending}
                      >
                        {(createFormMutation.isPending || updateFormMutation.isPending) ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            {editingForm ? 'Updating...' : 'Creating...'}
                          </>
                        ) : (
                          editingForm ? 'Update Form' : 'Create Form'
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent>
                {formsLoading ? (
                  <div className="text-center py-8">
                    <i className="fas fa-spinner fa-spin text-2xl text-primary mb-4"></i>
                    <p>Loading forms...</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Fields</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {forms.map((form: any) => (
                        <TableRow key={form.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <i className={`${form.icon} text-primary mr-2`}></i>
                              <span className="font-medium">{form.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{form.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {form.template?.fields?.length || 0} fields
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={form.isActive ? "default" : "secondary"}>
                              {form.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(form)}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(form.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Completed</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${totalSubmissions > 0 ? (completedSubmissions / totalSubmissions) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{completedSubmissions}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pending Info</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-amber-600 h-2 rounded-full" 
                            style={{ width: `${totalSubmissions > 0 ? (pendingSubmissions / totalSubmissions) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{pendingSubmissions}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Forms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {forms.slice(0, 5).map((form: any) => {
                      const submissionCount = submissions.filter((s: any) => s.formId === form.id).length;
                      return (
                        <div key={form.id} className="flex items-center justify-between">
                          <span className="text-sm">{form.name}</span>
                          <Badge variant="secondary">{submissionCount}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-muted-foreground">
                  Overview of registered users and their activity
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <i className="fas fa-users text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    User Management
                  </h3>
                  <p className="text-gray-600">
                    Total registered users: {totalUsers}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Detailed user management features would be implemented here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
