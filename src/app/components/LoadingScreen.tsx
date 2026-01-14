import React from 'react';
import { CulturalPattern } from './CulturalPattern';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <CulturalPattern variant="geometric" opacity={0.03} />
      
      <div className="relative z-10 text-center space-y-6 px-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-pulse">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-white">
              <path
                fill="currentColor"
                d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
              />
            </svg>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Korongo</h1>
          <p className="text-sm text-muted-foreground">Your AFCON 2027 Companion</p>
        </div>

        <div className="flex justify-center">
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 50%;
            margin-left: 25%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
