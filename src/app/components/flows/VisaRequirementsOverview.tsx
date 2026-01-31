import React, { useContext, useMemo } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import visaData from '../../../config/visaRequirements.json';

/**
 * Step 3: Display visa requirements for selected country
 */
export const VisaRequirementsOverview: React.FC = () => {
  const { t } = useLanguage();
  const context = useContext(TanzaniaArrivalContext);

  if (!context) {
    throw new Error('VisaRequirementsOverview must be used within TanzaniaArrivalProvider');
  }

  const countryData = useMemo(() => {
    return visaData.countries.find((c) => c.id === context.arrivingCountry);
  }, [context.arrivingCountry]);

  if (!countryData) {
    return <div>{t('common.error')}</div>;
  }

  const visaType = countryData.visaTypes[0];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'visa_free':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'visa_on_arrival':
        return <Clock className="w-6 h-6 text-amber-600" />;
      case 'visa_required':
        return <AlertCircle className="w-6 h-6 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'visa_free':
        return 'bg-green-50 border-green-200';
      case 'visa_on_arrival':
        return 'bg-amber-50 border-amber-200';
      case 'visa_required':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const handleContinue = () => {
    context.setCurrentStep(4);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {t('arrivalFlow.visaRequirements.title')}
        </h1>
        <p className="text-base text-slate-600 mb-4">
          {t('arrivalFlow.visaRequirements.subtitle')}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-3xl">{countryData.flag}</span>
          <span className="text-xl font-semibold text-slate-900">{countryData.name}</span>
        </div>
      </div>

      {/* Visa Type Card */}
      <Card
        className={`${getStatusColor(visaType.status)} border-2 p-6 mb-6`}
        style={{ borderRadius: '16px' }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">{getStatusIcon(visaType.status)}</div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              {visaType.type === 'free' && t('arrivalFlow.visaRequirements.visaTypeFree')}
              {visaType.type === 'on_arrival' &&
                t('arrivalFlow.visaRequirements.visaTypeOnArrival')}
              {visaType.type === 'required' && t('arrivalFlow.visaRequirements.visaTypeRequired')}
            </h2>
            <p className="text-slate-700 text-sm">
              {visaType.status === 'visa_free' && t('arrivalFlow.visaRequirements.status.free')}
              {visaType.status === 'visa_on_arrival' &&
                t('arrivalFlow.visaRequirements.status.onArrival')}
              {visaType.status === 'visa_required' &&
                t('arrivalFlow.visaRequirements.status.required')}
            </p>
          </div>
        </div>

        {/* Processing Time and Documents */}
        <div className="mt-4 pt-4 border-t border-slate-300">
          <p className="text-sm font-medium text-slate-900 mb-3">
            {t('arrivalFlow.visaRequirements.processingTime', {
              time: visaType.processingTime,
            })}
          </p>

          <p className="text-sm font-medium text-slate-900 mb-2">
            {t('arrivalFlow.visaRequirements.documentsRequired')}
          </p>
          <ul className="space-y-2">
            {visaType.documentsRequired.map((doc, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-warm-amber"></span>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 border-2 border-blue-200 p-4 mb-6" style={{ borderRadius: '12px' }}>
        <p className="text-sm text-blue-900">
          💡 Review these requirements carefully and gather all necessary documents before proceeding.
        </p>
      </Card>

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
