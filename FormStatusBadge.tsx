import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

interface FormStatusBadgeProps {
  status: 'completed' | 'pending_info' | 'in_progress';
}

export const FormStatusBadge: React.FC<FormStatusBadgeProps> = ({ status }) => {
  const { t } = useLanguage();

  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          variant: 'default' as const,
          text: t('status.completed'),
          className: 'bg-green-100 text-green-800 hover:bg-green-100'
        };
      case 'pending_info':
        return {
          variant: 'secondary' as const,
          text: t('status.pending'),
          className: 'bg-amber-100 text-amber-800 hover:bg-amber-100'
        };
      case 'in_progress':
        return {
          variant: 'outline' as const,
          text: t('status.inProgress'),
          className: 'bg-blue-100 text-blue-800 hover:bg-blue-100'
        };
      default:
        return {
          variant: 'outline' as const,
          text: status,
          className: ''
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.text}
    </Badge>
  );
};
