'use client';

import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useBusiness } from '@/lib/hooks/use-business';
import { Logo } from '@/components/logo';

export function LoyaltyCard({ businessName, logoUrl, stamps, goal }: {
  businessName: string;
  logoUrl?: string;
  stamps: number;
  goal: number;
}) {
  // Generate an array of stamps based on the total and goal
  const stampArray = useMemo(() => {
    return Array.from({ length: goal }, (_, i) => i < stamps);
  }, [stamps, goal]);

  return (
    <Card className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md mx-auto relative">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50"
        style={{ opacity: 0.8 }}
      />
      
      <CardContent className="p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h3 className="font-bold text-xl">{businessName}</h3>
            <p className="text-sm text-gray-600">Loyalty Card</p>
          </div>
          
          <div className="h-12 w-12 flex items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${businessName} logo`} 
                className="h-full w-full object-cover"
              />
            ) : (
              <Logo showText={false} size={18} />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {stampArray.map((isStamped, index) => (
            <div
              key={index}
              className={`aspect-square rounded-full border-2 flex items-center justify-center ${
                isStamped
                  ? 'bg-blue-500 border-blue-600 text-white'
                  : 'bg-white border-gray-300'
              }`}
            >
              {isStamped && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm font-medium">
            {stamps} / {goal} stamps
          </p>
          {stamps === goal ? (
            <p className="text-green-600 font-bold mt-1">Reward ready! 🎉</p>
          ) : (
            <p className="text-gray-600 text-sm mt-1">
              {goal - stamps} more until your next reward
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}