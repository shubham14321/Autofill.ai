import { Profile, Form } from "@shared/schema";

export interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  value?: string;
  options?: string[];
}

export interface FilledFormData {
  [key: string]: string | undefined;
}

export const mapProfileToFormData = (profile: Profile, formTemplate: any): FilledFormData => {
  const formData: FilledFormData = {};
  
  if (!formTemplate?.fields) return formData;
  
  const fieldMappings: { [key: string]: keyof Profile } = {
    fullName: 'fullName',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    fatherName: 'fatherName',
    motherName: 'motherName',
    mobileNumber: 'mobileNumber',
    email: 'email',
    aadhaarNumber: 'aadhaarNumber',
    panNumber: 'panNumber',
    passportNumber: 'passportNumber',
    streetAddress: 'streetAddress',
    city: 'city',
    state: 'state',
    pinCode: 'pinCode',
  };
  
  formTemplate.fields.forEach((fieldId: string) => {
    const profileField = fieldMappings[fieldId];
    if (profileField && profile[profileField]) {
      formData[fieldId] = profile[profileField] as string;
    }
  });
  
  return formData;
};

export const getMissingFields = (profile: Profile, formTemplate: any): string[] => {
  if (!formTemplate?.fields) return [];
  
  const fieldMappings: { [key: string]: keyof Profile } = {
    fullName: 'fullName',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    fatherName: 'fatherName',
    motherName: 'motherName',
    mobileNumber: 'mobileNumber',
    email: 'email',
    aadhaarNumber: 'aadhaarNumber',
    panNumber: 'panNumber',
    passportNumber: 'passportNumber',
    streetAddress: 'streetAddress',
    city: 'city',
    state: 'state',
    pinCode: 'pinCode',
  };
  
  const missingFields: string[] = [];
  
  formTemplate.fields.forEach((fieldId: string) => {
    const profileField = fieldMappings[fieldId];
    if (profileField && (!profile[profileField] || profile[profileField] === '')) {
      missingFields.push(fieldId);
    }
  });
  
  return missingFields;
};

export const getFieldLabel = (fieldId: string): string => {
  const labels: { [key: string]: string } = {
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    mobileNumber: 'Mobile Number',
    email: 'Email Address',
    aadhaarNumber: 'Aadhaar Number',
    panNumber: 'PAN Number',
    passportNumber: 'Passport Number',
    streetAddress: 'Street Address',
    city: 'City',
    state: 'State',
    pinCode: 'PIN Code',
  };
  
  return labels[fieldId] || fieldId;
};

export const validateFormData = (formData: FilledFormData, requiredFields: string[]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  requiredFields.forEach(fieldId => {
    if (!formData[fieldId] || formData[fieldId]?.trim() === '') {
      errors.push(`${getFieldLabel(fieldId)} is required`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
