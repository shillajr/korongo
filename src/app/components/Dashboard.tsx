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
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CountryFlag country={currentCountry} size="lg" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold leading-tight">{currentCity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4" />
                    {currentCountry}
                  </p>
                </div>
              </div>
              <OnlineStatusBadge />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Badge variant="secondary" className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 shadow-sm">
                <Thermometer className="w-4 h-4" />
                {weather.temp}°C
              </Badge>
              <Badge variant="secondary" className="whitespace-nowrap rounded-full px-3 py-1.5 shadow-sm">
                {weather.condition}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5">
                <Clock className="w-4 h-4" />
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          
          {/* Personalized Hero Section with Countdown - Modern Airbnb-style */}
          <div className="bg-gradient-to-br from-primary/85 via-primary/75 to-primary/90 text-white p-8 rounded-[20px] relative overflow-hidden shadow-lg">
            {/* Subtle geometric accent */}
            <div className="absolute inset-0 overflow-hidden opacity-15">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-warm-amber rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent rounded-full blur-2xl" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">👋</span>
                <h1 className="text-3xl font-bold leading-tight">Welcome back, {userName}!</h1>
              </div>
              <p className="text-base opacity-90 mb-6 font-medium">Your AFCON 2027 journey awaits</p>
              
              <div className="flex items-center gap-8 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="text-center">
                  <span className="text-4xl font-bold block">{daysUntilStart > 0 ? daysUntilStart : 0}</span>
                  <p className="text-sm opacity-90 mt-1 font-medium">Days to Kickoff</p>
                </div>
                <div className="w-px h-12 bg-white/30" />
                <div className="text-center">
                  <span className="text-4xl font-bold block">{quickStats.matchesPlanned}</span>
                  <p className="text-sm opacity-90 mt-1 font-medium">Matches</p>
                </div>
                <div className="w-px h-12 bg-white/30" />
                <div className="text-center">
                  <span className="text-4xl font-bold block">3</span>
                  <p className="text-sm opacity-90 mt-1 font-medium">Countries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Score Ticker */}
          {liveMatches.some(m => m.isLive) && (
            <div className="overflow-hidden rounded-[16px] bg-gray-100 shadow-md border border-border">
              <div className="py-3 px-4 bg-red-600 text-white text-xs font-bold flex items-center gap-2 uppercase tracking-wide">
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                Live Matches
              </div>
              <div className="overflow-x-auto whitespace-nowrap py-4 px-3">
                <div className="inline-flex gap-3">
                  {liveMatches.map(match => (
                    <div 
                      key={match.id} 
                      className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-[14px] shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-all"
                      onClick={() => onNavigate('matches')}
                    >
                      {match.isLive && (
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                      <span className="font-semibold text-sm">{match.teamA}</span>
                      <span className="font-bold text-base">{match.scoreA} - {match.scoreB}</span>
                      <span className="font-semibold text-sm">{match.teamB}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Row - Spacious Cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Calendar, value: quickStats.matchesPlanned.toString(), label: 'Matches', color: 'text-primary' },
              { icon: Ticket, value: quickStats.ticketsBought.toString(), label: 'Tickets', color: 'text-blue-600' },
              { icon: Globe, value: quickStats.countriesVisited.toString(), label: 'Countries', color: 'text-warm-amber' },
              { icon: Clock, value: `${quickStats.hoursToNextBorder}h`, label: 'To Border', color: 'text-primary' },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-4 rounded-[14px] text-center border border-border shadow-sm hover:shadow-md transition-shadow">
                <stat.icon className={`mx-auto ${stat.color}`} size={24} />
                <p className="font-bold mt-2 text-lg">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</p>
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
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="relative bg-gradient-to-br from-primary/8 via-white to-accent/5 p-7">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[12px] bg-primary/10 flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">Next Match</h2>
                    <p className="text-sm text-muted-foreground font-medium mt-0.5">Don't miss it!</p>
                  </div>
                </div>
                <Badge variant="accent" className="rounded-full px-3 py-1.5 text-xs font-semibold">Today</Badge>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between bg-white rounded-[16px] p-5 shadow-sm border border-border">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-right flex-1">
                      <div className="font-bold text-xl">{nextMatch.homeTeam}</div>
                    </div>
                    <div className="px-4 py-3 bg-muted rounded-full">
                      <span className="font-bold text-xs">VS</span>
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-xl">{nextMatch.awayTeam}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Jan 17, 2027</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{nextMatch.time} EAT</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-muted-foreground font-medium">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{nextMatch.venue}, {nextMatch.city}</span>
                </div>

                <Button 
                  className="w-full h-12 font-semibold transition-all" 
                  size="lg" 
                  onClick={() => onNavigate('matchday')}
                >
                  View Match Details
                </Button>
              </div>
            </div>
          </Card>

          {/* Border Status - Modern Style */}
          <Card className="overflow-hidden border-0 shadow-md">
            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[12px] bg-blue-600/10 flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Next Border</h3>
                    <p className="text-sm text-muted-foreground font-medium mt-0.5">Real-time status</p>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  className={`rounded-full ${
                    borderStatus.status === 'light' ? 'border-primary text-primary bg-primary/10' :
                    borderStatus.status === 'moderate' ? 'border-warm-amber text-warm-amber bg-warm-amber/10' :
                    'border-red-600 text-red-600 bg-red-50'
                  }`}
                >
                  {borderStatus.waitTime} wait
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="font-bold text-lg">{borderStatus.name}</div>
                <div className="text-sm text-muted-foreground font-medium">
                  Crossing to {borderStatus.nextCountry}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        borderStatus.status === 'light' ? 'bg-primary' :
                        borderStatus.status === 'moderate' ? 'bg-warm-amber' :
                        'bg-red-600'
                      }`}
                      style={{ width: '60%' }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold">Moderate</span>
                </div>
              </div>
            </div>
          </Card>

          {/* FAN ID Widget Card - Premium Standout */}
          <div className="relative">
            {/* Gradient border accent */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary via-warm-amber to-blue-600 rounded-[20px] opacity-30 blur-lg" />
            <Card className="relative overflow-hidden border border-warm-amber/30 bg-gradient-to-br from-white to-warm-cream/20 shadow-xl">
              {/* Diagonal accent */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-warm-amber/40 to-transparent rounded-bl-3xl" />
              
              <div className="p-7 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-[14px] bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                      <IdCard className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xl">FAN ID</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold uppercase tracking-wide">Required</span>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium mt-1">
                        {fanIdData ? 'Your Stadium Access Pass' : 'Mandatory for AFCON 2027'}
                      </p>
                    </div>
                  </div>
                  {fanIdData && (
                    <Badge 
                      className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${
                        fanIdData.status === 'approved' ? 'bg-primary text-white' :
                        fanIdData.status === 'pending' ? 'bg-warm-amber text-black' :
                        'bg-red-600 text-white'
                      }`}
                    >
                      {fanIdData.status === 'approved' && <CheckCircle className="w-4 h-4 mr-1.5" />}
                      {fanIdData.status === 'pending' && <AlertCircle className="w-4 h-4 mr-1.5" />}
                      {fanIdData.status === 'rejected' && <XCircle className="w-4 h-4 mr-1.5" />}
                      {fanIdData.status === 'approved' ? 'Active' : fanIdData.status === 'pending' ? 'Pending' : 'Rejected'}
                    </Badge>
                  )}
                </div>
                
                {fanIdData ? (
                  <div className="space-y-4">
                    <div className="p-5 bg-gradient-to-br from-blue-600/10 via-white to-primary/10 rounded-[14px] border border-border">
                      <p className="text-xs text-muted-foreground mb-2 uppercase font-bold tracking-wider">FAN ID Number</p>
                      <p className="font-mono font-bold text-xl tracking-widest">{fanIdData.fanIdNumber}</p>
                    </div>
                    <Button
                      variant="default"
                      className="w-full h-12 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 text-white font-bold text-base shadow-md"
                      onClick={() => onNavigate('fanid')}
                    >
                      <IdCard className="w-5 h-5 mr-2" />
                      View Full FAN ID
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-5 bg-warm-amber/20 rounded-[14px] border border-warm-amber/30">
                      <AlertCircle className="w-6 h-6 text-warm-amber mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-warm-amber/90 mb-1">
                          FAN ID is mandatory
                        </p>
                        <p className="text-xs text-warm-amber/75 font-medium">
                          Required for stadium entry, fan zones, and special discounts
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="accent"
                      className="w-full h-12 text-white font-bold text-base shadow-lg"
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

          {/* Smart Recommendations */}
          <Card className="p-6 border-0 bg-gradient-to-br from-primary/8 to-white shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-primary font-bold" />
              <h3 className="font-bold text-lg">Recommended for You</h3>
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