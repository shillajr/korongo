import React, { useState } from 'react';
import { CountryFlag } from './CountryFlag';
import { CurrencyDisplay, Currency } from './CurrencyDisplay';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Clock,
  Plane,
  Bus,
  Train,
  MapPin,
  Calendar,
  Users,
  Zap,
  Shield,
  Upload,
  Camera,
  Stamp
} from 'lucide-react';
import type { Country } from './JourneyProgress';

interface CrossBorderProps {
  fromCountry: Country;
  toCountry: Country;
  onBack: () => void;
}

export function CrossBorder({ fromCountry, toCountry, onBack }: CrossBorderProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [visaStep, setVisaStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-32">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-20">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="font-medium">Cross-Border Journey</h1>
            </div>

            <div className="flex items-center justify-center gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex flex-col items-center gap-1">
                <CountryFlag country={fromCountry} size="md" />
                <span className="text-xs capitalize font-medium">{fromCountry}</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="h-0.5 w-full bg-border relative">
                  <div className="absolute inset-0 bg-primary w-1/2" />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CountryFlag country={toCountry} size="md" />
                <span className="text-xs capitalize font-medium">{toCountry}</span>
              </div>
            </div>
          </div>

          <TabsList className="w-full grid grid-cols-3 rounded-none h-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              Overview
            </TabsTrigger>
            <TabsTrigger value="visa" className="data-[state=active]:bg-background">
              EAC Visa
            </TabsTrigger>
            <TabsTrigger value="transport" className="data-[state=active]:bg-background">
              Transport
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0 p-4 space-y-4">
          {/* Border Status */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Namanga Border Crossing</h3>
              <Badge variant="outline" className="border-amber-500 text-amber-700">
                <Clock className="w-3 h-3 mr-1" />
                45 min wait
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>Tanzania → Uganda Border</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>Moderate traffic</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-green-600">EAC Visa valid</span>
              </div>
            </div>
          </Card>

          {/* Travel Checklist */}
          <Card className="p-5">
            <h3 className="font-medium mb-4">Travel Checklist</h3>
            <div className="space-y-4">
              <ChecklistItem
                checked={true}
                label="Valid Passport"
                sublabel="Expires April 2028"
              />
              <ChecklistItem
                checked={true}
                label="EAC Tourist Visa"
                sublabel="Valid for Tanzania, Uganda, Zambia"
                status="complete"
              />
              <ChecklistItem
                checked={true}
                label="Yellow Fever Certificate"
                sublabel="Required for entry"
              />
              <ChecklistItem
                checked={false}
                label="Travel Insurance"
                sublabel="Recommended for cross-border travel"
                status="pending"
              />
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <FileText className="w-5 h-5" />
              <span className="text-sm">Documents</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">Schedule</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="visa" className="mt-0 p-4 space-y-4">
          {!showSuccess ? (
            <>
              {/* Visa Progress */}
              <Card className="p-5">
                <h3 className="font-medium mb-4">EAC Tourist Visa Application</h3>
                
                <div className="space-y-4 mb-6">
                  <VisaStepIndicator
                    step={1}
                    title="Personal Details"
                    completed={visaStep > 1}
                    active={visaStep === 1}
                  />
                  <VisaStepIndicator
                    step={2}
                    title="Upload Documents"
                    completed={visaStep > 2}
                    active={visaStep === 2}
                  />
                  <VisaStepIndicator
                    step={3}
                    title="Payment"
                    completed={visaStep > 3}
                    active={visaStep === 3}
                  />
                  <VisaStepIndicator
                    step={4}
                    title="Review & Submit"
                    completed={false}
                    active={visaStep === 4}
                  />
                </div>

                <Progress value={(visaStep / 4) * 100} className="mb-2" />
                <p className="text-xs text-muted-foreground text-center">
                  Step {visaStep} of 4
                </p>
              </Card>

              {/* Document Upload */}
              {visaStep === 2 && (
                <Card className="p-5">
                  <h3 className="font-medium mb-4">Required Documents</h3>
                  <div className="space-y-3">
                    <DocumentUploadCard title="Passport Photo Page" uploaded={true} />
                    <DocumentUploadCard title="Recent Passport Photo" uploaded={true} />
                    <DocumentUploadCard title="Yellow Fever Certificate" uploaded={false} />
                    <DocumentUploadCard title="Proof of Accommodation" uploaded={false} />
                  </div>
                </Card>
              )}

              {/* Visa Info */}
              <Card className="p-5 bg-primary/5 border-primary/20">
                <h3 className="font-medium mb-3">EAC Tourist Visa</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee:</span>
                    <CurrencyDisplay amount={100} currency="USD" className="font-medium" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span className="font-medium">2-3 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Validity:</span>
                    <span className="font-medium">90 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Countries:</span>
                    <span className="font-medium">Kenya, Tanzania, Uganda</span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                {visaStep > 1 && (
                  <Button variant="outline" className="flex-1" onClick={() => setVisaStep(visaStep - 1)}>
                    Back
                  </Button>
                )}
                <Button 
                  className="flex-1" 
                  onClick={() => {
                    if (visaStep < 4) {
                      setVisaStep(visaStep + 1);
                    } else {
                      setShowSuccess(true);
                    }
                  }}
                >
                  {visaStep === 4 ? 'Submit Application' : 'Continue'}
                </Button>
              </div>
            </>
          ) : (
            <BorderCrossingSuccess onContinue={() => setActiveTab('transport')} />
          )}
        </TabsContent>

        <TabsContent value="transport" className="mt-0 p-4 space-y-4">
          <TransportOption
            icon={<Plane className="w-6 h-6" />}
            type="Flight"
            provider="Air Tanzania"
            duration="1h 15min"
            price={220000}
            currency="TZS"
            features={["Direct flight", "2 daily departures", "Checked baggage"]}
            recommended={true}
          />

          <TransportOption
            icon={<Bus className="w-6 h-6" />}
            type="Bus"
            provider="Modern Coast Express"
            duration="6h 30min"
            price={65000}
            currency="TZS"
            features={["WiFi", "AC", "Rest stops"]}
          />

          <TransportOption
            icon={<Train className="w-6 h-6" />}
            type="Train"
            provider="SGR Express"
            duration="4h 45min"
            price={90000}
            currency="TZS"
            features={["Scenic route", "Dining car", "Power outlets"]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChecklistItem({ 
  checked, 
  label, 
  sublabel, 
  status 
}: { 
  checked: boolean; 
  label: string; 
  sublabel: string; 
  status?: 'pending' | 'complete'; 
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
        checked ? 'border-green-500 bg-green-500' : 'border-muted'
      }`}>
        {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{label}</span>
          {status === 'pending' && (
            <Badge variant="outline" className="text-xs border-amber-500 text-amber-700">
              Pending
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
}

function VisaStepIndicator({ 
  step, 
  title, 
  completed, 
  active 
}: { 
  step: number; 
  title: string; 
  completed: boolean; 
  active: boolean; 
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
        completed ? 'bg-green-500 text-white' :
        active ? 'bg-primary text-white' :
        'bg-muted text-muted-foreground'
      }`}>
        {completed ? <CheckCircle2 className="w-5 h-5" /> : step}
      </div>
      <span className={`font-medium ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
        {title}
      </span>
    </div>
  );
}

function DocumentUploadCard({ title, uploaded }: { title: string; uploaded: boolean }) {
  return (
    <div className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        {uploaded ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Upload className="w-5 h-5 text-muted-foreground" />
        )}
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted-foreground">
            {uploaded ? 'Uploaded' : 'Tap to upload or take photo'}
          </div>
        </div>
        {!uploaded && <Camera className="w-5 h-5 text-muted-foreground" />}
      </div>
    </div>
  );
}

function TransportOption({
  icon,
  type,
  provider,
  duration,
  price,
  currency,
  features,
  recommended
}: {
  icon: React.ReactNode;
  type: string;
  provider: string;
  duration: string;
  price: number;
  currency: Currency;
  features: string[];
  recommended?: boolean;
}) {
  return (
    <Card className={`p-4 ${recommended ? 'border-primary border-2' : ''}`}>
      {recommended && (
        <Badge className="mb-3 bg-primary">
          <Zap className="w-3 h-3 mr-1" />
          Recommended
        </Badge>
      )}
      
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
          {icon}
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <div className="font-medium">{provider}</div>
            <div className="text-sm text-muted-foreground">{type}</div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{duration}</span>
            </div>
            <CurrencyDisplay amount={price} currency={currency} className="font-bold text-primary" />
          </div>

          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <Button className="w-full" variant={recommended ? 'default' : 'outline'}>
            Book Now
          </Button>
        </div>
      </div>
    </Card>
  );
}

function BorderCrossingSuccess({ onContinue }: { onContinue: () => void }) {
  return (
    <Card className="p-8 text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <Stamp className="w-12 h-12 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Visa Approved!</h2>
        <p className="text-muted-foreground">
          Your EAC visa has been issued. You're ready to cross the border.
        </p>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Visa Number</span>
          <span className="font-mono font-medium">EAC-2027-1547</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Valid Until</span>
          <span className="font-medium">April 15, 2027</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Countries</span>
          <span className="font-medium">Kenya, Tanzania, Uganda</span>
        </div>
      </div>

      <div className="pt-4">
        <Button className="w-full" size="lg" onClick={onContinue}>
          Continue Journey
        </Button>
      </div>
    </Card>
  );
}