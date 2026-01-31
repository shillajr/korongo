import React, { useContext } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * Step 4: Select visa status to determine next steps
 */
export const VisaStatusSelection: React.FC = () => {
  const { t } = useLanguage();
  const context = useContext(TanzaniaArrivalContext);

  if (!context) {
    throw new Error('VisaStatusSelection must be used within TanzaniaArrivalProvider');
  }

  const handleSelectStatus = (status: 'has_visa' | 'needs_visa' | 'visa_free') => {
    context.setVisaStatus(status);
  };

  const handleContinue = () => {
    if (context.visaStatus === 'needs_visa') {
      context.setCurrentStep(5);
    } else {
      // Skip visa application, go to registration
      context.setCurrentStep(6);
    }
  };

  const options = [
    {
      id: 'has_visa',
      title: t('arrivalFlow.visaStatus.option1'),
      description: t('arrivalFlow.visaStatus.option1Description'),
      icon: CheckCircle2,
    },
    {
      id: 'needs_visa',
      title: t('arrivalFlow.visaStatus.option2'),
      description: t('arrivalFlow.visaStatus.option2Description'),
      icon: AlertCircle,
    },
    {
      id: 'visa_free',
      title: t('arrivalFlow.visaStatus.option3'),
      description: t('arrivalFlow.visaStatus.option3Description'),
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {t('arrivalFlow.visaStatus.title')}
        </h1>
        <p className="text-base text-slate-600">{t('arrivalFlow.visaStatus.subtitle')}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 flex-1 mb-6">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = context.visaStatus === option.id;

          return (
            <Card
              key={option.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-warm-amber bg-amber-50 shadow-md'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              style={{ borderRadius: '12px' }}
              onClick={() => handleSelectStatus(option.id as any)}
            >
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? 'text-warm-amber' : 'text-slate-400'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{option.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{option.description}</p>
                </div>
                {isSelected && (
                  <Badge variant="accent" className="flex-shrink-0">
                    ✓
                  </Badge>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Continue Button */}
      <Button
        onClick={handleContinue}
        disabled={!context.visaStatus}
        className="w-full h-12 rounded-[10px]"
        variant="accent"
      >
        {t('common.continue')}
      </Button>
    </div>
  );
};
