import React, { useState } from 'react';
import { CountryFlag } from './CountryFlag';
import { CurrencyDisplay, Currency } from './CurrencyDisplay';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  ArrowLeft,
  Palmtree,
  MapPin,
  Clock,
  Users,
  Star,
  Camera,
  Award,
  CheckCircle2,
  Info,
  Calendar,
  Shield,
  Binoculars,
  Footprints,
  Mountain
} from 'lucide-react';
import type { Country } from './JourneyProgress';

interface SafariProps {
  onBack: () => void;
  currentCountry: Country;
}

export function Safari({ onBack, currentCountry }: SafariProps) {
  const [activeTab, setActiveTab] = useState('parks');
  const [selectedPark, setSelectedPark] = useState<string | null>(null);

  const parks = [
    {
      id: 'masai-mara',
      name: 'Masai Mara National Reserve',
      country: 'tanzania' as Country,
      distance: '335 km from Dar es Salaam',
      duration: '5-6 hours',
      price: 390000,
      currency: 'TZS' as Currency,
      rating: 4.9,
      highlights: ['Big Five', 'Great Migration', 'Hot Air Balloons'],
      bestTime: 'July - October',
      description: 'World-famous for the annual wildebeest migration',
      image: '🦁'
    },
    {
      id: 'serengeti',
      name: 'Serengeti National Park',
      country: 'tanzania' as Country,
      distance: '335 km from Arusha',
      duration: '6-7 hours',
      price: 185000,
      currency: 'TZS' as Currency,
      rating: 5.0,
      highlights: ['Big Five', 'Great Migration', 'Endless Plains'],
      bestTime: 'June - October',
      description: 'Tanzania\'s oldest and most popular national park',
      image: '🦓'
    },
    {
      id: 'bwindi',
      name: 'Bwindi Impenetrable Forest',
      country: 'uganda' as Country,
      distance: '520 km from Kampala',
      duration: '8-9 hours',
      price: 2800000,
      currency: 'UGX' as Currency,
      rating: 4.8,
      highlights: ['Mountain Gorillas', 'Bird Watching', 'Hiking Trails'],
      bestTime: 'June - September',
      description: 'Home to nearly half of the world\'s mountain gorillas',
      image: '🦍'
    },
    {
      id: 'amboseli',
      name: 'Amboseli National Park',
      country: 'tanzania' as Country,
      distance: '440 km from Dar es Salaam',
      duration: '4-5 hours',
      price: 220000,
      currency: 'TZS' as Currency,
      rating: 4.7,
      highlights: ['Elephants', 'Mt. Kilimanjaro Views', 'Bird Life'],
      bestTime: 'June - October',
      description: 'Best place to view Mt. Kilimanjaro and large elephant herds',
      image: '🐘'
    },
    {
      id: 'ngorongoro',
      name: 'Ngorongoro Crater',
      country: 'tanzania' as Country,
      distance: '180 km from Arusha',
      duration: '3-4 hours',
      price: 165000,
      currency: 'TZS' as Currency,
      rating: 4.9,
      highlights: ['Crater Floor', 'Big Five', 'Black Rhinos'],
      bestTime: 'Year-round',
      description: 'World\'s largest intact volcanic caldera',
      image: '🦏'
    },
    {
      id: 'queen-elizabeth',
      name: 'Queen Elizabeth National Park',
      country: 'uganda' as Country,
      distance: '420 km from Kampala',
      duration: '6-7 hours',
      price: 1450000,
      currency: 'UGX' as Currency,
      rating: 4.6,
      highlights: ['Tree-Climbing Lions', 'Boat Safari', 'Chimps'],
      bestTime: 'June - September',
      description: 'Uganda\'s most popular savannah park',
      image: '🦁'
    }
  ];

  const photoChallenges = [
    { id: 1, animal: 'Elephant', completed: true, points: 100 },
    { id: 2, animal: 'Lion', completed: true, points: 150 },
    { id: 3, animal: 'Giraffe', completed: false, points: 100 },
    { id: 4, animal: 'Zebra', completed: false, points: 80 },
    { id: 5, animal: 'Buffalo', completed: false, points: 120 }
  ];

  const totalPoints = photoChallenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0);

  return (
    <div className="min-h-screen bg-background pb-32">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Header */}
        <div className="bg-card border-b border-border sticky top-0 z-20">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h1 className="font-medium">Safari & Wildlife</h1>
                <p className="text-sm text-muted-foreground">
                  Combine football with adventure
                </p>
              </div>
              <Palmtree className="w-6 h-6 text-primary" />
            </div>
          </div>

          <TabsList className="w-full grid grid-cols-3 rounded-none h-auto">
            <TabsTrigger value="parks" className="data-[state=active]:bg-background">
              Parks
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="data-[state=active]:bg-background">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-background">
              Challenges
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 space-y-4">
          <TabsContent value="parks" className="mt-0 space-y-4">
            {/* Featured Info */}
            <Card className="p-4 bg-gradient-to-br from-green-50 to-transparent border-l-4 border-l-green-500">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm text-green-900">
                  <strong>Match Days + Safari Package:</strong> Book safari tours scheduled around match dates. 
                  All operators are verified and AFCON-friendly!
                </div>
              </div>
            </Card>

            {/* Parks by Country */}
            {(['kenya', 'tanzania', 'uganda'] as Country[]).map((country) => {
              const countryParks = parks.filter((p) => p.country === country);
              return (
                <div key={country} className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <CountryFlag country={country} size="sm" />
                    <h3 className="font-medium capitalize">{country} National Parks</h3>
                  </div>
                  {countryParks.map((park) => (
                    <ParkCard
                      key={park.id}
                      park={park}
                      onSelect={() => setSelectedPark(park.id)}
                    />
                  ))}
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="itinerary" className="mt-0 space-y-4">
            <Card className="p-5">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Combined Football + Safari Itinerary
              </h3>
              
              <div className="space-y-4">
                <ItineraryDay
                  day={1}
                  date="Jan 15"
                  title="Arrival in Dar es Salaam"
                  activities={[
                    'Check-in to hotel',
                    'Evening tour of Dar es Salaam',
                    'Welcome dinner'
                  ]}
                />
                <ItineraryDay
                  day={2}
                  date="Jan 16"
                  title="Dar es Salaam - Serengeti"
                  activities={[
                    'Early morning departure',
                    'Arrive Masai Mara (afternoon)',
                    'Evening game drive'
                  ]}
                  highlight
                />
                <ItineraryDay
                  day={3}
                  date="Jan 17"
                  title="Match Day in Dar es Salaam"
                  activities={[
                    'Return to Dar es Salaam (morning)',
                    'Rest and prepare',
                    'Tanzania vs DR Congo match (18:00)'
                  ]}
                  matchDay
                />
                <ItineraryDay
                  day={4}
                  date="Jan 18"
                  title="Cross border to Tanzania"
                  activities={[
                    'Border crossing assistance',
                    'Arrive Arusha',
                    'Hotel check-in'
                  ]}
                />
              </div>

              <Button className="w-full mt-4">
                Customize Itinerary
              </Button>
            </Card>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm text-blue-900">
                  <strong>Verified Operators Only:</strong> All safari operators are licensed, 
                  insured, and have been vetted for quality and safety.
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="mt-0 space-y-4">
            <Card className="p-5 bg-gradient-to-br from-amber-50 to-transparent">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-600" />
                  <div>
                    <h3 className="font-medium">Wildlife Photo Challenge</h3>
                    <p className="text-sm text-muted-foreground">Collect stamps and earn rewards</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{totalPoints}</div>
                  <div className="text-xs text-muted-foreground">Points</div>
                </div>
              </div>

              <div className="space-y-2">
                {photoChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-3 rounded-lg border flex items-center justify-between ${
                      challenge.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {challenge.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Camera className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <div className={`font-medium ${challenge.completed ? 'text-green-900' : ''}`}>
                          {challenge.animal}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {challenge.points} points
                        </div>
                      </div>
                    </div>
                    {!challenge.completed && (
                      <Button variant="outline" size="sm">
                        <Camera className="w-3 h-3 mr-1" />
                        Snap
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Binoculars className="w-5 h-5 text-primary" />
                Wildlife Spotting Guide
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <AnimalCard name="Lion" icon="🦁" rarity="Common" />
                <AnimalCard name="Elephant" icon="🐘" rarity="Common" />
                <AnimalCard name="Rhino" icon="🦏" rarity="Rare" />
                <AnimalCard name="Leopard" icon="🐆" rarity="Rare" />
                <AnimalCard name="Cheetah" icon="🐆" rarity="Uncommon" />
                <AnimalCard name="Giraffe" icon="🦒" rarity="Common" />
              </div>
            </Card>

            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm text-amber-900">
                  <strong>Earn Rewards:</strong> Complete photo challenges to unlock discounts on 
                  future safaris and merchandise!
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

interface Park {
  id: string;
  name: string;
  country: Country;
  distance: string;
  duration: string;
  price: number;
  currency: Currency;
  rating: number;
  highlights: string[];
  bestTime: string;
  description: string;
  image: string;
}

function ParkCard({ park, onSelect }: { park: Park; onSelect: () => void }) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <div className="text-5xl">{park.image}</div>
        
        <div className="flex-1 space-y-3">
          <div>
            <div className="font-medium mb-1">{park.name}</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{park.rating}</span>
              </div>
              <span>•</span>
              <span className="capitalize">{park.country}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">{park.description}</p>

          <div className="flex flex-wrap gap-2">
            {park.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <CurrencyDisplay
                amount={park.price}
                currency={park.currency}
                className="font-bold text-primary"
              />
              <div className="text-xs text-muted-foreground">per person</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{park.distance}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{park.duration}</span>
            </div>
          </div>

          <Button className="w-full" onClick={onSelect}>
            Book Safari Tour
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ItineraryDay({
  day,
  date,
  title,
  activities,
  highlight,
  matchDay
}: {
  day: number;
  date: string;
  title: string;
  activities: string[];
  highlight?: boolean;
  matchDay?: boolean;
}) {
  return (
    <div className={`p-4 rounded-lg border ${
      matchDay ? 'border-red-200 bg-red-50' :
      highlight ? 'border-primary bg-primary/5' :
      'border-border bg-muted/30'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
          matchDay ? 'bg-red-600 text-white' :
          highlight ? 'bg-primary text-white' :
          'bg-muted text-foreground'
        }`}>
          {day}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{title}</span>
            {matchDay && <Badge className="bg-red-600">Match Day</Badge>}
            {highlight && <Badge className="bg-primary">Safari</Badge>}
          </div>
          <div className="text-sm text-muted-foreground mb-2">{date}</div>
          <ul className="text-sm space-y-1">
            {activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AnimalCard({ name, icon, rarity }: { name: string; icon: string; rarity: string }) {
  const rarityColor = 
    rarity === 'Common' ? 'text-green-600 bg-green-50' :
    rarity === 'Uncommon' ? 'text-blue-600 bg-blue-50' :
    'text-purple-600 bg-purple-50';

  return (
    <div className="p-3 border border-border rounded-lg text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-medium text-sm mb-1">{name}</div>
      <Badge variant="secondary" className={`text-xs ${rarityColor}`}>
        {rarity}
      </Badge>
    </div>
  );
}