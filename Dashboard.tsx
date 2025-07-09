import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { ProfileProgress } from '../components/ProfileProgress';
import { FormStatusBadge } from '../components/FormStatusBadge';
import { Link } from 'wouter';

export const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user, dbUser } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['/api/profiles', dbUser?.id],
    enabled: !!dbUser?.id,
  });

  const { data: formSubmissions = [] } = useQuery({
    queryKey: ['/api/form-submissions', dbUser?.id],
    enabled: !!dbUser?.id,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['/api/notifications', dbUser?.id],
    enabled: !!dbUser?.id,
  });

  const completedForms = formSubmissions.filter((s: any) => s.status === 'completed').length;
  const pendingForms = formSubmissions.filter((s: any) => s.status === 'pending_info').length;
  const inProgressForms = formSubmissions.filter((s: any) => s.status === 'in_progress').length;

  const recentSubmissions = formSubmissions.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.displayName || user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <i className="fas fa-user text-2xl text-gray-500"></i>
                  </div>
                  <CardTitle className="text-xl">{user?.displayName || 'User'}</CardTitle>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </CardHeader>
              <CardContent>
                <ProfileProgress
                  completionPercentage={profile?.completionPercentage || 0}
                  onEditProfile={() => (window.location.href = '/profile')}
                />
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formSubmissions.length}</div>
                    <div className="text-sm text-gray-600">Forms Filled</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{completedForms}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.quickActions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/forms">
                    <Button variant="outline" className="w-full justify-start p-4 h-auto">
                      <i className="fas fa-plus-circle text-2xl text-primary mr-4"></i>
                      <div className="text-left">
                        <div className="font-medium">{t('dashboard.fillNewForm')}</div>
                        <div className="text-sm text-muted-foreground">{t('dashboard.browseLibrary')}</div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/history">
                    <Button variant="outline" className="w-full justify-start p-4 h-auto">
                      <i className="fas fa-history text-2xl text-green-600 mr-4"></i>
                      <div className="text-left">
                        <div className="font-medium">{t('dashboard.viewHistory')}</div>
                        <div className="text-sm text-muted-foreground">{formSubmissions.length} forms filled</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSubmissions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <i className="fas fa-file-alt text-4xl mb-4"></i>
                      <p>No forms filled yet</p>
                      <Link href="/forms">
                        <Button className="mt-4" size="sm">
                          Fill Your First Form
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    recentSubmissions.map((submission: any) => (
                      <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <i className="fas fa-file-alt text-primary mr-3"></i>
                          <div>
                            <div className="font-medium">Form #{submission.formId}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormStatusBadge status={submission.status} />
                          <Button variant="ghost" size="sm">
                            <i className="fas fa-eye"></i>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.notifications')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      <i className="fas fa-bell text-2xl mb-2"></i>
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.slice(0, 3).map((notification: any) => (
                      <div key={notification.id} className="flex items-start p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <i className="fas fa-exclamation-triangle text-amber-600 mr-3 mt-0.5"></i>
                        <div className="flex-1">
                          <div className="font-medium">{notification.title}</div>
                          <div className="text-sm text-muted-foreground">{notification.message}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
