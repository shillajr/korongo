import React from 'react';
import {
  Home,
  Compass,
  Trophy,
  MessageCircle,
  User
} from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function BottomNav({ activeView, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'matches', label: 'Matches', icon: Trophy },
    { id: 'community', label: 'Community', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-20 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1.5 px-4 py-3 rounded-[12px] transition-all min-w-[70px] active:scale-95 relative group ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`relative transition-all ${isActive ? 'scale-110' : 'scale-100'}`}>
                <Icon className={`w-6 h-6 transition-all ${isActive ? 'fill-primary/20' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-warm-amber rounded-full" />
                )}
              </div>
              <span className={`text-xs font-bold transition-all ${isActive ? 'scale-105' : ''}`}>{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-warm-amber to-transparent rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}