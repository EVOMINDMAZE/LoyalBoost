import { Coffee } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 24, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center justify-center bg-blue-500 text-white rounded-lg p-1">
        <Coffee size={size} />
      </div>
      {showText && (
        <span className="ml-2 font-bold text-xl">
          Loyal<span className="text-blue-500">Boost</span>
        </span>
      )}
    </div>
  );
}