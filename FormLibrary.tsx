import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FormCard } from '../components/FormCard';
import { useLocation } from 'wouter';

export const FormLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useLanguage();
  const { dbUser } = useAuth();
  const [, setLocation] = useLocation();

  const { data: forms = [], isLoading } = useQuery({
    queryKey: ['/api/forms', selectedCategory],
    enabled: !!dbUser,
  });

  const { data: profile } = useQuery({
    queryKey: ['/api/profiles', dbUser?.id],
    enabled: !!dbUser?.id,
  });

  const { data: searchResults = [] } = useQuery({
    queryKey: ['/api/search/forms', searchTerm],
    enabled: !!searchTerm && searchTerm.length > 2,
  });

  const displayForms = searchTerm.length > 2 ? searchResults : forms;

  const categories = [
    { value: 'all', label: t('forms.allCategories') },
    { value: 'Banking', label: 'Banking' },
    { value: 'Education', label: 'Education' },
    { value: 'Government', label: 'Government' },
    { value: 'Health', label: 'Health' },
    { value: 'Job', label: 'Job' },
  ];

  const handleFillForm = (formId: number) => {
    setLocation(`/form/${formId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p>Loading forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <CardTitle className="text-2xl font-bold mb-4 md:mb-0">
                {t('forms.title')}
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Input
                    placeholder={t('forms.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="rounded-full"
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayForms.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <i className="fas fa-file-alt text-6xl text-gray-400 mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {searchTerm ? 'No forms found' : 'No forms available'}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? 'Try adjusting your search terms'
                      : 'Check back later for new forms'}
                  </p>
                </div>
              ) : (
                displayForms.map((form: any) => (
                  <FormCard
                    key={form.id}
                    form={form}
                    onFillForm={handleFillForm}
                    autoFillable={profile?.completionPercentage >= 70}
                    missingFields={profile?.completionPercentage < 70 ? 3 : 0}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
