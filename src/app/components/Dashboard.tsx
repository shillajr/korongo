import React from 'react';
import { CountryFlag } from './CountryFlag';
import { JourneyProgress, Country } from './JourneyProgress';
import { CulturalPattern } from './CulturalPattern';
import { OnlineStatusBadge } from './OfflineIndicator';
import { CurrencyDisplay } from './CurrencyDisplay';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  MapPin,
  Calendar,
  Clock,
  CloudRain,
  AlertTriangle,
  ArrowRightLeft,
  Bus,
  Trophy,
  Palmtree,
  Ticket,
  Users,
  Navigation,
  Thermometer,
  IdCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Globe,
  Star,
  TrendingUp
} from 'lucide-react';

interface DashboardProps {
  currentCountry: Country;
  currentCity: string;
  visitedCountries: Country[];
  journeyPath: Country[];
  onNavigate: (view: string) => void;
}

export function Dashboard({ 
  currentCountry, 
  currentCity, 
  visitedCountries, 
  journeyPath,
  onNavigate 
}: DashboardProps) {
  // Check if user has FAN ID
  const [fanIdData, setFanIdData] = React.useState<{status: 'pending' | 'approved' | 'rejected'; fanIdNumber?: string} | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userName, setUserName] = React.useState('Fan');

  React.useEffect(() => {
    const saved = localStorage.getItem('korongo_fan_id');
    if (saved) {
      const data = JSON.parse(saved);
      setFanIdData(data);
      if (data.fullName) {
        setUserName(data.fullName.split(' ')[0]);
      }
    }
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Calculate days until tournament start (Jan 17, 2027)
  const tournamentStart = new Date('2027-01-17');
  const today = new Date();
  const daysUntilStart = Math.ceil((tournamentStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Mock live/recent matches for ticker
  const liveMatches = [
    { id: 1, teamA: 'Nigeria', teamB: 'Ghana', scoreA: 2, scoreB: 1, isLive: true },
    { id: 2, teamA: 'Egypt', teamB: 'Morocco', scoreA: 0, scoreB: 0, isLive: true },
    { id: 3, teamA: 'Senegal', teamB: 'Cameroon', scoreA: 3, scoreB: 2, isLive: false },
  ];

  // Quick stats data
  const quickStats = {
    matchesPlanned: 52,
    ticketsBought: 2,
    countriesVisited: visitedCountries.length,
    hoursToNextBorder: 4
  };

  // Mock data for next match
  const nextMatch = {
    homeTeam: 'Tanzania',
    awayTeam: 'Comoros',
    date: '2027-06-17',
    time: '18:00',
    venue: 'Benjamin Mkapa Stadium',
    city: 'Dar es Salaam',
    country: 'tanzania' as Country
  };

  // Mock border status
  const borderStatus = {
    name: 'Tunduma Border',
    waitTime: '45 min',
    status: 'moderate' as const,
    nextCountry: 'Zambia'
  };

  // Mock weather
  const weather = {
    temp: 24,
    condition: 'Partly Cloudy',
    alert: null as string | null
  };

  return (
    <div className={`min-h-screen bg-background pb-32 theme-${currentCountry}`}>
      <CulturalPattern variant="geometric" opacity={0.015} />
      
      <div className="relative z-10">
        {/* Header - Modern & Clean */}
        <div className="bg-white sticky top-0 z-20 shadow-sm">
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CountryFlag country={currentCountry} size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">{currentCity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {currentCountry}
                  </p>
                </div>
              </div>
              <OnlineStatusBadge />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Badge variant="secondary" className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5">
                <Thermometer className="w-3.5 h-3.5" />
                {weather.temp}°C
              </Badge>
              <Badge variant="secondary" className="whitespace-nowrap rounded-full px-3 py-1.5">
                {weather.condition}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5">
                <Clock className="w-3.5 h-3.5" />
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5 space-y-6">
          
          {/* Personalized Hero Section with Countdown - Tanzania Colors */}
          <div className="bg-gradient-to-br from-[#1EB53A] via-[#000000] to-[#00A3DD] text-white p-5 rounded-xl relative overflow-hidden">
            {/* Tanzania flag diagonal stripe effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-transparent via-[#FCD116] to-transparent opacity-30 rotate-[-20deg] scale-150" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">👋</span>
                <h1 className="text-xl font-bold">Welcome back, {userName}!</h1>
              </div>
              <p className="text-sm opacity-90 mb-4">Your AFCON 2027 journey awaits</p>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <span className="text-3xl font-bold">{daysUntilStart > 0 ? daysUntilStart : 0}</span>
                  <p className="text-xs opacity-80">Days to Kickoff</p>
                </div>
                <div className="w-px h-10 bg-[#FCD116]/50" />
                <div className="text-center">
                  <span className="text-3xl font-bold">{quickStats.matchesPlanned}</span>
                  <p className="text-xs opacity-80">Matches Planned</p>
                </div>
                <div className="w-px h-10 bg-[#FCD116]/50" />
                <div className="text-center">
                  <span className="text-3xl font-bold">3</span>
                  <p className="text-xs opacity-80">Countries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Score Ticker */}
          {liveMatches.some(m => m.isLive) && (
            <div className="overflow-hidden rounded-lg bg-gray-100">
              <div className="py-2 px-3 bg-red-600 text-white text-xs font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE MATCHES
              </div>
              <div className="overflow-x-auto whitespace-nowrap py-3 px-2">
                <div className="inline-flex gap-3">
                  {liveMatches.map(match => (
                    <div 
                      key={match.id} 
                      className="inline-flex items-center gap-3 bg-white px-4 py-2.5 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onNavigate('matches')}
                    >
                      {match.isLive && (
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                      <span className="font-medium">{match.teamA}</span>
                      <span className="font-bold text-lg">{match.scoreA} - {match.scoreB}</span>
                      <span className="font-medium">{match.teamB}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Row - Tanzania Colors */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Calendar, value: quickStats.matchesPlanned.toString(), label: 'Matches', color: 'text-[#1EB53A]' },
              { icon: Ticket, value: quickStats.ticketsBought.toString(), label: 'Tickets', color: 'text-[#00A3DD]' },
              { icon: Globe, value: quickStats.countriesVisited.toString(), label: 'Countries', color: 'text-[#FCD116]' },
              { icon: Clock, value: `${quickStats.hoursToNextBorder}h`, label: 'To Border', color: 'text-[#1EB53A]' },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-3 rounded-lg text-center border border-gray-100">
                <stat.icon className={`mx-auto ${stat.color}`} size={20} />
                <p className="font-bold mt-1 text-lg">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Journey Progress */}
          <JourneyProgress
            currentCountry={currentCountry}
            visitedCountries={visitedCountries}
            journeyPath={journeyPath}
          />

          {/* Next Match Card - Hero Style */}
          <Card className="overflow-hidden border-0">
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Next Match</h2>
                    <p className="text-sm text-muted-foreground">Don't miss it!</p>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-1">Today</Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white rounded-2xl p-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-right flex-1">
                      <div className="font-semibold text-lg">{nextMatch.homeTeam}</div>
                    </div>
                    <div className="px-4 py-2 bg-muted rounded-full">
                      <span className="font-bold text-sm">VS</span>
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold text-lg">{nextMatch.awayTeam}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">Jan 17, 2027</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">{nextMatch.time} EAT</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{nextMatch.venue}, {nextMatch.city}</span>
                </div>

                <Button 
                  className="w-full mt-2 h-12 font-semibold transition-all" 
                  size="lg" 
                  onClick={() => onNavigate('matchday')}
                >
                  View Match Details
                </Button>
              </div>
            </div>
          </Card>

          {/* Border Status - Tanzania Blue */}
          <Card className="overflow-hidden border-0">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00A3DD]/10 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-[#00A3DD]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Next Border</h3>
                    <p className="text-sm text-muted-foreground">Real-time status</p>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  className={`rounded-full ${
                    borderStatus.status === 'light' ? 'border-[#1EB53A] text-[#1EB53A] bg-[#1EB53A]/10' :
                    borderStatus.status === 'moderate' ? 'border-[#FCD116] text-amber-700 bg-[#FCD116]/20' :
                    'border-red-500 text-red-700 bg-red-50'
                  }`}
                >
                  {borderStatus.waitTime} wait
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="font-semibold text-base">{borderStatus.name}</div>
                <div className="text-sm text-muted-foreground">
                  Crossing to {borderStatus.nextCountry}
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        borderStatus.status === 'light' ? 'bg-[#1EB53A]' :
                        borderStatus.status === 'moderate' ? 'bg-[#FCD116]' :
                        'bg-red-500'
                      }`}
                      style={{ width: '60%' }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">Moderate</span>
                </div>
              </div>
            </div>
          </Card>

          {/* FAN ID Widget Card - STANDOUT */}
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#1EB53A] via-[#FCD116] to-[#00A3DD] rounded-2xl opacity-75 blur-sm" />
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
              {/* Diagonal stripe decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FCD116]/30 to-transparent rounded-bl-full" />
              
              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1EB53A] to-[#00A3DD] flex items-center justify-center shadow-lg">
                      <IdCard className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">FAN ID</h3>
                        <span className="text-xs bg-[#1EB53A]/10 text-[#1EB53A] px-2 py-0.5 rounded-full font-semibold">REQUIRED</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {fanIdData ? 'Your Stadium Access Pass' : 'Mandatory for AFCON 2027'}
                      </p>
                    </div>
                  </div>
                  {fanIdData && (
                    <Badge 
                      className={`rounded-full px-3 py-1 ${
                        fanIdData.status === 'approved' ? 'bg-[#1EB53A] text-white' :
                        fanIdData.status === 'pending' ? 'bg-[#FCD116] text-black' :
                        'bg-red-500 text-white'
                      }`}
                    >
                      {fanIdData.status === 'approved' && <CheckCircle className="w-3.5 h-3.5 mr-1.5" />}
                      {fanIdData.status === 'pending' && <AlertCircle className="w-3.5 h-3.5 mr-1.5" />}
                      {fanIdData.status === 'rejected' && <XCircle className="w-3.5 h-3.5 mr-1.5" />}
                      {fanIdData.status === 'approved' ? 'Active' : fanIdData.status === 'pending' ? 'Pending' : 'Rejected'}
                    </Badge>
                  )}
                </div>
                
                {fanIdData ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-[#00A3DD]/15 via-white to-[#1EB53A]/15 rounded-xl border border-gray-100">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">FAN ID Number</p>
                      <p className="font-mono font-bold text-lg tracking-wide">{fanIdData.fanIdNumber}</p>
                    </div>
                    <Button
                      className="w-full h-12 bg-gradient-to-r from-[#1EB53A] to-[#00A3DD] hover:opacity-90 text-white font-semibold"
                      onClick={() => onNavigate('fanid')}
                    >
                      <IdCard className="w-5 h-5 mr-2" />
                      View Full FAN ID
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-[#FCD116]/25 rounded-xl border border-[#FCD116]/50">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-900 mb-1">
                          FAN ID is mandatory
                        </p>
                        <p className="text-xs text-amber-700">
                          Required for stadium entry, fan zones, and special discounts
                        </p>
                      </div>
                    </div>
                    <Button
                      className="w-full h-12 bg-gradient-to-r from-[#1EB53A] to-[#00A3DD] hover:opacity-90 text-white font-semibold shadow-lg"
                      onClick={() => onNavigate('fanid')}
                    >
                      <IdCard className="w-5 h-5 mr-2" />
                      Create Your FAN ID Now
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Smart Recommendations - Tanzania Colors */}
          <Card className="p-4 border-0 bg-gradient-to-br from-[#00A3DD]/10 to-white">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-[#00A3DD]" />
              <h3 className="font-semibold">Recommended for You</h3>
            </div>
            <div className="space-y-2">
              {!fanIdData && (
                <button 
                  onClick={() => onNavigate('fanid')}
                  className="w-full flex items-center gap-3 p-3 bg-[#FCD116]/20 rounded-lg hover:bg-[#FCD116]/30 transition-colors text-left"
                >
                  <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-amber-900">Complete your FAN ID</span>
                    <p className="text-xs text-amber-700">Required for stadium access</p>
                  </div>
                  <TrendingUp className="text-amber-500" size={16} />
                </button>
              )}
              <button 
                onClick={() => onNavigate('safari')}
                className="w-full flex items-center gap-3 p-3 bg-[#1EB53A]/10 rounded-lg hover:bg-[#1EB53A]/20 transition-colors text-left"
              >
                <Palmtree className="text-[#1EB53A] flex-shrink-0" size={20} />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Serengeti Safari</span>
                  <p className="text-xs text-gray-600">Experience Tanzania's wildlife</p>
                </div>
                <Star className="text-[#1EB53A]" size={16} />
              </button>
              <button 
                onClick={() => onNavigate('matches')}
                className="w-full flex items-center gap-3 p-3 bg-[#00A3DD]/10 rounded-lg hover:bg-[#00A3DD]/20 transition-colors text-left"
              >
                <Trophy className="text-[#00A3DD] flex-shrink-0" size={20} />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-900">Tanzania vs DR Congo</span>
                  <p className="text-xs text-gray-600">Opening match at National Stadium</p>
                </div>
                <Ticket className="text-[#00A3DD]" size={16} />
              </button>
            </div>
          </Card>

          {/* Quick Actions - Grid Layout */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg px-1">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <QuickActionButton
                icon={<ArrowRightLeft className="w-6 h-6" />}
                label="Cross Border"
                onClick={() => onNavigate('border')}
                color="primary"
              />
              <QuickActionButton
                icon={<Bus className="w-6 h-6" />}
                label="Book Transport"
                onClick={() => onNavigate('border')}
                color="blue"
              />
              <QuickActionButton
                icon={<Trophy className="w-6 h-6" />}
                label="Matches"
                onClick={() => onNavigate('matches')}
                color="green"
              />
              <QuickActionButton
                icon={<Palmtree className="w-6 h-6" />}
                label="Safari Tours"
                onClick={() => onNavigate('safari')}
                color="amber"
              />
            </div>
          </div>

          {/* Weather Alert (if any) */}
          {weather.alert && (
            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-amber-900 mb-1">Weather Alert</h3>
                  <p className="text-sm text-amber-700">{weather.alert}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Community Tips */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Local Tips</h3>
            </div>
            <div className="space-y-3">
              <TipCard
                tip="Best ugali and nyama choma in Dar at Mamboz Corner BBQ"
                upvotes={156}
                location="Dar es Salaam, Tanzania"
              />
              <TipCard
                tip="Use CRDB or NMB banks for best currency exchange rates"
                upvotes={124}
                location="Dar es Salaam, Tanzania"
              />
              <TipCard
                tip="Take a dala-dala (local minibus) for authentic experience - only 500 TSh!"
                upvotes={98}
                location="Dar es Salaam, Tanzania"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: 'primary' | 'blue' | 'green' | 'amber';
}

function QuickActionButton({ icon, label, onClick, color }: QuickActionButtonProps) {
  // Tanzania flag colors: Green #1EB53A, Yellow #FCD116, Black #000000, Blue #00A3DD
  const colorClasses = {
    primary: 'bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20',
    blue: 'bg-[#00A3DD]/10 text-[#00A3DD] hover:bg-[#00A3DD]/20',
    green: 'bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20',
    amber: 'bg-[#FCD116]/20 text-amber-700 hover:bg-[#FCD116]/30'
  };

  return (
    <button
      onClick={onClick}
      className={`p-5 border-0 ${colorClasses[color]} transition-all active:scale-95 flex flex-col items-center gap-3 min-h-[110px] justify-center`}
      style={{ borderRadius: '9px' }}
    >
      {icon}
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

interface TipCardProps {
  tip: string;
  upvotes: number;
  location: string;
}

function TipCard({ tip, upvotes, location }: TipCardProps) {
  return (
    <div className="p-3 bg-muted/50 rounded-lg">
      <p className="text-sm mb-2">{tip}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{location}</span>
        <div className="flex items-center gap-1">
          <span>👍</span>
          <span>{upvotes}</span>
        </div>
      </div>
    </div>
  );
}