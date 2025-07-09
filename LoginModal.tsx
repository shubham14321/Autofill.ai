import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '../contexts/LanguageContext';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../lib/auth';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onOpenChange }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password, name);
        toast({
          title: "Account created successfully!",
          description: "Welcome to Autofill.Ai",
        });
      } else {
        await signInWithEmail(email, password);
        toast({
          title: "Signed in successfully!",
          description: "Welcome back to Autofill.Ai",
        });
      }
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // The redirect will handle the rest
    } catch (error: any) {
      toast({
        title: "Google sign-in failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-user-circle text-4xl text-primary"></i>
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            {isSignUp ? 'Create Account' : t('modal.welcome')}
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            {isSignUp ? 'Join Autofill.Ai to get started' : t('modal.signIn')}
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full"
            type="button"
          >
            <i className="fab fa-google text-red-500 mr-2"></i>
            {t('modal.continueGoogle')}
          </Button>
          
          <Button
            variant="outline"
            className="w-full bg-green-600 text-white hover:bg-green-700"
            type="button"
          >
            <i className="fas fa-sms mr-2"></i>
            {t('modal.signInOTP')}
          </Button>
          
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              {t('modal.continueEmail')}
            </span>
          </div>
          
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('modal.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('modal.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <i className="fas fa-spinner fa-spin mr-2"></i>
              ) : null}
              {isSignUp ? 'Create Account' : t('modal.signInButton')}
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : t('modal.noAccount')}{' '}
            <Button
              variant="link"
              className="p-0 h-auto font-normal"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : t('modal.signUp')}
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
