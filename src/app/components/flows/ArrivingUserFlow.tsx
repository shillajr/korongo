import React, { useContext } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { TanzaniaWelcomeScreen } from './TanzaniaWelcomeScreen';
import { ArrivalCountrySelector } from './ArrivalCountrySelector';
import { VisaRequirementsOverview } from './VisaRequirementsOverview';
import { VisaStatusSelection } from './VisaStatusSelection';
import { VisaApplicationFlow } from './VisaApplicationFlow';
import { LightweightRegistration } from './LightweightRegistration';
import { WhatsAppOtpVerification } from './WhatsAppOtpVerification';
import { SuccessfulVerification } from './SuccessfulVerification';

interface ArrivingUserFlowProps {
  onComplete?: () => void;
}

/**
 * Main orchestrator for the 8-step Tanzania arrival flow
 * Manages step progression, progress bar, and conditional routing
 */
export const ArrivingUserFlow: React.FC<ArrivingUserFlowProps> = ({ onComplete }) => {
  const context = useContext(TanzaniaArrivalContext);

  if (!context) {
    throw new Error('ArrivingUserFlow must be used within TanzaniaArrivalProvider');
  }

  const totalSteps = 8;
  const progressPercentage = context.getProgressPercentage();

  // Render step-specific component
  const renderStep = () => {
    switch (context.currentStep) {
      case 1:
        return <TanzaniaWelcomeScreen />;
      case 2:
        return <ArrivalCountrySelector />;
      case 3:
        return <VisaRequirementsOverview />;
      case 4:
        return <VisaStatusSelection />;
      case 5:
        // Conditional: only show if visaStatus === 'needs_visa'
        return context.visaStatus === 'needs_visa' ? (
          <VisaApplicationFlow />
        ) : (
          // Skip to registration if not applying for visa
          <LightweightRegistration />
        );
      case 6:
        return <LightweightRegistration />;
      case 7:
        return <WhatsAppOtpVerification />;
      case 8:
        return <SuccessfulVerification onNavigateToDashboard={onComplete} />;
      default:
        return <TanzaniaWelcomeScreen />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-warm-amber to-orange-500 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Counter (optional - for debugging) */}
      <div className="fixed top-4 right-4 bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full z-40">
        Step {context.currentStep}/{totalSteps}
      </div>

      {/* Step Content */}
      <div className="w-full h-full pt-1">
        {renderStep()}
      </div>
    </div>
  );
};
