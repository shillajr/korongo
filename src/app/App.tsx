import React, { useState, useEffect } from 'react';
import { Onboarding, OnboardingData } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { CrossBorder } from './components/CrossBorder';
import { MatchDay } from './components/MatchDay';
import { Matches } from './components/Matches';
import { Safari } from './components/Safari';
import { CulturalCompass } from './components/CulturalCompass';
import { EmergencyShield } from './components/EmergencyShield';
import { EmergencyButton } from './components/EmergencyButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { BottomNav } from './components/BottomNav';
import { LoadingScreen } from './components/LoadingScreen';
import { FanId } from './components/FanId';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { CreditCard, Edit2, Check, X } from 'lucide-react';
import type { Country } from './components/JourneyProgress';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [showEmergency, setShowEmergency] = useState(false);
  const [paymentNumber, setPaymentNumber] = useState('');
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  
  // Default location set to Tanzania
  const [currentCountry, setCurrentCountry] = useState<Country>('tanzania');
  const [currentCity, setCurrentCity] = useState('Dar es Salaam');
  const [visitedCountries, setVisitedCountries] = useState<Country[]>(['tanzania']);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Load saved payment number from localStorage
    const savedPaymentNumber = localStorage.getItem('korongoPaymentNumber');
    if (savedPaymentNumber) {
      setPaymentNumber(savedPaymentNumber);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setHasCompletedOnboarding(true);
    // In a real app, save to localStorage
    localStorage.setItem('korongoOnboarding', JSON.stringify(data));
  };

  const handleSkipOnboarding = () => {
    // Set default data when skipping onboarding
    const defaultData: OnboardingData = {
      journeyPath: ['tanzania', 'uganda', 'zambia'],
      emergencyContact: {
        name: '',
        phone: '',
        bloodType: 'O+'
      }
    };
    setOnboardingData(defaultData);
    setHasCompletedOnboarding(true);
    localStorage.setItem('korongoOnboarding', JSON.stringify(defaultData));
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} onSkip={handleSkipOnboarding} />;
  }

  const journeyPath = onboardingData?.journeyPath || ['tanzania', 'uganda', 'zambia'];

  return (
    <div className="relative min-h-screen bg-background">
      <OfflineIndicator />

      {/* Emergency Shield Overlay */}
      {showEmergency && (
        <EmergencyShield
          onClose={() => setShowEmergency(false)}
          currentCountry={currentCountry}
          currentCity={currentCity}
        />
      )}

      {/* Main Content */}
      {!showEmergency && (
        <>
          {currentView === 'home' && (
            <Dashboard
              currentCountry={currentCountry}
              currentCity={currentCity}
              visitedCountries={visitedCountries}
              journeyPath={journeyPath}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'border' && (
            <CrossBorder
              fromCountry={currentCountry}
              toCountry={journeyPath[journeyPath.indexOf(currentCountry) + 1] || 'tanzania'}
              onBack={handleBack}
            />
          )}

          {currentView === 'matchday' && (
            <MatchDay onBack={handleBack} />
          )}

          {currentView === 'matches' && (
            <Matches onBack={handleBack} />
          )}

          {currentView === 'safari' && (
            <Safari onBack={handleBack} currentCountry={currentCountry} />
          )}

          {currentView === 'cultural' && (
            <CulturalCompass onBack={handleBack} currentCountry={currentCountry} />
          )}

          {currentView === 'fanid' && (
            <FanId onNavigate={handleNavigate} />
          )}

          {/* Explore View - Shows Cultural Compass by default */}
          {currentView === 'explore' && (
            <CulturalCompass onBack={handleBack} currentCountry={currentCountry} />
          )}

          {/* Community View - Placeholder */}
          {currentView === 'community' && (
            <div className="min-h-screen bg-background p-6 pb-32">
              <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Community</h1>
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <p className="text-muted-foreground">
                    Connect with other AFCON 2027 travelers, share tips, and find travel buddies.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Coming soon!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Profile View - Placeholder */}
          {currentView === 'profile' && (
            <div className="min-h-screen bg-background p-6 pb-24">
              <div className="max-w-md mx-auto space-y-4">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                
                {/* User Info Card */}
                <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-primary">
                        {onboardingData?.emergencyContact.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <h2 className="font-bold">Traveler Profile</h2>
                    <p className="text-sm text-muted-foreground">
                      {visitedCountries.length} of {journeyPath.length} countries visited
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Emergency Contact</span>
                      <span className="font-medium">{onboardingData?.emergencyContact.name || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Blood Type</span>
                      <span className="font-medium">{onboardingData?.emergencyContact.bloodType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Journey Path</span>
                      <span className="font-medium capitalize">
                        {journeyPath.join(' → ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emergency Shield Section */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="p-4 bg-red-50 border-b border-red-100">
                    <h3 className="font-bold text-red-800 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Emergency Services
                    </h3>
                    <p className="text-xs text-red-600 mt-1">Quick access to emergency contacts</p>
                  </div>
                  <div className="p-4">
                    <Button
                      onClick={() => setShowEmergency(true)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white h-12"
                    >
                      Open Emergency Shield
                    </Button>
                  </div>
                </div>

                {/* Payment Information Card */}
                <div className="bg-card rounded-xl p-6 border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold">Payment Number</h3>
                        <p className="text-xs text-muted-foreground">For making payments in app</p>
                      </div>
                    </div>
                    {!isEditingPayment && paymentNumber && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingPayment(true)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {isEditingPayment || !paymentNumber ? (
                    <div className="space-y-3">
                      <Input
                        type="tel"
                        placeholder="+255 700 000 000"
                        value={paymentNumber}
                        onChange={(e) => setPaymentNumber(e.target.value)}
                        className="h-12"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            localStorage.setItem('korongoPaymentNumber', paymentNumber);
                            setIsEditingPayment(false);
                          }}
                          disabled={!paymentNumber}
                          className="flex-1"
                          size="sm"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        {paymentNumber && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              const savedPaymentNumber = localStorage.getItem('korongoPaymentNumber');
                              setPaymentNumber(savedPaymentNumber || '');
                              setIsEditingPayment(false);
                            }}
                            className="flex-1"
                            size="sm"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{paymentNumber}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This number will be used for ticket purchases, safari bookings, and other payments across Tanzania, Uganda, and Zambia.
                      </p>
                    </div>
                  )}

                  {!paymentNumber && !isEditingPayment && (
                    <Button
                      onClick={() => setIsEditingPayment(true)}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Payment Number
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <BottomNav activeView={currentView} onNavigate={handleNavigate} />

          {/* Floating Emergency Button */}
          {!showEmergency && (
            <EmergencyButton
              onClick={() => setShowEmergency(true)}
              variant="floating"
            />
          )}
        </>
      )}
    </div>
  );
}