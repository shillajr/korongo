import React, { useContext, useState } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { AlertCircle, Shield } from 'lucide-react';

/**
 * Step 6: Lightweight registration form
 */
export const LightweightRegistration: React.FC = () => {
  const { t } = useLanguage();
  const context = useContext(TanzaniaArrivalContext);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  if (!context) {
    throw new Error('LightweightRegistration must be used within TanzaniaArrivalProvider');
  }

  const validatePhone = (phone: string): boolean => {
    return /^\+?[0-9\s\-()]{10,}$/.test(phone);
  };

  const handleFieldChange = (field: string, value: string) => {
    context.setRegistrationData({ [field]: value });

    // Validate on change if field was touched
    if (touchedFields.has(field)) {
      validateField(field, value);
    }
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    if (field === 'firstName' || field === 'lastName' || field === 'nationality') {
      if (value.trim() === '') {
        newErrors[field] = 'This field is required';
      } else {
        delete newErrors[field];
      }
    } else if (field === 'whatsappNumber') {
      if (value.trim() === '') {
        newErrors[field] = 'Phone number is required';
      } else if (!validatePhone(value)) {
        newErrors[field] = 'Please enter a valid phone number';
      } else {
        delete newErrors[field];
      }
    }

    setErrors(newErrors);
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field));
    const value = context.registrationData[field as keyof typeof context.registrationData];
    validateField(field, value);
  };

  const handleContinue = () => {
    // Validate all fields before proceeding
    let allValid = true;
    const fieldsToValidate = ['firstName', 'lastName', 'nationality', 'whatsappNumber'];

    fieldsToValidate.forEach((field) => {
      const value = context.registrationData[field as keyof typeof context.registrationData];
      if (field === 'whatsappNumber' ? !validatePhone(value) : value.trim() === '') {
        allValid = false;
      }
      validateField(field, value);
    });

    if (allValid) {
      context.setCurrentStep(7);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {t('arrivalFlow.registration.title')}
        </h1>
        <p className="text-base text-slate-600">{t('arrivalFlow.registration.subtitle')}</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 flex-1 mb-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {t('arrivalFlow.registration.firstName')}
          </label>
          <Input
            type="text"
            value={context.registrationData.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            placeholder="John"
            className="w-full h-11"
            style={{ borderRadius: '12px' }}
          />
          {errors.firstName && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {t('arrivalFlow.registration.lastName')}
          </label>
          <Input
            type="text"
            value={context.registrationData.lastName}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            placeholder="Doe"
            className="w-full h-11"
            style={{ borderRadius: '12px' }}
          />
          {errors.lastName && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.lastName}
            </p>
          )}
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {t('arrivalFlow.registration.nationality')}
          </label>
          <Input
            type="text"
            value={context.registrationData.nationality}
            onChange={(e) => handleFieldChange('nationality', e.target.value)}
            onBlur={() => handleBlur('nationality')}
            placeholder="United States"
            className="w-full h-11"
            style={{ borderRadius: '12px' }}
          />
          {errors.nationality && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.nationality}
            </p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            {t('arrivalFlow.registration.whatsAppNumber')}
          </label>
          <Input
            type="tel"
            value={context.registrationData.whatsappNumber}
            onChange={(e) => handleFieldChange('whatsappNumber', e.target.value)}
            onBlur={() => handleBlur('whatsappNumber')}
            placeholder="+1 (555) 000-0000"
            className="w-full h-11"
            style={{ borderRadius: '12px' }}
          />
          {errors.whatsappNumber && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.whatsappNumber}
            </p>
          )}
        </div>

        {/* Privacy Assurance Card */}
        <Card className="bg-green-50 border-2 border-green-200 p-4 mt-4" style={{ borderRadius: '12px' }}>
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-900">{t('arrivalFlow.registration.privacyAssurance')}</p>
          </div>
        </Card>
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        className="w-full h-12 rounded-[10px]"
        variant="accent"
      >
        {t('common.continue')}
      </Button>
    </div>
  );
};
