import React from 'react';

export type Currency = 'KES' | 'TZS' | 'UGX' | 'USD';

interface CurrencyDisplayProps {
  amount: number;
  currency: Currency;
  showSymbol?: boolean;
  className?: string;
}

const currencyInfo: Record<Currency, { symbol: string; name: string; locale: string; country?: 'kenya' | 'tanzania' | 'uganda' }> = {
  KES: { symbol: 'KSh', name: 'Kenyan Shilling', locale: 'en-KE', country: 'kenya' },
  TZS: { symbol: 'TSh', name: 'Tanzanian Shilling', locale: 'en-TZ', country: 'tanzania' },
  UGX: { symbol: 'USh', name: 'Ugandan Shilling', locale: 'en-UG', country: 'uganda' },
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' }
};

export function CurrencyDisplay({ amount, currency, showSymbol = true, className = '' }: CurrencyDisplayProps) {
  const info = currencyInfo[currency];
  
  const formattedAmount = new Intl.NumberFormat(info.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);

  return (
    <span className={className}>
      {showSymbol && <span className="font-medium">{info.symbol} </span>}
      {formattedAmount}
    </span>
  );
}

interface MultiCurrencyDisplayProps {
  amounts: { currency: Currency; amount: number }[];
  className?: string;
}

export function MultiCurrencyDisplay({ amounts, className = '' }: MultiCurrencyDisplayProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {amounts.map(({ currency, amount }) => (
        <div key={currency} className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{currency}</span>
          <CurrencyDisplay amount={amount} currency={currency} className="font-medium" />
        </div>
      ))}
    </div>
  );
}

export { currencyInfo };
