import React, { useContext, useState, useMemo } from 'react';
import { TanzaniaArrivalContext } from '../../../contexts/TanzaniaArrivalContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search, CheckCircle2 } from 'lucide-react';
import visaData from '../../../config/visaRequirements.json';

/**
 * Step 2: Country selector with search functionality
 */
export const ArrivalCountrySelector: React.FC = () => {
  const { t } = useLanguage();
  const context = useContext(TanzaniaArrivalContext);
  const [searchQuery, setSearchQuery] = useState('');

  if (!context) {
    throw new Error('ArrivalCountrySelector must be used within TanzaniaArrivalProvider');
  }

  const filteredCountries = useMemo(() => {
    return visaData.countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectCountry = (countryId: string) => {
    context.setArrivingCountry(countryId);
    context.setCurrentStep(3);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {t('arrivalFlow.countrySelector.title')}
        </h1>
        <p className="text-base text-slate-600">{t('arrivalFlow.countrySelector.subtitle')}</p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          type="text"
          placeholder={t('arrivalFlow.countrySelector.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 h-11"
          style={{ borderRadius: '12px' }}
        />
      </div>

      {/* Country List */}
      <div className="space-y-2 flex-1 overflow-y-auto">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <Card
              key={country.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                context.arrivingCountry === country.id
                  ? 'border-warm-amber bg-amber-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              style={{ borderRadius: '12px' }}
              onClick={() => handleSelectCountry(country.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{country.name}</p>
                    <p className="text-xs text-slate-500">{country.id}</p>
                  </div>
                </div>
                {context.arrivingCountry === country.id && (
                  <CheckCircle2 className="w-5 h-5 text-warm-amber" />
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500">{t('arrivalFlow.countrySelector.noResults')}</p>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <Button
        onClick={() =>
          context.arrivingCountry && (
            context.setCurrentStep(3),
            <div className="h-4"></div>
          )
        }
        disabled={!context.arrivingCountry}
        className="w-full h-12 rounded-[10px] mt-6"
        variant="accent"
      >
        {t('common.continue')}
      </Button>
    </div>
  );
};
