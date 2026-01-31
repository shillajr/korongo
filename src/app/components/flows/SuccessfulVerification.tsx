import React, { useContext, useState, useEffect } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, Loader } from 'lucide-react';
import visaData from '../../../config/visaRequirements.json';

interface SuccessfulVerificationProps {
  onNavigateToDashboard?: () => void;
}

/**
 * Step 8: Success screen with 3-second countdown to Dashboard redirect
 */
export const SuccessfulVerification: React.FC<SuccessfulVerificationProps> = ({ onNavigateToDashboard }) => {
  const { t } = useLanguage();
  const context = useContext(TanzaniaArrivalContext);
  const [countdown, setCountdown] = useState(3);

  if (!context) {
    throw new Error('SuccessfulVerification must be used within TanzaniaArrivalProvider');
  }

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && onNavigateToDashboard) {
      // Complete flow and redirect
      context.completeFlow();
      onNavigateToDashboard();
    }
  }, [countdown, context, onNavigateToDashboard]);

  const handleSkipToHome = () => {
    context.completeFlow();
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  const countryData = visaData.countries.find((c) => c.id === context.arrivingCountry);
  const getVisaStatusLabel = () => {
    switch (context.visaStatus) {
      case 'has_visa':
        return 'Visa: Ready';
      case 'needs_visa':
        return 'Visa: Applied';
      case 'visa_free':
        return 'Visa: Not Required';
      default:
        return 'Status: Pending';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-slate-50 to-blue-50 px-4 relative overflow-hidden">
      {/* Floating celebration dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-warm-amber opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Success Icon */}
      <div className="mb-6 relative z-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl animate-pulse">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Success Title */}
      <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center relative z-10">
        {t('arrivalFlow.success.title')}
      </h1>
      <p className="text-base text-slate-600 mb-8 text-center relative z-10">
        {t('arrivalFlow.success.subtitle')}
      </p>

      {/* Registration Summary Card */}
      <Card
        className="w-full max-w-md bg-white shadow-lg mb-8 relative z-10"
        style={{ borderRadius: '16px' }}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            {t('arrivalFlow.success.registrationSummary')}
          </h2>

          <div className="space-y-3">
            {/* Name */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">{t('arrivalFlow.success.name')}</span>
              <span className="text-sm font-medium text-slate-900">
                {context.registrationData.firstName} {context.registrationData.lastName}
              </span>
            </div>

            {/* Nationality */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">{t('arrivalFlow.success.nationality')}</span>
              <span className="text-sm font-medium text-slate-900">
                {context.registrationData.nationality}
              </span>
            </div>

            {/* Destination */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">{t('arrivalFlow.success.destination')}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{countryData?.flag}</span>
                <span className="text-sm font-medium text-slate-900">{countryData?.name}</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{t('arrivalFlow.success.status')}</span>
              <Badge variant="accent">{getVisaStatusLabel()}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Countdown Info */}
      <div className="text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-2">
          <Loader className="w-4 h-4 text-warm-amber animate-spin" />
          <p className="text-sm text-slate-600">
            {t('arrivalFlow.success.redirecting', { seconds: countdown })}
          </p>
        </div>
      </div>

      {/* Manual Skip Button */}
      <Button
        onClick={handleSkipToHome}
        className="w-full max-w-md h-12 rounded-[10px] relative z-10"
        variant="outline"
      >
        {t('arrivalFlow.success.goToDashboard')}
      </Button>
    </div>
  );
};
