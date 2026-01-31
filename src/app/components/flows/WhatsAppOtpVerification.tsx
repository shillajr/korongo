import React, { useContext, useState, useEffect } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';

/**
 * Step 7: WhatsApp OTP verification with mock OTP display
 */
export const WhatsAppOtpVerification: React.FC = () => {
  const { t } = useLanguage();
  const context = useContext(TanzaniaArrivalContext);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const [showMockOtp, setShowMockOtp] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const mockOtpCode = '123456';

  if (!context) {
    throw new Error('WhatsAppOtpVerification must be used within TanzaniaArrivalProvider');
  }

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleOtpInput = (index: number, value: string) => {
    const newOtp = [...otp];

    // Only allow digits
    if (/^\d?$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // Check if OTP is complete
      if (newOtp.every((digit) => digit !== '')) {
        verifyOtp(newOtp.join(''));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedDigits = pastedData.replace(/\D/g, '').slice(0, 6);

    if (pastedDigits.length > 0) {
      const newOtp = pastedDigits.split('');
      while (newOtp.length < 6) {
        newOtp.push('');
      }
      setOtp(newOtp);

      // Check if complete OTP was pasted
      if (pastedDigits.length === 6) {
        verifyOtp(pastedDigits);
      }
    }
  };

  const verifyOtp = (otpCode: string) => {
    setVerifying(true);

    // Simulate OTP verification with mock delay
    setTimeout(() => {
      if (otpCode === mockOtpCode) {
        context.setOtpVerified(true);
        context.setCurrentStep(8);
      } else {
        setOtp(Array(6).fill(''));
        setVerifying(false);
        alert('Invalid OTP. Please try again. (Mock: 123456)');
      }
    }, 1200);
  };

  const handleResend = () => {
    setResendCountdown(60);
    setOtp(Array(6).fill(''));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {t('arrivalFlow.otpVerification.title')}
        </h1>
        <p className="text-base text-slate-600">{t('arrivalFlow.otpVerification.subtitle')}</p>
      </div>

      {/* Mock OTP Display */}
      {showMockOtp && (
        <Card className="bg-amber-50 border-2 border-amber-200 p-4 mb-6" style={{ borderRadius: '12px' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-900 mb-1">
                {t('arrivalFlow.otpVerification.mockOtpTitle')}
              </p>
              <p className="text-lg font-mono font-bold text-amber-700">{mockOtpCode}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowMockOtp(false)}
              className="h-8 px-2 text-xs"
            >
              <EyeOff className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      )}

      {/* OTP Input Fields */}
      <div className="flex-1 mb-6">
        <p className="text-sm text-slate-600 mb-4">Enter your 6-digit code:</p>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleOtpInput(index, e.target.value)}
              onPaste={index === 0 ? handlePaste : undefined}
              maxLength={1}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-300 rounded-lg focus:outline-none focus:border-warm-amber disabled:bg-slate-100"
              disabled={verifying}
            />
          ))}
        </div>

        {/* Resend Button */}
        <div className="text-center">
          {resendCountdown > 0 ? (
            <p className="text-sm text-slate-600">
              {t('arrivalFlow.otpVerification.resendCountdown', { seconds: resendCountdown })}
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-warm-amber font-medium hover:underline flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3 h-3" />
              {t('arrivalFlow.otpVerification.resendCode')}
            </button>
          )}
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-2 border-blue-200 p-4 mt-6" style={{ borderRadius: '12px' }}>
          <p className="text-sm text-blue-900">
            💬 You'll receive a WhatsApp message with your verification code within seconds.
          </p>
        </Card>
      </div>

      {/* Verifying State */}
      {verifying && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-sm text-slate-600">
            <div className="w-4 h-4 border-2 border-warm-amber border-t-transparent rounded-full animate-spin"></div>
            {t('arrivalFlow.otpVerification.verifyingOtp')}
          </div>
        </div>
      )}
    </div>
  );
};
