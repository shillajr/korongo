import React, { createContext, useState, useEffect, useCallback } from 'react';

/**
 * Registration data structure for the arrival flow
 */
export interface RegistrationData {
  firstName: string;
  lastName: string;
  nationality: string;
  whatsappNumber: string;
}

/**
 * Shape of the Tanzania Arrival context
 */
interface ITanzaniaArrivalContext {
  currentStep: number;
  arrivingCountry: string | null;
  visaStatus: 'has_visa' | 'needs_visa' | 'visa_free' | null;
  registrationData: RegistrationData;
  otpEmail: string;
  otpVerified: boolean;
  isCompleted: boolean;
  error: string | null;
  setCurrentStep: (step: number) => void;
  setArrivingCountry: (country: string) => void;
  setVisaStatus: (status: 'has_visa' | 'needs_visa' | 'visa_free') => void;
  setRegistrationData: (data: Partial<RegistrationData>) => void;
  setOtpEmail: (email: string) => void;
  setOtpVerified: (verified: boolean) => void;
  completeFlow: () => void;
  resetFlow: () => void;
  canGoToNextStep: () => boolean;
  getProgressPercentage: () => number;
}

/**
 * TanzaniaArrivalContext for managing the arrival flow state
 */
export const TanzaniaArrivalContext = createContext<ITanzaniaArrivalContext | undefined>(undefined);

/**
 * Props for TanzaniaArrivalProvider component
 */
interface TanzaniaArrivalProviderProps {
  children: React.ReactNode;
}

/**
 * Initial registration data
 */
const initialRegistrationData: RegistrationData = {
  firstName: '',
  lastName: '',
  nationality: '',
  whatsappNumber: '',
};

/**
 * TanzaniaArrivalProvider component that wraps the app
 * Manages the state of the arrival flow
 */
export const TanzaniaArrivalProvider: React.FC<TanzaniaArrivalProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStepState] = useState<number>(1);
  const [arrivingCountry, setArrivingCountryState] = useState<string | null>(null);
  const [visaStatus, setVisaStatusState] = useState<'has_visa' | 'needs_visa' | 'visa_free' | null>(null);
  const [registrationData, setRegistrationDataState] = useState<RegistrationData>(initialRegistrationData);
  const [otpEmail, setOtpEmailState] = useState<string>('');
  const [otpVerified, setOtpVerifiedState] = useState<boolean>(false);
  const [isCompleted, setIsCompletedState] = useState<boolean>(false);
  const [error, setErrorState] = useState<string | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('korongo_arrival_flow');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setCurrentStepState(parsed.currentStep || 1);
        setArrivingCountryState(parsed.arrivingCountry || null);
        setVisaStatusState(parsed.visaStatus || null);
        setRegistrationDataState(parsed.registrationData || initialRegistrationData);
        setOtpEmailState(parsed.otpEmail || '');
        setOtpVerifiedState(parsed.otpVerified || false);
        setIsCompletedState(parsed.isCompleted || false);
      }
    } catch (err) {
      console.error('Failed to load arrival flow state:', err);
    }
  }, []);

  // Save state to localStorage on any change
  const saveState = useCallback(() => {
    const state = {
      currentStep,
      arrivingCountry,
      visaStatus,
      registrationData,
      otpEmail,
      otpVerified,
      isCompleted,
    };
    localStorage.setItem('korongo_arrival_flow', JSON.stringify(state));
  }, [currentStep, arrivingCountry, visaStatus, registrationData, otpEmail, otpVerified, isCompleted]);

  useEffect(() => {
    saveState();
  }, [saveState]);

  /**
   * Check if current step is valid and can proceed to next
   */
  const canGoToNextStep = useCallback((): boolean => {
    switch (currentStep) {
      case 1: // Welcome screen
        return true;
      case 2: // Country selector
        return !!arrivingCountry;
      case 3: // Visa requirements
        return !!arrivingCountry;
      case 4: // Visa status selection
        return !!visaStatus;
      case 5: // Visa application (conditional) or registration
        return visaStatus === 'visa_free' || visaStatus === 'has_visa' || true; // Always allow for now
      case 6: // Registration
        return (
          registrationData.firstName.trim() !== '' &&
          registrationData.lastName.trim() !== '' &&
          registrationData.nationality.trim() !== '' &&
          /^\+?[0-9\s\-()]{10,}$/.test(registrationData.whatsappNumber)
        );
      case 7: // OTP verification
        return otpVerified;
      case 8: // Success screen
        return true;
      default:
        return false;
    }
  }, [currentStep, arrivingCountry, visaStatus, registrationData, otpVerified]);

  /**
   * Get progress percentage for the flow (0-100)
   */
  const getProgressPercentage = useCallback((): number => {
    // Total steps: 8
    return Math.round((currentStep / 8) * 100);
  }, [currentStep]);

  const setCurrentStep = (step: number) => {
    if (step >= 1 && step <= 8) {
      setCurrentStepState(step);
    }
  };

  const setArrivingCountry = (country: string) => {
    setArrivingCountryState(country);
  };

  const setVisaStatus = (status: 'has_visa' | 'needs_visa' | 'visa_free') => {
    setVisaStatusState(status);
  };

  const setRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationDataState((prev) => ({ ...prev, ...data }));
  };

  const setOtpEmail = (email: string) => {
    setOtpEmailState(email);
  };

  const setOtpVerified = (verified: boolean) => {
    setOtpVerifiedState(verified);
  };

  const completeFlow = () => {
    setIsCompletedState(true);
    // Flow is complete, can be accessed from localStorage for Dashboard display
  };

  const resetFlow = () => {
    setCurrentStepState(1);
    setArrivingCountryState(null);
    setVisaStatusState(null);
    setRegistrationDataState(initialRegistrationData);
    setOtpEmailState('');
    setOtpVerifiedState(false);
    setIsCompletedState(false);
    setErrorState(null);
    localStorage.removeItem('korongo_arrival_flow');
  };

  return (
    <TanzaniaArrivalContext.Provider
      value={{
        currentStep,
        arrivingCountry,
        visaStatus,
        registrationData,
        otpEmail,
        otpVerified,
        isCompleted,
        error,
        setCurrentStep,
        setArrivingCountry,
        setVisaStatus,
        setRegistrationData,
        setOtpEmail,
        setOtpVerified,
        completeFlow,
        resetFlow,
        canGoToNextStep,
        getProgressPercentage,
      }}
    >
      {children}
    </TanzaniaArrivalContext.Provider>
  );
};
