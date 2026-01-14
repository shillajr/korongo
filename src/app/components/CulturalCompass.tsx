import React, { useState } from 'react';
import { CountryFlag } from './CountryFlag';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  ThumbsUp,
  MapPin,
  Star,
  Info,
  Heart,
  Coffee,
  Music,
  Shirt,
  CheckCircle2
} from 'lucide-react';
import type { Country } from './JourneyProgress';

interface CulturalCompassProps {
  onBack: () => void;
  currentCountry: Country;
}

export function CulturalCompass({ onBack, currentCountry }: CulturalCompassProps) {
  const [activeTab, setActiveTab] = useState('phrases');
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

  const swahiliPhrases = {
    greetings: [
      { english: 'Hello', swahili: 'Jambo', pronunciation: 'JAM-bo', variant: 'Universal' },
      { english: 'How are you?', swahili: 'Habari?', pronunciation: 'ha-BAR-ee', variant: 'Universal' },
      { english: 'Good morning', swahili: 'Habari ya asubuhi', pronunciation: 'ha-BAR-ee ya a-su-BOO-hee', variant: 'Universal' },
      { english: 'Good evening', swahili: 'Habari ya jioni', pronunciation: 'ha-BAR-ee ya jee-OH-nee', variant: 'Universal' }
    ],
    basics: [
      { english: 'Thank you', swahili: 'Asante', pronunciation: 'a-SAN-teh', variant: 'Universal' },
      { english: 'Please', swahili: 'Tafadhali', pronunciation: 'ta-fa-DHA-lee', variant: 'Universal' },
      { english: 'Yes', swahili: 'Ndiyo', pronunciation: 'n-DEE-yo', variant: 'Universal' },
      { english: 'No', swahili: 'Hapana', pronunciation: 'ha-PA-na', variant: 'Universal' },
      { english: 'Excuse me', swahili: 'Samahani', pronunciation: 'sa-ma-HA-nee', variant: 'Universal' }
    ],
    travel: [
      { english: 'How much?', swahili: 'Bei gani?', pronunciation: 'bay GA-nee', variant: 'Universal' },
      { english: 'Where is...?', swahili: 'Iko wapi...?', pronunciation: 'ee-KO WA-pee', variant: 'Universal' },
      { english: 'I need help', swahili: 'Nahitaji msaada', pronunciation: 'na-hee-TA-jee m-sa-A-da', variant: 'Universal' },
      { english: 'Water', swahili: 'Maji', pronunciation: 'MA-jee', variant: 'Universal' },
      { english: 'Food', swahili: 'Chakula', pronunciation: 'cha-KOO-la', variant: 'Universal' }
    ],
    football: [
      { english: 'Goal!', swahili: 'Goli!', pronunciation: 'GO-lee', variant: 'Universal' },
      { english: 'Good game', swahili: 'Mchezo mzuri', pronunciation: 'm-CHEH-zo m-ZOO-ree', variant: 'Universal' },
      { english: 'Come on!', swahili: 'Twende!', pronunciation: 'TWEN-deh', variant: 'Universal' },
      { english: 'Well played', swahili: 'Umecheza vizuri', pronunciation: 'oo-meh-CHEH-za vee-ZOO-ree', variant: 'Universal' }
    ]
  };

  const etiquette = [
    {
      title: 'Greetings',
      icon: '👋',
      tips: [
        'Always greet elders first with respect',
        'Handshakes are common; use right hand',
        'In Muslim areas, wait for women to extend hand first',
        'Take time for greetings - rushing is considered rude'
      ]
    },
    {
      title: 'Dining',
      icon: '🍽️',
      tips: [
        'Wash hands before and after meals',
        'In traditional settings, eat with right hand only',
        'Finish what\'s on your plate to show appreciation',
        'Wait for elders to start eating first'
      ]
    },
    {
      title: 'Dress Code',
      icon: '👔',
      tips: [
        'Dress modestly, especially in rural areas',
        'Cover shoulders and knees in religious sites',
        'Remove shoes when entering homes',
        'Beachwear only appropriate at the coast'
      ]
    },
    {
      title: 'Photography',
      icon: '📸',
      tips: [
        'Always ask permission before taking photos of people',
        'Some communities may request a small fee',
        'No photos in military or government areas',
        'Respect "no photography" signs at cultural sites'
      ]
    },
    {
      title: 'Bargaining',
      icon: '💰',
      tips: [
        'Haggling is expected in markets',
        'Start at 50-60% of asking price',
        'Always be polite and friendly',
        'Fixed prices in malls and supermarkets'
      ]
    },
    {
      title: 'Social Norms',
      icon: '🤝',
      tips: [
        'Public displays of affection are frowned upon',
        'Use both hands when giving or receiving items',
        'Pointing with index finger is rude; use full hand',
        '"Pole pole" (slowly slowly) - things take time here'
      ]
    }
  ];

  const experiences = [
    {
      id: 1,
      title: 'Traditional Coffee Ceremony',
      location: 'Near Benjamin Mkapa Stadium, Dar es Salaam',
      country: 'tanzania' as Country,
      price: 1200,
      rating: 4.8,
      upvotes: 156,
      description: 'Experience authentic Ethiopian-style coffee ceremony',
      verified: true,
      category: 'Food & Drink'
    },
    {
      id: 2,
      title: 'Maasai Village Visit',
      location: 'Ngorongoro, Tanzania',
      country: 'tanzania' as Country,
      price: 2500,
      rating: 4.9,
      upvotes: 243,
      description: 'Learn about Maasai culture, dance, and traditions',
      verified: true,
      category: 'Cultural'
    },
    {
      id: 3,
      title: 'Zanzibar Spice Tour',
      location: 'Stone Town, Zanzibar',
      country: 'tanzania' as Country,
      price: 45000,
      rating: 4.7,
      upvotes: 189,
      description: 'Explore spice plantations and taste local flavors',
      verified: true,
      category: 'Food & Drink'
    },
    {
      id: 4,
      title: 'Ugandan Drumming Class',
      location: 'Kampala Cultural Centre',
      country: 'uganda' as Country,
      price: 85000,
      rating: 4.6,
      upvotes: 134,
      description: 'Learn traditional Ugandan drumming and dance',
      verified: true,
      category: 'Music & Arts'
    }
  ];

  const handlePlayPhrase = (phrase: string) => {
    setPlayingPhrase(phrase);
    // In a real app, this would play audio
    setTimeout(() => setPlayingPhrase(null), 1000);
  };

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
                <h1 className="font-medium">Cultural Compass</h1>
                <p className="text-sm text-muted-foreground">
                  Connect with East African culture
                </p>
              </div>
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          </div>

          <TabsList className="w-full grid grid-cols-3 rounded-none h-auto">
            <TabsTrigger value="phrases" className="data-[state=active]:bg-background text-xs">
              Phrases
            </TabsTrigger>
            <TabsTrigger value="etiquette" className="data-[state=active]:bg-background text-xs">
              Etiquette
            </TabsTrigger>
            <TabsTrigger value="experiences" className="data-[state=active]:bg-background text-xs">
              Experiences
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 space-y-4">
          <TabsContent value="phrases" className="mt-0 space-y-4">
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm">
                  <strong>Swahili Tips:</strong> Swahili is widely spoken across East Africa. 
                  Learning a few phrases shows respect and opens doors!
                </div>
              </div>
            </Card>

            {/* Greetings */}
            <div className="space-y-3">
              <h3 className="font-medium px-1">Greetings</h3>
              {swahiliPhrases.greetings.map((phrase, index) => (
                <PhraseCard
                  key={index}
                  phrase={phrase}
                  isPlaying={playingPhrase === phrase.swahili}
                  onPlay={() => handlePlayPhrase(phrase.swahili)}
                />
              ))}
            </div>

            {/* Basics */}
            <div className="space-y-3">
              <h3 className="font-medium px-1">Basic Phrases</h3>
              {swahiliPhrases.basics.map((phrase, index) => (
                <PhraseCard
                  key={index}
                  phrase={phrase}
                  isPlaying={playingPhrase === phrase.swahili}
                  onPlay={() => handlePlayPhrase(phrase.swahili)}
                />
              ))}
            </div>

            {/* Travel */}
            <div className="space-y-3">
              <h3 className="font-medium px-1">Travel Essentials</h3>
              {swahiliPhrases.travel.map((phrase, index) => (
                <PhraseCard
                  key={index}
                  phrase={phrase}
                  isPlaying={playingPhrase === phrase.swahili}
                  onPlay={() => handlePlayPhrase(phrase.swahili)}
                />
              ))}
            </div>

            {/* Football */}
            <div className="space-y-3">
              <h3 className="font-medium px-1">Football Cheers</h3>
              {swahiliPhrases.football.map((phrase, index) => (
                <PhraseCard
                  key={index}
                  phrase={phrase}
                  isPlaying={playingPhrase === phrase.swahili}
                  onPlay={() => handlePlayPhrase(phrase.swahili)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="etiquette" className="mt-0 space-y-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm text-blue-900">
                  <strong>Respectful Travel:</strong> Understanding local customs helps you 
                  connect authentically with communities and avoid misunderstandings.
                </div>
              </div>
            </Card>

            {etiquette.map((item, index) => (
              <EtiquetteCard key={index} item={item} />
            ))}

            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm text-green-900">
                  <strong>Remember:</strong> East Africans are known for their hospitality. 
                  A smile, patience, and respect go a long way!
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="experiences" className="mt-0 space-y-4">
            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm text-amber-900">
                  <strong>Verified Experiences:</strong> All listed experiences are from 
                  verified local guides and community-recommended.
                </div>
              </div>
            </Card>

            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}

            {/* Community Tips */}
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-primary" />
                Top Community Tips
              </h3>
              <div className="space-y-3">
                <CommunityTip
                  tip="Try ugali with nyama choma - it's a must-have Tanzanian experience!"
                  author="Sarah M."
                  upvotes={234}
                  location="Dar es Salaam"
                />
                <CommunityTip
                  tip="Sunset at Coco Beach in Dar es Salaam is unforgettable"
                  author="James K."
                  upvotes={198}
                  location="Dar es Salaam"
                />
                <CommunityTip
                  tip="Bargain at Owino Market but be respectful - start at 50%"
                  author="Ahmed R."
                  upvotes={167}
                  location="Kampala"
                />
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function PhraseCard({
  phrase,
  isPlaying,
  onPlay
}: {
  phrase: {
    english: string;
    swahili: string;
    pronunciation: string;
    variant: string;
  };
  isPlaying: boolean;
  onPlay: () => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onPlay}
          className={isPlaying ? 'bg-primary text-white' : ''}
        >
          <Volume2 className="w-4 h-4" />
        </Button>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <div>
              <div className="font-medium">{phrase.swahili}</div>
              <div className="text-sm text-muted-foreground">{phrase.english}</div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {phrase.variant}
            </Badge>
          </div>
          <div className="text-xs text-primary mt-2">
            Pronunciation: {phrase.pronunciation}
          </div>
        </div>
      </div>
    </Card>
  );
}

function EtiquetteCard({
  item
}: {
  item: {
    title: string;
    icon: string;
    tips: string[];
  };
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{item.icon}</div>
        <h3 className="font-medium">{item.title}</h3>
      </div>
      <ul className="space-y-2">
        {item.tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ExperienceCard({
  experience
}: {
  experience: {
    title: string;
    location: string;
    country: Country;
    price: number;
    rating: number;
    upvotes: number;
    description: string;
    verified: boolean;
    category: string;
  };
}) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Drink':
        return <Coffee className="w-4 h-4" />;
      case 'Music & Arts':
        return <Music className="w-4 h-4" />;
      case 'Cultural':
        return <Shirt className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{experience.title}</h3>
              {experience.verified && (
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{experience.location}</span>
            </div>
          </div>
          <CountryFlag country={experience.country} size="sm" />
        </div>

        <p className="text-sm text-muted-foreground">{experience.description}</p>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-medium">{experience.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-blue-600" />
            <span>{experience.upvotes}</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {getCategoryIcon(experience.category)}
            <span className="ml-1">{experience.category}</span>
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="font-medium text-primary">
            TSh {experience.price.toLocaleString()}
          </div>
          <Button variant="outline" size="sm">
            Book Experience
          </Button>
        </div>
      </div>
    </Card>
  );
}

function CommunityTip({
  tip,
  author,
  upvotes,
  location
}: {
  tip: string;
  author: string;
  upvotes: number;
  location: string;
}) {
  return (
    <div className="p-3 bg-muted/50 rounded-lg">
      <p className="text-sm mb-2">{tip}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>{author}</span>
          <span>•</span>
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1 text-blue-600">
          <ThumbsUp className="w-3 h-3" />
          <span>{upvotes}</span>
        </div>
      </div>
    </div>
  );
}