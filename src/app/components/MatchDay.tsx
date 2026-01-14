import React, { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  ArrowLeft,
  Ticket,
  CheckCircle2,
  Circle,
  MapPin,
  Navigation,
  UtensilsCrossed,
  Coffee,
  Beer,
  ShoppingBag,
  AlertCircle,
  Bus,
  Calendar,
  Clock,
  Thermometer,
  CloudRain,
  Info,
  DoorOpen,
  Accessibility
} from 'lucide-react';

interface MatchDayProps {
  onBack: () => void;
}

export function MatchDay({ onBack }: MatchDayProps) {
  const [activeTab, setActiveTab] = useState('checklist');
  const [selectedSeat] = useState({ section: 'A', row: '12', seat: '15' });

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
              <div className="flex-1">
                <h1 className="font-medium">Match Day Center</h1>
                <p className="text-sm text-muted-foreground">Tanzania vs Comoros</p>
              </div>
              <Badge className="bg-primary">Opening Match</Badge>
            </div>

            {/* Match Info Card */}
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent border-l-4 border-l-primary">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-lg">Tanzania vs Comoros</div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Jun 17, 2027</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>18:00 EAT</span>
                </div>
              </div>
              <div className="mt-2 text-sm flex items-start gap-1">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Benjamin Mkapa Stadium, Dar es Salaam</span>
              </div>
            </Card>
          </div>

          <TabsList className="w-full grid grid-cols-4 rounded-none h-auto">
            <TabsTrigger value="checklist" className="data-[state=active]:bg-background text-xs">
              Checklist
            </TabsTrigger>
            <TabsTrigger value="stadium" className="data-[state=active]:bg-background text-xs">
              Stadium
            </TabsTrigger>
            <TabsTrigger value="food" className="data-[state=active]:bg-background text-xs">
              Food
            </TabsTrigger>
            <TabsTrigger value="transport" className="data-[state=active]:bg-background text-xs">
              Transport
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="checklist" className="mt-0 p-4 space-y-4">
          {/* Pre-Match Checklist */}
          <Card className="p-5">
            <h3 className="font-medium mb-4">Pre-Match Checklist</h3>
            <div className="space-y-3">
              <ChecklistTaskItem
                completed={true}
                title="Match Ticket"
                description="Section A, Row 12, Seat 15"
                icon={<Ticket className="w-5 h-5" />}
              />
              <ChecklistTaskItem
                completed={true}
                title="Weather Check"
                description="24°C, Partly cloudy"
                icon={<Thermometer className="w-5 h-5" />}
              />
              <ChecklistTaskItem
                completed={false}
                title="Transport Booked"
                description="Book your ride to the stadium"
                icon={<Bus className="w-5 h-5" />}
                actionLabel="Book Now"
              />
              <ChecklistTaskItem
                completed={false}
                title="Pre-order Food"
                description="Skip the queue, order ahead"
                icon={<UtensilsCrossed className="w-5 h-5" />}
                actionLabel="Order"
              />
            </div>
          </Card>

          {/* Weather & Conditions */}
          <Card className="p-5">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-primary" />
              Match Conditions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold mb-1">24°C</div>
                <div className="text-xs text-muted-foreground">Temperature</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold mb-1">10%</div>
                <div className="text-xs text-muted-foreground">Rain Chance</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold mb-1">18:00</div>
                <div className="text-xs text-muted-foreground">Kickoff</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <div className="text-2xl font-bold mb-1">20:00</div>
                <div className="text-xs text-muted-foreground">Sunset</div>
              </div>
            </div>
          </Card>

          {/* Important Info */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 mb-1">Stadium Tips</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Gates open 2 hours before kickoff</li>
                  <li>• No large bags allowed (max 30cm)</li>
                  <li>• Water bottles must be plastic and sealed</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="stadium" className="mt-0 p-4 space-y-4">
          {/* Your Seat */}
          <Card className="p-5">
            <h3 className="font-medium mb-4">Your Seat Location</h3>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Section</div>
                  <div className="text-2xl font-bold text-primary">{selectedSeat.section}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Row</div>
                  <div className="text-2xl font-bold text-primary">{selectedSeat.row}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Seat</div>
                  <div className="text-2xl font-bold text-primary">{selectedSeat.seat}</div>
                </div>
              </div>
            </div>

            {/* Simple Stadium Map */}
            <div className="relative bg-muted rounded-lg p-6 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-20 border-2 border-green-500 rounded-lg relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    PITCH
                  </div>
                </div>
              </div>
              
              {/* Sections around the pitch */}
              <div className="relative h-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-12 bg-primary/20 rounded flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 bg-muted-foreground/20 rounded flex items-center justify-center text-xs font-bold">
                  C
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-16 bg-muted-foreground/20 rounded flex items-center justify-center text-xs font-bold">
                  D
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-16 bg-muted-foreground/20 rounded flex items-center justify-center text-xs font-bold">
                  B
                </div>
              </div>
            </div>

            <Button className="w-full gap-2">
              <Navigation className="w-4 h-4" />
              Navigate to Your Seat
            </Button>
          </Card>

          {/* Nearby Facilities */}
          <Card className="p-5">
            <h3 className="font-medium mb-4">Nearby Facilities</h3>
            <div className="space-y-3">
              <FacilityItem
                icon={<UtensilsCrossed className="w-5 h-5" />}
                name="Concessions Stand"
                location="Section A, Gate 3"
                distance="50m from your seat"
              />
              <FacilityItem
                icon={<DoorOpen className="w-5 h-5" />}
                name="Restrooms"
                location="Section A, Level 1"
                distance="30m from your seat"
              />
              <FacilityItem
                icon={<Accessibility className="w-5 h-5" />}
                name="First Aid Station"
                location="Main Concourse"
                distance="100m from your seat"
              />
              <FacilityItem
                icon={<ShoppingBag className="w-5 h-5" />}
                name="Merchandise Store"
                location="Main Entrance"
                distance="150m from your seat"
              />
            </div>
          </Card>

          {/* Emergency Exits */}
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900 mb-2">Emergency Exits</h3>
                <div className="text-sm text-red-700 space-y-1">
                  <div>• Nearest exit: Gate A3 (40m)</div>
                  <div>• Alternative exit: Gate A5 (70m)</div>
                  <div>• Emergency assembly point: Parking Lot B</div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="food" className="mt-0 p-4 space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-center">
              <strong>Pre-order now</strong> and skip the halftime queue!
            </p>
          </div>

          <FoodMenuItem
            name="Nyama Choma Platter"
            description="Grilled meat with ugali and kachumbari"
            price={850}
            category="Main Dish"
            icon={<UtensilsCrossed className="w-6 h-6" />}
          />
          <FoodMenuItem
            name="Samosa Combo (6pcs)"
            description="Beef or vegetable samosas with tamarind sauce"
            price={300}
            category="Snacks"
            icon={<UtensilsCrossed className="w-6 h-6" />}
          />
          <FoodMenuItem
            name="Tanzanian Coffee"
            description="Fresh brewed, locally sourced"
            price={200}
            category="Beverages"
            icon={<Coffee className="w-6 h-6" />}
          />
          <FoodMenuItem
            name="Tusker Lager"
            description="Ice cold beer (500ml)"
            price={350}
            category="Beverages"
            icon={<Beer className="w-6 h-6" />}
          />
          <FoodMenuItem
            name="Mandazi & Chai"
            description="Sweet fried dough with spiced tea"
            price={250}
            category="Snacks"
            icon={<Coffee className="w-6 h-6" />}
          />
        </TabsContent>

        <TabsContent value="transport" className="mt-0 p-4 space-y-4">
          <Card className="p-5">
            <h3 className="font-medium mb-4">Post-Match Transport</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Beat the rush! Book your ride now for pickup right after the final whistle.
            </p>

            <div className="space-y-3">
              <TransportOptionCard
                service="Uber"
                pickupTime="21:00 (15 min after match)"
                price={650}
                eta="25 min to hotel"
              />
              <TransportOptionCard
                service="Bolt"
                pickupTime="21:00 (15 min after match)"
                price={600}
                eta="25 min to hotel"
              />
              <TransportOptionCard
                service="Stadium Shuttle"
                pickupTime="21:15"
                price={200}
                eta="Drops at city center"
                recommended
              />
            </div>
          </Card>

          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-sm text-amber-900">
                <strong>Pro tip:</strong> Stadium shuttles run every 15 minutes and stop at major hotels. 
                They're the most reliable option on match days.
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChecklistTaskItem({
  completed,
  title,
  description,
  icon,
  actionLabel
}: {
  completed: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  actionLabel?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
        completed ? 'border-green-500 bg-green-500' : 'border-muted'
      }`}>
        {completed ? (
          <CheckCircle2 className="w-4 h-4 text-white" />
        ) : (
          <Circle className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className={`${completed ? 'text-muted-foreground' : 'text-foreground'}`}>
            {icon}
          </div>
          <span className={`font-medium ${completed ? 'line-through text-muted-foreground' : ''}`}>
            {title}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {actionLabel && !completed && (
        <Button variant="outline" size="sm" className="flex-shrink-0">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

function FacilityItem({
  icon,
  name,
  location,
  distance
}: {
  icon: React.ReactNode;
  name: string;
  location: string;
  distance: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-medium mb-1">{name}</div>
        <div className="text-sm text-muted-foreground">{location}</div>
        <div className="text-xs text-primary mt-1">{distance}</div>
      </div>
      <Navigation className="w-5 h-5 text-muted-foreground" />
    </div>
  );
}

function FoodMenuItem({
  name,
  description,
  price,
  category,
  icon
}: {
  name: string;
  description: string;
  price: number;
  category: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="font-medium">{name}</div>
              <Badge variant="secondary" className="text-xs mt-1">{category}</Badge>
            </div>
            <div className="font-bold text-primary">TSh {price}</div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <Button variant="outline" size="sm" className="w-full">
            Add to Order
          </Button>
        </div>
      </div>
    </Card>
  );
}

function TransportOptionCard({
  service,
  pickupTime,
  price,
  eta,
  recommended
}: {
  service: string;
  pickupTime: string;
  price: number;
  eta: string;
  recommended?: boolean;
}) {
  return (
    <div className={`p-4 rounded-lg border ${recommended ? 'border-primary bg-primary/5' : 'border-border'}`}>
      {recommended && (
        <Badge className="mb-2 bg-primary">Recommended</Badge>
      )}
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{service}</div>
        <div className="font-bold text-primary">TSh {price}</div>
      </div>
      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{pickupTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{eta}</span>
        </div>
      </div>
      <Button className="w-full mt-3" variant={recommended ? 'default' : 'outline'}>
        Book {service}
      </Button>
    </div>
  );
}