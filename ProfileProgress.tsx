import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileProgressProps {
  completionPercentage: number;
  missingFields?: string[];
  onEditProfile?: () => void;
}

export const ProfileProgress: React.FC<ProfileProgressProps> = ({
  completionPercentage,
  missingFields = [],
  onEditProfile
}) => {
  const { t } = useLanguage();

  const getProgressColor = () => {
    if (completionPercentage >= 90) return 'bg-green-500';
    if (completionPercentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getNextSteps = () => {
    if (missingFields.length === 0) return 'Profile is complete!';
    if (missingFields.includes('profilePhoto') && missingFields.includes('signature')) {
      return 'Add photo & signature to complete';
    }
    if (missingFields.includes('profilePhoto')) {
      return 'Add profile photo to complete';
    }
    if (missingFields.includes('signature')) {
      return 'Add signature to complete';
    }
    return `Complete ${missingFields.length} more fields`;
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Profile Complete</h3>
          <p className="text-sm text-muted-foreground">{getNextSteps()}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
        </div>
      </div>
      
      <Progress value={completionPercentage} className="mb-4" />
      
      {missingFields.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Missing Information:</h4>
          <div className="flex flex-wrap gap-2">
            {missingFields.map((field) => (
              <span
                key={field}
                className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {onEditProfile && (
        <Button
          onClick={onEditProfile}
          className="w-full mt-4"
          variant={completionPercentage >= 90 ? "outline" : "default"}
        >
          <i className="fas fa-edit mr-2"></i>
          Edit Profile
        </Button>
      )}
    </div>
  );
};
