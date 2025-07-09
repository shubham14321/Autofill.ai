import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { LoginModal } from '../components/LoginModal';
import { Link } from 'wouter';

export const Home: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Auto-popup login after 3 seconds if not signed in
    if (!loading && !user) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  const handleGetStarted = () => {
    if (user) {
      // Navigate to dashboard if logged in
      window.location.href = '/dashboard';
    } else {
      // Show login modal if not logged in
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('home.title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('home.subtitle')}
              </p>
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-lg text-lg transform hover:scale-105 transition-all duration-200"
              >
                <i className="fas fa-rocket mr-2"></i>
                {t('home.getStarted')}
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-user-circle text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">One Profile</h3>
              <p className="text-gray-600">Fill your profile once with all your personal information</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-magic text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Auto-Fill</h3>
              <p className="text-gray-600">Let AI automatically fill all Indian government forms</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-download text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download PDFs</h3>
              <p className="text-gray-600">Get professional PDFs with your signature and photo</p>
            </div>
          </div>

          {/* Form Categories */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Supported Form Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Banking', icon: 'fas fa-university', count: '2 forms' },
                { name: 'Education', icon: 'fas fa-graduation-cap', count: '2 forms' },
                { name: 'Government', icon: 'fas fa-landmark', count: '4 forms' },
                { name: 'Health', icon: 'fas fa-hospital', count: '1 form' },
                { name: 'Job', icon: 'fas fa-briefcase', count: '1 form' },
              ].map((category) => (
                <div key={category.name} className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <i className={`${category.icon} text-3xl text-primary mb-2`}></i>
                  <h4 className="font-semibold text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </>
  );
};
