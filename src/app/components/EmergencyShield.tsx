import React, { useState } from 'react';
import { CountryFlag } from './CountryFlag';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  X,
  Phone,
  MapPin,
  Navigation,
  Building2,
  Heart,
  AlertTriangle,
  Share2,
  Shield,
  CheckCircle2,
  Siren,
  Hospital,
  MapPinned
} from 'lucide-react';
import type { Country } from './JourneyProgress';

interface EmergencyShieldProps {
  onClose: () => void;
  currentCountry: Country;
  currentCity: string;
}

export function EmergencyShield({ onClose, currentCountry, currentCity }: EmergencyShieldProps) {
  const [activeEmergency, setActiveEmergency] = useState<string | null>(null);
  const [sharingLocation, setSharingLocation] = useState(false);

  const emergencyContacts = {
    kenya: {
      police: '999',
      ambulance: '999',
      fire: '999',
      touristPolice: '+254 20 272 1111'
    },
    tanzania: {
      police: '112',
      ambulance: '114',
      fire: '115',
      touristPolice: '+255 22 211 8873'
    },
    uganda: {
      police: '999',
      ambulance: '911',
      fire: '999',
      touristPolice: '+256 41 425 6001'
    }
  };

  const embassies = {
    kenya: [
      { country: 'USA', phone: '+254 20 363 6000', address: 'United Nations Ave, Nairobi' },
      { country: 'UK', phone: '+254 20 284 4000', address: 'Upper Hill Rd, Nairobi' },
      { country: 'Canada', phone: '+254 20 366 3000', address: 'Limuru Rd, Nairobi' }
    ],
    tanzania: [
      { country: 'USA', phone: '+255 22 229 4000', address: '686 Old Bagamoyo Rd, Dar es Salaam' },
      { country: 'UK', phone: '+255 22 229 0000', address: 'Umoja House, Hamburg Ave' },
      { country: 'Canada', phone: '+255 22 216 3300', address: '38 Mirambo St, Dar es Salaam' }
    ],
    uganda: [
      { country: 'USA', phone: '+256 41 4259 791', address: '1577 Ggaba Rd, Kampala' },
      { country: 'UK', phone: '+256 31 231 2000', address: '4 Windsor Loop, Kampala' },
      { country: 'Canada', phone: '+256 41 425 8141', address: 'Kampala Rd, Kampala' }
    ]
  };

  const nearbyFacilities = {
    hospitals: [
      { name: 'Muhimbili National Hospital', distance: '2.3 km', phone: '+255 22 215 0596' },
      { name: 'Aga Khan Hospital Dar', distance: '3.1 km', phone: '+255 22 211 5151' }
    ],
    policeStations: [
      { name: 'Central Police Station', distance: '1.5 km', phone: '+255 22 211 7722' },
      { name: 'Tourist Police Unit', distance: '2.8 km', phone: '+255 22 211 8873' }
    ]
  };

  const handleEmergencyCall = (type: string, number: string) => {
    setActiveEmergency(type);
    // In a real app, this would initiate a call
    console.log(`Calling ${type}: ${number}`);
  };

  const handleShareLocation = () => {
    setSharingLocation(true);
    // In a real app, this would share location via SMS/WhatsApp
    setTimeout(() => setSharingLocation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-red-600 text-white overflow-y-auto">
      {/* Header */}
      <div className="bg-red-700 border-b border-red-500 sticky top-0 z-20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Emergency Shield</h1>
                <div className="flex items-center gap-2 text-sm opacity-90">
                  <MapPin className="w-3 h-3" />
                  <span>{currentCity}, {currentCountry}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {activeEmergency && (
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 flex items-center gap-2 animate-pulse">
              <Siren className="w-5 h-5" />
              <span className="font-medium">Connecting to {activeEmergency}...</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Actions */}
        <div className="space-y-2">
          <h2 className="font-medium text-sm opacity-90 px-1">IMMEDIATE HELP</h2>
          <div className="grid grid-cols-2 gap-3">
            <EmergencyButton
              icon={<Siren className="w-8 h-8" />}
              label="Police"
              number={emergencyContacts[currentCountry].police}
              onClick={() => handleEmergencyCall('Police', emergencyContacts[currentCountry].police)}
            />
            <EmergencyButton
              icon={<Hospital className="w-8 h-8" />}
              label="Ambulance"
              number={emergencyContacts[currentCountry].ambulance}
              onClick={() => handleEmergencyCall('Ambulance', emergencyContacts[currentCountry].ambulance)}
            />
          </div>
        </div>

        {/* Share Location */}
        <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
          <div className="flex items-center gap-3 mb-3">
            <MapPinned className="w-5 h-5" />
            <h3 className="font-medium">Share Live Location</h3>
          </div>
          <p className="text-sm opacity-90 mb-4">
            Send your real-time location to your emergency contact
          </p>
          <Button
            onClick={handleShareLocation}
            className="w-full bg-white text-red-600 hover:bg-white/90"
            disabled={sharingLocation}
          >
            {sharingLocation ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Location Shared
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 mr-2" />
                Share My Location
              </>
            )}
          </Button>
        </Card>

        {/* Tourist Police */}
        <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5" />
            <h3 className="font-medium">Tourist Police</h3>
          </div>
          <p className="text-sm opacity-90 mb-3">
            Specialized support for tourists
          </p>
          <Button
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/20"
            onClick={() => handleEmergencyCall('Tourist Police', emergencyContacts[currentCountry].touristPolice)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call {emergencyContacts[currentCountry].touristPolice}
          </Button>
        </Card>

        {/* Nearby Facilities */}
        <div className="space-y-3">
          <h2 className="font-medium text-sm opacity-90 px-1">NEARBY FACILITIES</h2>
          
          <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5" />
              <h3 className="font-medium">Nearest Hospitals</h3>
            </div>
            <div className="space-y-3">
              {nearbyFacilities.hospitals.map((hospital, index) => (
                <FacilityCard
                  key={index}
                  name={hospital.name}
                  distance={hospital.distance}
                  phone={hospital.phone}
                />
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5" />
              <h3 className="font-medium">Nearest Police Stations</h3>
            </div>
            <div className="space-y-3">
              {nearbyFacilities.policeStations.map((station, index) => (
                <FacilityCard
                  key={index}
                  name={station.name}
                  distance={station.distance}
                  phone={station.phone}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Embassy Contacts */}
        <div className="space-y-3">
          <h2 className="font-medium text-sm opacity-90 px-1">EMBASSY CONTACTS</h2>
          {embassies[currentCountry].map((embassy, index) => (
            <Card key={index} className="p-4 bg-white/10 backdrop-blur border-white/20">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium mb-1">{embassy.country} Embassy</div>
                  <div className="text-sm opacity-90 mb-2">{embassy.address}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white/20"
                  >
                    <Phone className="w-3 h-3 mr-2" />
                    {embassy.phone}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Your Emergency Info */}
        <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-medium">Your Emergency Info</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="opacity-90">Emergency Contact:</span>
              <span className="font-medium">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Phone:</span>
              <span className="font-medium">+255 700 000 000</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-90">Blood Type:</span>
              <span className="font-medium">O+</span>
            </div>
          </div>
        </Card>

        {/* Safety Tips */}
        <Card className="p-4 bg-white/10 backdrop-blur border-white/20">
          <h3 className="font-medium mb-2">Safety Tips</h3>
          <ul className="text-sm opacity-90 space-y-1">
            <li>• Stay calm and assess the situation</li>
            <li>• If possible, move to a safe, well-lit area</li>
            <li>• Keep your phone charged and accessible</li>
            <li>• Contact your hotel or tour operator if needed</li>
            <li>• All emergency services work offline</li>
          </ul>
        </Card>

        <div className="pb-6" />
      </div>
    </div>
  );
}

function EmergencyButton({
  icon,
  label,
  number,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  number: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-red-600 p-6 rounded-xl flex flex-col items-center gap-3 active:scale-95 transition-transform shadow-lg"
    >
      {icon}
      <div className="text-center">
        <div className="font-bold text-lg mb-1">{label}</div>
        <div className="text-sm opacity-70">{number}</div>
      </div>
    </button>
  );
}

function FacilityCard({
  name,
  distance,
  phone
}: {
  name: string;
  distance: string;
  phone: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="font-medium mb-1">{name}</div>
        <div className="text-sm opacity-90 flex items-center gap-1">
          <Navigation className="w-3 h-3" />
          {distance}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-white/30 text-white hover:bg-white/20"
        >
          <Navigation className="w-3 h-3 mr-1" />
          Navigate
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-white/30 text-white hover:bg-white/20"
        >
          <Phone className="w-3 h-3 mr-1" />
          Call
        </Button>
      </div>
    </div>
  );
}
