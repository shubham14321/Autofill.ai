import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import { signOutUser } from '../lib/auth';
import { LoginModal } from './LoginModal';
import { useToast } from '@/hooks/use-toast';

export const Navbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <>
      <nav className="bg-background shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <i className="fas fa-robot text-2xl text-primary mr-2"></i>
                <span className="text-xl font-bold text-foreground">{t('nav.title')}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-muted-foreground hover:text-foreground"
              >
                <i className="fas fa-language mr-2"></i>
                {t('nav.language')}
              </Button>
              {!loading && (
                user ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {user.displayName || user.email}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowLoginModal(true)}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    {t('nav.login')}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </>
  );
};
