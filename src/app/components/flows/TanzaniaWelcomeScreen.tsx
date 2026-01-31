import React, { useContext } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Shield, Zap, MapPin } from 'lucide-react';

/**
 * Step 1: Welcome screen showing Tanzania value proposition
 */
export const TanzaniaWelcomeScreen: React.FC = () => {
  const { t } = useLanguage();
  const context = useContext(TanzaniaArrivalContext);

  if (!context) {
    throw new Error('TanzaniaWelcomeScreen must be used within TanzaniaArrivalProvider');
  }

  const handleContinue = () => {
    context.setCurrentStep(2);
  };

  const benefits = [
    {
      icon: Shield,
      title: t('arrivalFlow.welcome.benefit1Title'),
      description: t('arrivalFlow.welcome.benefit1Description'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Zap,
      title: t('arrivalFlow.welcome.benefit2Title'),
      description: t('arrivalFlow.welcome.benefit2Description'),
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: MapPin,
      title: t('arrivalFlow.welcome.benefit3Title'),
      description: t('arrivalFlow.welcome.benefit3Description'),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-white px-4">
      {/* Hero Icon */}
      <div className="mb-8 relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
          <span className="text-2xl">🇹🇿</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center">
        {t('arrivalFlow.welcome.title')}
      </h1>
      <p className="text-base text-slate-600 mb-2 text-center">
        {t('arrivalFlow.welcome.subtitle')}
      </p>
      <p className="text-sm text-slate-500 mb-8 text-center">
        {t('arrivalFlow.welcome.description')}
      </p>

      {/* Benefits Cards */}
      <div className="w-full max-w-md space-y-4 mb-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card
              key={index}
              className={`${benefit.bgColor} border-2 border-slate-200 p-4 flex gap-4 items-start`}
              style={{ borderRadius: '16px' }}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 text-sm">{benefit.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{benefit.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* CTA Button */}
      <Button onClick={handleContinue} className="w-full max-w-md h-12 rounded-[10px]" variant="accent">
        {t('common.continue')}
      </Button>
    </div>
  );
};
