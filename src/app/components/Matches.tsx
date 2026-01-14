import React, { useState } from 'react';
import { CountryFlag } from './CountryFlag';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Ticket,
  Users,
  Trophy,
  Filter,
  X
} from 'lucide-react';

interface MatchesProps {
  onBack: () => void;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeCountry: string;
  awayCountry: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  country: 'kenya' | 'tanzania' | 'uganda';
  stage: string;
  group?: string;
  status: 'upcoming' | 'live' | 'completed';
  score?: { home: number; away: number };
}

export function Matches({ onBack }: MatchesProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'calendar' | 'results'>('upcoming');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(2027, 5, 1)); // June 2027
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'all' | 'tanzania' | 'uganda' | 'kenya'>('all');
  const [selectedStage, setSelectedStage] = useState<'all' | 'group' | 'knockout'>('all');

  const countries = ['tanzania', 'uganda', 'kenya'] as const;
  const stages = ['group', 'knockout'] as const;

  // AFCON 2027 Tournament Schedule (June 17 - July 18, 2027)
  // Host Countries: Tanzania, Uganda, Kenya
  // 24 Qualified Teams across 6 Groups
  const matches: Match[] = [
    // ========== GROUP STAGE - MATCHDAY 1 (June 17-18) ==========
    // Group A (Tanzania, DR Congo, Comoros, Mozambique)
    {
      id: '1',
      homeTeam: 'Tanzania',
      awayTeam: 'Comoros',
      homeCountry: 'tanzania',
      awayCountry: 'comoros',
      date: '2027-06-17',
      time: '18:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group A',
      status: 'upcoming'
    },
    {
      id: '2',
      homeTeam: 'DR Congo',
      awayTeam: 'Mozambique',
      homeCountry: 'drcongo',
      awayCountry: 'mozambique',
      date: '2027-06-17',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group A',
      status: 'upcoming'
    },
    // Group B (Nigeria, Egypt, Guinea-Bissau, Sudan)
    {
      id: '3',
      homeTeam: 'Nigeria',
      awayTeam: 'Guinea-Bissau',
      homeCountry: 'nigeria',
      awayCountry: 'guineabissau',
      date: '2027-06-17',
      time: '15:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group B',
      status: 'upcoming'
    },
    {
      id: '4',
      homeTeam: 'Egypt',
      awayTeam: 'Sudan',
      homeCountry: 'egypt',
      awayCountry: 'sudan',
      date: '2027-06-18',
      time: '18:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group B',
      status: 'upcoming'
    },
    // Group C (Morocco, Senegal, Zambia, Cape Verde)
    {
      id: '5',
      homeTeam: 'Morocco',
      awayTeam: 'Cape Verde',
      homeCountry: 'morocco',
      awayCountry: 'capeverde',
      date: '2027-06-18',
      time: '15:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group C',
      status: 'upcoming'
    },
    {
      id: '6',
      homeTeam: 'Senegal',
      awayTeam: 'Zambia',
      homeCountry: 'senegal',
      awayCountry: 'zambia',
      date: '2027-06-18',
      time: '21:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group C',
      status: 'upcoming'
    },
    // Group D (Ivory Coast, Algeria, Mali, Burkina Faso)
    {
      id: '7',
      homeTeam: 'Ivory Coast',
      awayTeam: 'Burkina Faso',
      homeCountry: 'ivorycoast',
      awayCountry: 'burkinafaso',
      date: '2027-06-19',
      time: '18:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group D',
      status: 'upcoming'
    },
    {
      id: '8',
      homeTeam: 'Algeria',
      awayTeam: 'Mali',
      homeCountry: 'algeria',
      awayCountry: 'mali',
      date: '2027-06-19',
      time: '21:00',
      stadium: 'Uhuru Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group D',
      status: 'upcoming'
    },
    // Group E (Ghana, Cameroon, Benin, Mauritania)
    {
      id: '9',
      homeTeam: 'Ghana',
      awayTeam: 'Mauritania',
      homeCountry: 'ghana',
      awayCountry: 'mauritania',
      date: '2027-06-19',
      time: '15:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group E',
      status: 'upcoming'
    },
    {
      id: '10',
      homeTeam: 'Cameroon',
      awayTeam: 'Benin',
      homeCountry: 'cameroon',
      awayCountry: 'benin',
      date: '2027-06-20',
      time: '18:00',
      stadium: 'Nyayo Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group E',
      status: 'upcoming'
    },
    // Group F (Tunisia, South Africa, Angola, Guinea)
    {
      id: '11',
      homeTeam: 'Tunisia',
      awayTeam: 'Guinea',
      homeCountry: 'tunisia',
      awayCountry: 'guinea',
      date: '2027-06-20',
      time: '15:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group F',
      status: 'upcoming'
    },
    {
      id: '12',
      homeTeam: 'South Africa',
      awayTeam: 'Angola',
      homeCountry: 'southafrica',
      awayCountry: 'angola',
      date: '2027-06-20',
      time: '21:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group F',
      status: 'upcoming'
    },

    // ========== GROUP STAGE - MATCHDAY 2 (June 21-24) ==========
    // Group A
    {
      id: '13',
      homeTeam: 'Tanzania',
      awayTeam: 'DR Congo',
      homeCountry: 'tanzania',
      awayCountry: 'drcongo',
      date: '2027-06-21',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group A',
      status: 'upcoming'
    },
    {
      id: '14',
      homeTeam: 'Comoros',
      awayTeam: 'Mozambique',
      homeCountry: 'comoros',
      awayCountry: 'mozambique',
      date: '2027-06-21',
      time: '18:00',
      stadium: 'Uhuru Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group A',
      status: 'upcoming'
    },
    // Group B
    {
      id: '15',
      homeTeam: 'Nigeria',
      awayTeam: 'Egypt',
      homeCountry: 'nigeria',
      awayCountry: 'egypt',
      date: '2027-06-22',
      time: '21:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group B',
      status: 'upcoming'
    },
    {
      id: '16',
      homeTeam: 'Guinea-Bissau',
      awayTeam: 'Sudan',
      homeCountry: 'guineabissau',
      awayCountry: 'sudan',
      date: '2027-06-22',
      time: '18:00',
      stadium: 'Nyayo Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group B',
      status: 'upcoming'
    },
    // Group C
    {
      id: '17',
      homeTeam: 'Morocco',
      awayTeam: 'Senegal',
      homeCountry: 'morocco',
      awayCountry: 'senegal',
      date: '2027-06-22',
      time: '15:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group C',
      status: 'upcoming'
    },
    {
      id: '18',
      homeTeam: 'Cape Verde',
      awayTeam: 'Zambia',
      homeCountry: 'capeverde',
      awayCountry: 'zambia',
      date: '2027-06-23',
      time: '18:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group C',
      status: 'upcoming'
    },
    // Group D
    {
      id: '19',
      homeTeam: 'Ivory Coast',
      awayTeam: 'Algeria',
      homeCountry: 'ivorycoast',
      awayCountry: 'algeria',
      date: '2027-06-23',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group D',
      status: 'upcoming'
    },
    {
      id: '20',
      homeTeam: 'Burkina Faso',
      awayTeam: 'Mali',
      homeCountry: 'burkinafaso',
      awayCountry: 'mali',
      date: '2027-06-23',
      time: '15:00',
      stadium: 'Uhuru Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group D',
      status: 'upcoming'
    },
    // Group E
    {
      id: '21',
      homeTeam: 'Ghana',
      awayTeam: 'Cameroon',
      homeCountry: 'ghana',
      awayCountry: 'cameroon',
      date: '2027-06-24',
      time: '21:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group E',
      status: 'upcoming'
    },
    {
      id: '22',
      homeTeam: 'Mauritania',
      awayTeam: 'Benin',
      homeCountry: 'mauritania',
      awayCountry: 'benin',
      date: '2027-06-24',
      time: '18:00',
      stadium: 'Nyayo Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group E',
      status: 'upcoming'
    },
    // Group F
    {
      id: '23',
      homeTeam: 'Tunisia',
      awayTeam: 'South Africa',
      homeCountry: 'tunisia',
      awayCountry: 'southafrica',
      date: '2027-06-24',
      time: '15:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group F',
      status: 'upcoming'
    },
    {
      id: '24',
      homeTeam: 'Guinea',
      awayTeam: 'Angola',
      homeCountry: 'guinea',
      awayCountry: 'angola',
      date: '2027-06-25',
      time: '18:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group F',
      status: 'upcoming'
    },

    // ========== GROUP STAGE - MATCHDAY 3 (June 25-28) ==========
    // Group A
    {
      id: '25',
      homeTeam: 'Tanzania',
      awayTeam: 'Mozambique',
      homeCountry: 'tanzania',
      awayCountry: 'mozambique',
      date: '2027-06-25',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group A',
      status: 'upcoming'
    },
    {
      id: '26',
      homeTeam: 'DR Congo',
      awayTeam: 'Comoros',
      homeCountry: 'drcongo',
      awayCountry: 'comoros',
      date: '2027-06-25',
      time: '21:00',
      stadium: 'Uhuru Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group A',
      status: 'upcoming'
    },
    // Group B
    {
      id: '27',
      homeTeam: 'Nigeria',
      awayTeam: 'Sudan',
      homeCountry: 'nigeria',
      awayCountry: 'sudan',
      date: '2027-06-26',
      time: '21:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group B',
      status: 'upcoming'
    },
    {
      id: '28',
      homeTeam: 'Egypt',
      awayTeam: 'Guinea-Bissau',
      homeCountry: 'egypt',
      awayCountry: 'guineabissau',
      date: '2027-06-26',
      time: '21:00',
      stadium: 'Nyayo Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group B',
      status: 'upcoming'
    },
    // Group C
    {
      id: '29',
      homeTeam: 'Morocco',
      awayTeam: 'Zambia',
      homeCountry: 'morocco',
      awayCountry: 'zambia',
      date: '2027-06-26',
      time: '18:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group C',
      status: 'upcoming'
    },
    {
      id: '30',
      homeTeam: 'Senegal',
      awayTeam: 'Cape Verde',
      homeCountry: 'senegal',
      awayCountry: 'capeverde',
      date: '2027-06-26',
      time: '18:00',
      stadium: 'Namboole Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group C',
      status: 'upcoming'
    },
    // Group D
    {
      id: '31',
      homeTeam: 'Ivory Coast',
      awayTeam: 'Mali',
      homeCountry: 'ivorycoast',
      awayCountry: 'mali',
      date: '2027-06-27',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group D',
      status: 'upcoming'
    },
    {
      id: '32',
      homeTeam: 'Algeria',
      awayTeam: 'Burkina Faso',
      homeCountry: 'algeria',
      awayCountry: 'burkinafaso',
      date: '2027-06-27',
      time: '21:00',
      stadium: 'Uhuru Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Group Stage',
      group: 'Group D',
      status: 'upcoming'
    },
    // Group E
    {
      id: '33',
      homeTeam: 'Ghana',
      awayTeam: 'Benin',
      homeCountry: 'ghana',
      awayCountry: 'benin',
      date: '2027-06-28',
      time: '21:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group E',
      status: 'upcoming'
    },
    {
      id: '34',
      homeTeam: 'Cameroon',
      awayTeam: 'Mauritania',
      homeCountry: 'cameroon',
      awayCountry: 'mauritania',
      date: '2027-06-28',
      time: '21:00',
      stadium: 'Nyayo Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Group Stage',
      group: 'Group E',
      status: 'upcoming'
    },
    // Group F
    {
      id: '35',
      homeTeam: 'Tunisia',
      awayTeam: 'Angola',
      homeCountry: 'tunisia',
      awayCountry: 'angola',
      date: '2027-06-28',
      time: '18:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group F',
      status: 'upcoming'
    },
    {
      id: '36',
      homeTeam: 'South Africa',
      awayTeam: 'Guinea',
      homeCountry: 'southafrica',
      awayCountry: 'guinea',
      date: '2027-06-28',
      time: '18:00',
      stadium: 'Namboole Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Group Stage',
      group: 'Group F',
      status: 'upcoming'
    },

    // ========== ROUND OF 16 (July 1-4) ==========
    {
      id: '37',
      homeTeam: 'Tanzania',
      awayTeam: 'Guinea-Bissau',
      homeCountry: 'tanzania',
      awayCountry: 'guineabissau',
      date: '2027-07-01',
      time: '18:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Knockout',
      group: 'Round of 16',
      status: 'upcoming'
    },
    {
      id: '38',
      homeTeam: 'Nigeria',
      awayTeam: 'Zambia',
      homeCountry: 'nigeria',
      awayCountry: 'zambia',
      date: '2027-07-01',
      time: '21:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Knockout',
      group: 'Round of 16',
      status: 'upcoming'
    },
    {
      id: '39',
      homeTeam: 'Morocco',
      awayTeam: 'Cameroon',
      homeCountry: 'morocco',
      awayCountry: 'cameroon',
      date: '2027-07-02',
      time: '18:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Knockout',
      group: 'Round of 16',
      status: 'upcoming'
    },
    {
      id: '40',
      homeTeam: 'Egypt',
      awayTeam: 'South Africa',
      homeCountry: 'egypt',
      awayCountry: 'southafrica',
      date: '2027-07-02',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Knockout',
      group: 'Round of 16',
      status: 'upcoming'
    },
    {
      id: '41',
      homeTeam: 'Ivory Coast',
      awayTeam: 'Tunisia',
      homeCountry: 'ivorycoast',
      awayCountry: 'tunisia',
      date: '2027-07-03',
      time: '18:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Knockout',
      group: 'Round of 16',
      status: 'upcoming'
    },
    {
      id: '42',
      homeTeam: 'Senegal',
      awayTeam: 'Ghana',
      homeCountry: 'senegal',
      awayCountry: 'ghana',
      date: '2027-07-03',
      time: '21:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Knockout',
      group: 'Round of 16',
      status: 'upcoming'
    },
    {
      id: '43',
      homeTeam: 'Algeria',
      awayTeam: 'DR Congo',
      homeCountry: 'algeria',
      awayCountry: 'drcongo',
      date: '2027-07-04',
      time: '18:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Knockout',
      group: 'Round of 16',
      status: 'upcoming'
    },
    {
      id: '44',
      homeTeam: 'Mali',
      awayTeam: 'Angola',
      homeCountry: 'mali',
      awayCountry: 'angola',
      date: '2027-07-04',
      time: '21:00',
      stadium: 'Nyayo Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Knockout',
      group: 'Round of 16',
      status: 'upcoming'
    },

    // ========== QUARTER-FINALS (July 7-8) ==========
    {
      id: '45',
      homeTeam: 'Tanzania',
      awayTeam: 'Nigeria',
      homeCountry: 'tanzania',
      awayCountry: 'nigeria',
      date: '2027-07-07',
      time: '18:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Knockout',
      group: 'Quarter-Final',
      status: 'upcoming'
    },
    {
      id: '46',
      homeTeam: 'Morocco',
      awayTeam: 'Egypt',
      homeCountry: 'morocco',
      awayCountry: 'egypt',
      date: '2027-07-07',
      time: '21:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Knockout',
      group: 'Quarter-Final',
      status: 'upcoming'
    },
    {
      id: '47',
      homeTeam: 'Ivory Coast',
      awayTeam: 'Senegal',
      homeCountry: 'ivorycoast',
      awayCountry: 'senegal',
      date: '2027-07-08',
      time: '18:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Knockout',
      group: 'Quarter-Final',
      status: 'upcoming'
    },
    {
      id: '48',
      homeTeam: 'Algeria',
      awayTeam: 'Mali',
      homeCountry: 'algeria',
      awayCountry: 'mali',
      date: '2027-07-08',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Knockout',
      group: 'Quarter-Final',
      status: 'upcoming'
    },

    // ========== SEMI-FINALS (July 11-12) ==========
    {
      id: '49',
      homeTeam: 'Tanzania',
      awayTeam: 'Morocco',
      homeCountry: 'tanzania',
      awayCountry: 'morocco',
      date: '2027-07-11',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Knockout',
      group: 'Semi-Final',
      status: 'upcoming'
    },
    {
      id: '50',
      homeTeam: 'Ivory Coast',
      awayTeam: 'Algeria',
      homeCountry: 'ivorycoast',
      awayCountry: 'algeria',
      date: '2027-07-12',
      time: '21:00',
      stadium: 'Kasarani Stadium',
      city: 'Nairobi',
      country: 'kenya',
      stage: 'Knockout',
      group: 'Semi-Final',
      status: 'upcoming'
    },

    // ========== 3RD PLACE PLAYOFF (July 17) ==========
    {
      id: '51',
      homeTeam: 'Morocco',
      awayTeam: 'Algeria',
      homeCountry: 'morocco',
      awayCountry: 'algeria',
      date: '2027-07-17',
      time: '18:00',
      stadium: 'Mandela National Stadium',
      city: 'Kampala',
      country: 'uganda',
      stage: 'Knockout',
      group: '3rd Place',
      status: 'upcoming'
    },

    // ========== FINAL (July 18) ==========
    {
      id: '52',
      homeTeam: 'Tanzania',
      awayTeam: 'Ivory Coast',
      homeCountry: 'tanzania',
      awayCountry: 'ivorycoast',
      date: '2027-07-18',
      time: '21:00',
      stadium: 'Benjamin Mkapa Stadium',
      city: 'Dar es Salaam',
      country: 'tanzania',
      stage: 'Knockout',
      group: 'Final',
      status: 'upcoming'
    }
  ];

  // Get matches for selected date
  const getMatchesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return matches.filter(match => match.date === dateStr);
  };

  // Get all match dates in the month
  const getMatchDatesInMonth = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    return matches
      .map(m => new Date(m.date))
      .filter(d => d.getFullYear() === year && d.getMonth() === month)
      .map(d => d.getDate());
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const matchDates = getMatchDatesInMonth();
  const calendarDays = generateCalendarDays();

  const nextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };

  const selectDate = (day: number) => {
    const newDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
    if (selectedDate?.toDateString() === newDate.toDateString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(newDate);
    }
  };

  // Filter matches based on selected filters
  const filterMatches = (matchList: Match[]) => {
    return matchList.filter(match => {
      const countryMatch = selectedCountry === 'all' || match.country === selectedCountry;
      const stageMatch = selectedStage === 'all' || 
        (selectedStage === 'group' && match.stage.includes('Group')) ||
        (selectedStage === 'knockout' && !match.stage.includes('Group'));
      
      // If a date is selected in calendar view, filter by that date too
      if (selectedDate && activeTab === 'calendar') {
        const dateStr = selectedDate.toISOString().split('T')[0];
        if (match.date !== dateStr) return false;
      }
      
      return countryMatch && stageMatch;
    });
  };

  const filteredMatches = filterMatches(matches);
  const activeFiltersCount = [
    selectedCountry !== 'all' ? selectedCountry : null,
    selectedStage !== 'all' ? selectedStage : null
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCountry('all');
    setSelectedStage('all');
    setSelectedDate(null);
  };

  const getCountryBadgeColor = (country: string) => {
    switch (country) {
      case 'kenya':
        return 'bg-black text-white';
      case 'tanzania':
        return 'bg-green-600 text-white';
      case 'uganda':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getMatchCountOnDay = (day: number) => {
    const dateStr = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return matches.filter(m => m.date === dateStr).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header - Sticky */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900">Matches</h1>
              <p className="text-sm text-gray-500">AFCON 2027 Schedule</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'results', label: 'Results' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                if (tab.id !== 'calendar') setSelectedDate(null);
              }}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-[#1EB53A]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1EB53A]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={`shrink-0 ${activeFiltersCount > 0 ? 'border-[#1EB53A] text-[#1EB53A]' : ''}`}
          >
            <Filter size={16} className="mr-1" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 w-5 h-5 bg-[#1EB53A] text-white rounded-full text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {/* Quick Country Filters - Horizontal Scroll */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {countries.map((country) => (
                <Button
                  key={country}
                  variant={selectedCountry === country ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCountry(selectedCountry === country ? 'all' : country)}
                  className={`whitespace-nowrap shrink-0 ${
                    selectedCountry === country ? getCountryBadgeColor(country) : ''
                  }`}
                >
                  <CountryFlag country={country} size="sm" />
                  <span className="ml-1.5 capitalize">{country}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Stage</span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#1EB53A] hover:text-[#1EB53A]/80 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex gap-2">
              {stages.map((stage) => (
                <Button
                  key={stage}
                  variant={selectedStage === stage ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStage(selectedStage === stage ? 'all' : stage)}
                  className={selectedStage === stage ? 'bg-[#1EB53A] hover:bg-[#1EB53A]/90' : ''}
                >
                  {stage === 'group' ? 'Group Stage' : 'Knockout'}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Calendar View */}
        {activeTab === 'calendar' && (
          <Card className="mb-4 overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Previous month"
                aria-label="Previous month"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="font-semibold">
                {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Next month"
                aria-label="Next month"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const hasMatch = matchDates.includes(day);
                  const isSelected = selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === calendarMonth.getMonth() &&
                    selectedDate?.getFullYear() === calendarMonth.getFullYear();
                  const matchCount = getMatchCountOnDay(day);

                  return (
                    <button
                      key={day}
                      onClick={() => hasMatch && selectDate(day)}
                      disabled={!hasMatch}
                      className={`aspect-square rounded-full flex flex-col items-center justify-center text-sm transition-colors relative ${
                        isSelected
                          ? 'bg-[#1EB53A] text-white'
                          : hasMatch
                          ? 'bg-[#1EB53A]/10 text-[#1EB53A] hover:bg-[#1EB53A]/20 font-medium'
                          : 'text-gray-400'
                      }`}
                    >
                      {day}
                      {hasMatch && !isSelected && (
                        <div className="absolute bottom-1 flex gap-0.5">
                          {Array.from({ length: Math.min(matchCount, 3) }).map((_, idx) => (
                            <div
                              key={idx}
                              className="w-1 h-1 rounded-full bg-[#1EB53A]"
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
              <div className="px-4 pb-4 pt-2 border-t bg-[#1EB53A]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#1EB53A] font-medium">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-[#1EB53A]/80">
                      {filteredMatches.length} match{filteredMatches.length !== 1 ? 'es' : ''} scheduled
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedDate(null)}
                    className="p-1 hover:bg-[#1EB53A]/20 rounded-full"
                    title="Clear date selection"
                    aria-label="Clear date selection"
                  >
                    <X size={16} className="text-[#1EB53A]" />
                  </button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Results Tab Empty State */}
        {activeTab === 'results' && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy size={32} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No Results Yet</h3>
            <p className="text-sm text-gray-500">
              The tournament hasn't started yet. Check back in January 2027!
            </p>
          </Card>
        )}

        {/* Match List */}
        {(activeTab === 'upcoming' || (activeTab === 'calendar' && selectedDate)) && (
          <div className="space-y-4">
            {filteredMatches.length > 0 ? (
              filteredMatches
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
            ) : (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon size={32} className="text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">No Matches Found</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Try adjusting your filters to see more matches.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Show hint when calendar is open but no date selected */}
        {activeTab === 'calendar' && !selectedDate && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">
              Tap a highlighted date to see matches
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Mobile-optimized Match Card Component
function MatchCard({ match }: { match: Match }) {
  const getCountryBadgeColor = (country: string) => {
    switch (country) {
      case 'kenya':
        return 'bg-black text-white';
      case 'tanzania':
        return 'bg-green-600 text-white';
      case 'uganda':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="overflow-hidden">
      {/* Match Header - Stage & Host Country */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-medium">
            {match.group || match.stage}
          </Badge>
          <Badge className={`text-xs ${getCountryBadgeColor(match.country)}`}>
            <span className="capitalize">{match.country}</span>
          </Badge>
        </div>
        {match.status === 'live' && (
          <Badge className="bg-red-500 text-white animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full mr-1.5 inline-block" />
            LIVE
          </Badge>
        )}
      </div>

      {/* Teams Section - Face to Face Layout */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              <CountryFlag country={match.homeCountry} size="lg" />
            </div>
            <span className="font-semibold text-base">{match.homeTeam}</span>
          </div>

          {/* VS / Score */}
          <div className="px-4 shrink-0">
            {match.status === 'completed' && match.score ? (
              <div className="text-center">
                <span className="text-2xl font-bold">{match.score.home} - {match.score.away}</span>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-lg font-semibold text-gray-400">VS</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="font-semibold text-base text-right">{match.awayTeam}</span>
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              <CountryFlag country={match.awayCountry} size="lg" />
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={14} className="text-[#1EB53A]" />
              <span>{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#1EB53A]" />
              <span className="font-medium">{match.time} EAT</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-600">
            <MapPin size={14} className="text-[#1EB53A] shrink-0" />
            <span className="truncate">{match.stadium}, {match.city}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Button size="sm" className="flex-1 bg-[#1EB53A] hover:bg-[#1EB53A]/90 h-10">
            <Ticket size={16} className="mr-1.5" />
            Get Tickets
          </Button>
          <Button size="sm" variant="outline" className="flex-1 h-10 border-[#00A3DD] text-[#00A3DD] hover:bg-[#00A3DD]/10">
            <Users size={16} className="mr-1.5" />
            Find Fans
          </Button>
        </div>
      </div>
    </Card>
  );
}