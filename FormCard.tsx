import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Form } from '@shared/schema';

interface FormCardProps {
  form: Form;
  onFillForm: (formId: number) => void;
  autoFillable?: boolean;
  missingFields?: number;
  deadline?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  form,
  onFillForm,
  autoFillable = true,
  missingFields = 0,
  deadline
}) => {
  const getBadgeVariant = () => {
    if (deadline) return 'destructive';
    if (missingFields > 0) return 'secondary';
    return 'default';
  };

  const getBadgeText = () => {
    if (deadline) return `Deadline: ${deadline}`;
    if (missingFields > 0) return 'Partial data';
    return 'Auto-fillable';
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <i className={`${form.icon} text-xl text-primary`}></i>
            </div>
            <div>
              <CardTitle className="text-base">{form.name}</CardTitle>
              <CardDescription>{form.category}</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFillForm(form.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <i className="fas fa-arrow-right"></i>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {form.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant={getBadgeVariant()}>
            {getBadgeText()}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFillForm(form.id)}
            className="text-primary hover:text-primary/80"
          >
            Fill Form
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
