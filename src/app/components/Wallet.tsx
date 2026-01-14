import React, { useState } from 'react';
import { CountryFlag } from './CountryFlag';
import { CurrencyDisplay, Currency, currencyInfo } from './CurrencyDisplay';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import {
  ArrowLeft,
  Wallet as WalletIcon,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Plus,
  Download,
  Smartphone,
  CreditCard,
  Building2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface WalletProps {
  onBack: () => void;
}

interface Balance {
  currency: Currency;
  amount: number;
}

interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  currency: Currency;
  description: string;
  date: string;
  category: string;
}

export function Wallet({ onBack }: WalletProps) {
  const [activeTab, setActiveTab] = useState('balances');
  const [showConverter, setShowConverter] = useState(false);
  const [fromCurrency, setFromCurrency] = useState<Currency>('TZS');
  const [toCurrency, setToCurrency] = useState<Currency>('TZS');
  const [amount, setAmount] = useState('');
  
  // Base currency management
  const [baseCurrency] = useState<Currency>('USD'); // Base currency for wallet
  const [baseBalance, setBaseBalance] = useState(500); // Total balance in base currency
  const [preferredCurrency, setPreferredCurrency] = useState<Currency>('TZS'); // Preferred display currency
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');

  const balances: Balance[] = [
    { currency: 'TZS', amount: 125600 },
    { currency: 'KES', amount: 45280 },
    { currency: 'UGX', amount: 89400 },
    { currency: 'USD', amount: 250 }
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      amount: 32500,
      currency: 'TZS',
      description: 'Bus ticket to Uganda',
      date: '2027-01-15',
      category: 'Transport'
    },
    {
      id: '2',
      type: 'credit',
      amount: 130000,
      currency: 'TZS',
      description: 'Currency exchange',
      date: '2027-01-15',
      category: 'Exchange'
    },
    {
      id: '3',
      type: 'debit',
      amount: 22000,
      currency: 'TZS',
      description: 'Match ticket',
      date: '2027-01-14',
      category: 'Entertainment'
    },
    {
      id: '4',
      type: 'debit',
      amount: 45000,
      currency: 'TZS',
      description: 'Hotel in Dar es Salaam',
      date: '2027-01-13',
      category: 'Accommodation'
    },
    {
      id: '5',
      type: 'debit',
      amount: 18500,
      currency: 'UGX',
      description: 'Safari tour booking',
      date: '2027-01-12',
      category: 'Activities'
    }
  ];

  // Mock exchange rates (relative to USD)
  const exchangeRates: Record<Currency, number> = {
    KES: 130,
    TZS: 2450,
    UGX: 3700,
    USD: 1
  };

  const convertCurrency = (amount: number, from: Currency, to: Currency): number => {
    const inUSD = amount / exchangeRates[from];
    return inUSD * exchangeRates[to];
  };
  
  // Calculate converted balance based on preferred currency
  const convertedBalance = convertCurrency(baseBalance, baseCurrency, preferredCurrency);
  
  // Supported East African currencies for display (TZS first as default)\n  const supportedCurrencies: Currency[] = ['TZS', 'KES', 'UGX'];
  
  // Handle adding money
  const handleAddMoney = () => {
    if (addMoneyAmount && parseFloat(addMoneyAmount) > 0) {
      setBaseBalance(baseBalance + parseFloat(addMoneyAmount));
      setAddMoneyAmount('');
      setShowAddMoney(false);
    }
  };

  const totalInUSD = balances.reduce((total, balance) => {
    return total + balance.amount / exchangeRates[balance.currency];
  }, 0);

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
                <h1 className="font-medium">Multi-Currency Wallet</h1>
                <div className="flex items-center gap-2">
                  <CurrencyDisplay amount={convertedBalance} currency={preferredCurrency} className="text-sm font-medium" />
                  <span className="text-xs text-muted-foreground">
                    (<CurrencyDisplay amount={baseBalance} currency={baseCurrency} showSymbol={true} />)
                  </span>
                </div>
              </div>
              <select
                value={preferredCurrency}
                onChange={(e) => setPreferredCurrency(e.target.value as Currency)}
                className="px-2 py-1 text-sm border border-border rounded-lg bg-background font-medium"
              >
                {supportedCurrencies.map((curr) => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
          </div>

          <TabsList className="w-full grid grid-cols-3 rounded-none h-auto">
            <TabsTrigger value="balances" className="data-[state=active]:bg-background">
              Balances
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-background">
              History
            </TabsTrigger>
            <TabsTrigger value="methods" className="data-[state=active]:bg-background">
              Methods
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 space-y-4">
          {/* Add Money Modal */}
          {showAddMoney && (
            <Card className="p-5 border-primary bg-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Add Money to Wallet</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setShowAddMoney(false);
                    setAddMoneyAmount('');
                  }}
                >
                  Cancel
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    Amount in {baseCurrency}
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    className="text-2xl h-14 text-center font-bold"
                  />
                </div>

                {/* Live Conversion Preview */}
                {addMoneyAmount && parseFloat(addMoneyAmount) > 0 && (
                  <div className="bg-background rounded-lg p-4 space-y-3">
                    <p className="text-xs text-muted-foreground text-center mb-2">
                      You will receive:
                    </p>
                    {supportedCurrencies.map((curr) => {
                      const convertedAmount = convertCurrency(
                        parseFloat(addMoneyAmount),
                        baseCurrency,
                        curr
                      );
                      return (
                        <div 
                          key={curr}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <CountryFlag country={currencyInfo[curr].country!} size="sm" />
                            <span className="text-sm font-medium">{curr}</span>
                          </div>
                          <CurrencyDisplay
                            amount={convertedAmount}
                            currency={curr}
                            className="font-bold"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="space-y-2">
                  <Button 
                    className="w-full h-12"
                    onClick={handleAddMoney}
                    disabled={!addMoneyAmount || parseFloat(addMoneyAmount) <= 0}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add {addMoneyAmount || '0'} {baseCurrency}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Funds will be added to your base currency balance
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Currency Converter */}
          {showConverter && (
            <Card className="p-5 border-primary">
              <h3 className="font-medium mb-4">Quick Convert</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">From</label>
                  <div className="flex gap-2">
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value as Currency)}
                      className="px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="KES">KES</option>
                      <option value="TZS">TZS</option>
                      <option value="UGX">UGX</option>
                      <option value="USD">USD</option>
                    </select>
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const temp = fromCurrency;
                      setFromCurrency(toCurrency);
                      setToCurrency(temp);
                    }}
                  >
                    <ArrowUpDown className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">To</label>
                  <div className="flex gap-2">
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value as Currency)}
                      className="px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="KES">KES</option>
                      <option value="TZS">TZS</option>
                      <option value="UGX">UGX</option>
                      <option value="USD">USD</option>
                    </select>
                    <div className="flex-1 px-3 py-2 border border-border rounded-lg bg-muted">
                      {amount ? (
                        <CurrencyDisplay
                          amount={convertCurrency(parseFloat(amount), fromCurrency, toCurrency)}
                          currency={toCurrency}
                          showSymbol={false}
                        />
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-muted-foreground text-center">
                  Exchange rate: 1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
                </div>

                <Button className="w-full">
                  Convert {amount || '0'} {fromCurrency} to {toCurrency}
                </Button>
              </div>
            </Card>
          )}

          <TabsContent value="balances" className="mt-0 space-y-4">
            {/* Primary Balance Card - Base Currency with Conversion */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground">Wallet Balance</h3>
                  <Badge variant="secondary" className="text-xs">Base Currency</Badge>
                </div>
                <div className="mb-3">
                  <CurrencyDisplay
                    amount={baseBalance}
                    currency={baseCurrency}
                    className="text-4xl font-bold"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {currencyInfo[baseCurrency].name}
                  </p>
                </div>
              </div>

              {/* Converted Amount Display */}
              <div className="bg-background/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Displayed as</span>
                  <CountryFlag country={currencyInfo[preferredCurrency].country!} size="sm" />
                </div>
                <CurrencyDisplay
                  amount={convertedBalance}
                  currency={preferredCurrency}
                  className="text-2xl font-bold text-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {currencyInfo[preferredCurrency].name}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Rate: 1 {baseCurrency} = {exchangeRates[preferredCurrency].toFixed(2)} {preferredCurrency}
                </p>
              </div>

              {/* Currency Selector Pills */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Select display currency:</p>
                <div className="flex gap-2">
                  {supportedCurrencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setPreferredCurrency(curr)}
                      className={`flex-1 px-3 py-2 rounded-lg border transition-all ${
                        preferredCurrency === curr
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border hover:border-primary'
                      }`}
                    >
                      <div className="text-xs font-medium">{curr}</div>
                      <div className="text-[10px] opacity-80">
                        {currencyInfo[curr].symbol} {convertCurrency(baseBalance, baseCurrency, curr).toFixed(0)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex-col gap-2"
                onClick={() => setShowAddMoney(true)}
              >
                <Plus className="w-5 h-5" />
                <span>Add Money</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Download className="w-5 h-5" />
                <span>Withdraw</span>
              </Button>
            </div>

            {/* Exchange Rate Info */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm text-blue-900">
                  <strong>Smart Display:</strong> Your balance is stored in {baseCurrency} and automatically 
                  converted to your preferred East African currency. Switch anytime!
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="mt-0 space-y-3">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </TabsContent>

          <TabsContent value="methods" className="mt-0 space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium px-1">Mobile Money (Recommended)</h3>
              <PaymentMethodCard
                icon={<Smartphone className="w-6 h-6" />}
                name="Tigopesa / Airtel Money"
                description="Best for Tanzania"
                recommended
                country="tanzania"
              />
              <PaymentMethodCard
                icon={<Smartphone className="w-6 h-6" />}
                name="M-Pesa"
                description="For Kenya travelers"
                country="kenya"
              />
              <PaymentMethodCard
                icon={<Smartphone className="w-6 h-6" />}
                name="MTN Mobile Money"
                description="Best for Uganda"
                country="uganda"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-medium px-1">Cards & Banks</h3>
              <PaymentMethodCard
                icon={<CreditCard className="w-6 h-6" />}
                name="Visa/Mastercard"
                description="Widely accepted"
              />
              <PaymentMethodCard
                icon={<Building2 className="w-6 h-6" />}
                name="Bank Transfer"
                description="For larger amounts"
              />
            </div>

            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 text-sm text-amber-900">
                  <strong>Local tip:</strong> Mobile money is the fastest and most reliable payment 
                  method across East Africa. Lower fees than cards!
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function BalanceCard({
  currency,
  amount,
  country
}: {
  currency: Currency;
  amount: number;
  country?: 'kenya' | 'tanzania' | 'uganda';
}) {
  const info = currencyInfo[currency];
  
  return (
    <Card className="p-5 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {country && <CountryFlag country={country} size="sm" />}
          <div>
            <div className="text-sm text-muted-foreground">{currency}</div>
            <div className="font-medium text-xs">{info.name}</div>
          </div>
        </div>
        <Badge variant="secondary">{currency}</Badge>
      </div>

      <div className="mb-4">
        <CurrencyDisplay
          amount={amount}
          currency={currency}
          className="text-3xl font-bold"
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <ArrowUpDown className="w-4 h-4 mr-1" />
          Convert
        </Button>
      </div>
    </Card>
  );
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  const isDebit = transaction.type === 'debit';
  const info = currencyInfo[transaction.currency];
  
  // Color coding by country
  const countryColor = info.country === 'kenya' ? 'border-l-green-500' :
                      info.country === 'tanzania' ? 'border-l-blue-500' :
                      info.country === 'uganda' ? 'border-l-red-500' :
                      'border-l-muted';

  return (
    <Card className={`p-4 border-l-4 ${countryColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDebit ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          }`}>
            {isDebit ? (
              <TrendingDown className="w-5 h-5" />
            ) : (
              <TrendingUp className="w-5 h-5" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium mb-1">{transaction.description}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                {transaction.category}
              </Badge>
              <span>
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className={`font-bold ${isDebit ? 'text-red-600' : 'text-green-600'}`}>
            {isDebit ? '-' : '+'}
            <CurrencyDisplay
              amount={transaction.amount}
              currency={transaction.currency}
            />
          </div>
          <div className="text-xs text-muted-foreground">{transaction.currency}</div>
        </div>
      </div>
    </Card>
  );
}

function PaymentMethodCard({
  icon,
  name,
  description,
  recommended,
  country
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  recommended?: boolean;
  country?: 'kenya' | 'tanzania' | 'uganda';
}) {
  return (
    <Card className={`p-4 ${recommended ? 'border-primary' : ''}`}>
      <div className="flex items-center gap-3">
        {country && <CountryFlag country={country} size="sm" />}
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            {recommended && (
              <Badge className="bg-primary text-xs">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Recommended
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button variant="outline" size="sm">
          Link
        </Button>
      </div>
    </Card>
  );
}