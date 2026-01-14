import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface EmergencyButtonProps {
  onClick: () => void;
  variant?: 'floating' | 'inline';
  className?: string;
}

export function EmergencyButton({ onClick, variant = 'floating', className = '' }: EmergencyButtonProps) {
  if (variant === 'floating') {
    return (
      <button
        onClick={onClick}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 ${className}`}
        aria-label="Emergency"
      >
        <ShieldAlert className="w-6 h-6" />
      </button>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="destructive"
      className={`w-full gap-2 ${className}`}
      size="lg"
    >
      <ShieldAlert className="w-5 h-5" />
      Emergency
    </Button>
  );
}
