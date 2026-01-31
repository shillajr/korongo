import React, { useState } from 'react';
import { CountryFlag } from './CountryFlag';
import { CulturalPattern } from './CulturalPattern';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import { 
  Trophy, 
  MapPin, 
  Shield, 
  FileText, 
  Syringe, 
  DollarSign,
  Phone,
  User,
  Droplet,
  Building2,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import type { Country } from './JourneyProgress';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip?: () => void;
}

export interface OnboardingData {
  journeyPath: Country[];
  emergencyContact: {
    name: string;
    phone: string;
    bloodType: string;
  };
}

export function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [selectedPath, setSelectedPath] = useState<Country[]>([]);
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [bloodType, setBloodType] = useState('O+');

  const totalSteps = 5;

  const handlePathSelect = (path: Country[]) => {
    setSelectedPath(path);
  };

  const handleComplete = () => {
    onComplete({
      journeyPath: selectedPath,
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        bloodType: bloodType
      }
    });
  };

  const canProceed = () => {
    switch (step) {
      case 2:
        return selectedPath.length === 3;
      case 4:
        return emergencyName && emergencyPhone;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CulturalPattern variant="geometric" opacity={0.03} />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Progress Bar */}
        <div className="w-full bg-secondary h-1">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-7 max-w-md mx-auto w-full">
          
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-7 animate-in fade-in duration-500">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-[18px] flex items-center justify-center shadow-lg">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight">Welcome to Korongo</h1>
                <p className="text-lg text-muted-foreground font-medium">
                  Your trusted guide for AFCON 2027
                </p>
              </div>
              <Card className="p-6 text-left space-y-4 bg-gradient-to-br from-white to-secondary/30 border border-border shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Tri-Nation Tournament</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Hosted by Kenya, Tanzania, and Uganda
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Works Offline</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Essential features available without internet
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-warm-amber/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-warm-amber" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Multi-Currency</h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      Seamless payments in KES, TZS, UGX, and USD
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 2: Journey Path Selection */}
          {step === 2 && (
            <div className="w-full space-y-7 animate-in fade-in duration-500">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold">Plan Your Journey</h2>
                <p className="text-base text-muted-foreground font-medium">
                  Select the order you'll visit the host countries
                </p>
              </div>

              <div className="space-y-3">
                <PathOption
                  path={['kenya', 'tanzania', 'uganda']}
                  selected={JSON.stringify(selectedPath) === JSON.stringify(['kenya', 'tanzania', 'uganda'])}
                  onSelect={handlePathSelect}
                />
                <PathOption
                  path={['tanzania', 'kenya', 'uganda']}
                  selected={JSON.stringify(selectedPath) === JSON.stringify(['tanzania', 'kenya', 'uganda'])}
                  onSelect={handlePathSelect}
                />
                <PathOption
                  path={['uganda', 'kenya', 'tanzania']}
                  selected={JSON.stringify(selectedPath) === JSON.stringify(['uganda', 'kenya', 'tanzania'])}
                  onSelect={handlePathSelect}
                />
                <PathOption
                  path={['kenya', 'uganda', 'tanzania']}
                  selected={JSON.stringify(selectedPath) === JSON.stringify(['kenya', 'uganda', 'tanzania'])}
                  onSelect={handlePathSelect}
                />
              </div>
            </div>
          )}

          {/* Step 3: Requirements */}
          {step === 3 && (
            <div className="w-full space-y-7 animate-in fade-in duration-500">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold">Travel Requirements</h2>
                <p className="text-base text-muted-foreground font-medium">
                  What you'll need for your journey
                </p>
              </div>

              <div className="space-y-3">
                <Card className="p-5 border-l-4 border-l-primary shadow-md rounded-[14px]">
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">EAC Visa</h3>
                      <p className="text-sm text-muted-foreground mb-2 font-medium">
                        Single visa valid across Kenya, Tanzania, and Uganda
                      </p>
                      <div className="text-xs text-primary font-bold">✓ Apply through the app</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-l-4 border-l-warm-amber shadow-md rounded-[14px]">
                  <div className="flex items-start gap-4">
                    <Syringe className="w-6 h-6 text-warm-amber mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">Yellow Fever Vaccine</h3>
                      <p className="text-sm text-muted-foreground mb-2 font-medium">
                        Required for entry. Vaccine must be taken at least 10 days before travel.
                      </p>
                      <div className="text-xs text-warm-amber font-bold">⚠ Mandatory requirement</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 border-l-4 border-l-green-500 shadow-md rounded-[14px]">
                  <div className="flex items-start gap-4">
                    <DollarSign className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">Currency Exchange</h3>
                      <p className="text-sm text-muted-foreground mb-2 font-medium">
                        Local currencies: KES (Kenya), TZS (Tanzania), UGX (Uganda)
                      </p>
                      <div className="text-xs text-green-600 font-bold">✓ Exchange in-app</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 4: Emergency Setup */}
          {step === 4 && (
            <div className="w-full space-y-7 animate-in fade-in duration-500">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-bold">Emergency Information</h2>
                <p className="text-base text-muted-foreground font-medium">
                  Help us keep you safe during your journey
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-name" className="flex items-center gap-2 font-bold text-base">
                    <User className="w-5 h-5" />
                    Emergency Contact Name
                  </Label>
                  <Input
                    id="emergency-name"
                    placeholder="Full name"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    className="h-12 rounded-[12px] text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency-phone" className="flex items-center gap-2 font-bold text-base">
                    <Phone className="w-5 h-5" />
                    Emergency Contact Phone
                  </Label>
                  <Input
                    id="emergency-phone"
                    type="tel"
                    placeholder="+255 700 000 000"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="h-12 rounded-[12px] text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blood-type" className="flex items-center gap-2 font-bold text-base">
                    <Droplet className="w-5 h-5" />
                    Blood Type
                  </Label>
                  <select
                    id="blood-type"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full h-12 px-4 rounded-[12px] border border-border bg-background font-medium text-base"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <Card className="p-5 bg-gradient-to-br from-blue-600/10 to-blue-100/10 border-blue-200/50 shadow-md rounded-[14px]">
                  <div className="flex items-start gap-4">
                    <Building2 className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1 text-blue-900">Embassy Contacts</h3>
                      <p className="text-sm text-blue-700 font-medium">
                        We'll automatically provide embassy contacts based on your location
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 5: Preview */}
          {step === 5 && (
            <div className="w-full space-y-6 animate-in fade-in duration-500">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold">You're All Set!</h2>
                <p className="text-muted-foreground">
                  Ready to explore East Africa during AFCON 2027
                </p>
              </div>

              <Card className="p-6 space-y-4">
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Your Journey Path
                  </h3>
                  <div className="flex items-center gap-2">
                    {selectedPath.map((country, index) => (
                      <div key={country} className="contents">
                        <div className="flex flex-col items-center gap-1">
                          <CountryFlag country={country} size="md" />
                          <span className="text-xs capitalize">{country}</span>
                        </div>
                        {index < selectedPath.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-600" />
                    Emergency Contact
                  </h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>{emergencyName}</div>
                    <div>{emergencyPhone}</div>
                    <div>Blood Type: {bloodType}</div>
                  </div>
                </div>
              </Card>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>Pro tip:</strong> Download offline maps and match schedules before you travel. 
                  The emergency features work offline!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="p-7 border-t border-border bg-white shadow-lg">
          <div className="flex gap-3 max-w-md mx-auto">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 h-12 font-bold text-base"
                size="lg"
              >
                Back
              </Button>
            )}
            <Button
              onClick={() => {
                if (step === totalSteps) {
                  handleComplete();
                } else {
                  setStep(step + 1);
                }
              }}
              disabled={!canProceed()}
              className="flex-1 h-12 font-bold text-base shadow-md"
              size="lg"
            >
              {step === totalSteps ? 'Start Exploring' : 'Continue'}
            </Button>
          </div>
          {onSkip && (
            <div className="max-w-md mx-auto mt-3">
              <Button
                variant="ghost"
                onClick={onSkip}
                className="w-full h-11 font-semibold text-base"
                size="lg"
              >
                Skip to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface PathOptionProps {
  path: Country[];
  selected: boolean;
  onSelect: (path: Country[]) => void;
}

function PathOption({ path, selected, onSelect }: PathOptionProps) {
  const countryNames: Record<Country, string> = {
    kenya: 'Kenya',
    tanzania: 'Tanzania',
    uganda: 'Uganda'
  };

  return (
    <button
      onClick={() => onSelect(path)}
      className={`w-full p-5 rounded-[14px] border-2 transition-all shadow-sm ${
        selected
          ? 'border-primary bg-gradient-to-br from-primary/8 to-primary/5 shadow-md'
          : 'border-border hover:border-primary/40 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          {path.map((country, index) => (
            <div key={country} className="contents">
              <div className="flex flex-col items-center gap-1.5">
                <CountryFlag country={country} size="sm" />
                <span className="text-xs font-medium">{countryNames[country]}</span>
              </div>
              {index < path.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
        {selected && (
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </button>
  );
}