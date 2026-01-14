import React from 'react';
import { CountryFlag } from './CountryFlag';
import { MapPin, Navigation } from 'lucide-react';

export type Country = 'kenya' | 'tanzania' | 'uganda';

interface JourneyProgressProps {
  currentCountry: Country;
  visitedCountries: Country[];
  journeyPath: Country[];
  className?: string;
}

export function JourneyProgress({ currentCountry, visitedCountries, journeyPath, className = '' }: JourneyProgressProps) {
  const countryNames = {
    kenya: 'Kenya',
    tanzania: 'Tanzania',
    uganda: 'Uganda'
  };

  return (
    <div className={`bg-card rounded-xl p-4 border border-border ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Navigation className="w-4 h-4 text-primary" />
        <h3 className="font-medium">Your Journey</h3>
      </div>

      <div className="flex items-center justify-between">
        {journeyPath.map((country, index) => {
          const isVisited = visitedCountries.includes(country);
          const isCurrent = country === currentCountry;
          const isLast = index === journeyPath.length - 1;

          return (
            <div key={country} className="contents">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={`relative rounded-lg p-2 border-2 transition-all ${
                    isCurrent
                      ? 'border-primary bg-primary/10 scale-110'
                      : isVisited
                      ? 'border-green-500 bg-green-50'
                      : 'border-muted bg-muted/30'
                  }`}
                >
                  <CountryFlag country={country} size="md" />
                  {isCurrent && (
                    <MapPin className="absolute -top-2 -right-2 w-4 h-4 text-primary fill-primary" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isCurrent ? 'text-primary' : isVisited ? 'text-green-600' : 'text-muted-foreground'
                  }`}
                >
                  {countryNames[country]}
                </span>
              </div>

              {!isLast && (
                <div className="flex items-center justify-center px-2">
                  <div className={`h-0.5 w-8 ${isVisited ? 'bg-green-500' : 'bg-muted'}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-primary">
            {visitedCountries.length} of {journeyPath.length} countries
          </span>
        </div>
      </div>
    </div>
  );
}