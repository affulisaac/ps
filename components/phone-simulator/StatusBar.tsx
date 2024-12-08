'use client';

import { cn } from '@/lib/utils';
import { Battery, Signal, Wifi } from 'lucide-react';

interface StatusBarProps {
  operator: string;
  theme: 'ios' | 'android';
}

export function StatusBar({ operator, theme }: StatusBarProps) {
  const formattedOperator = operator.charAt(0).toUpperCase() + operator.slice(1);
  
  return (
    <div className={cn(
      'h-12 px-6 flex items-center justify-between',
      theme === 'ios' 
        ? 'bg-[#F2F2F7]' 
        : 'bg-[#1C1C1E] text-white'
    )}>
      <div className="flex items-center gap-1">
        <Signal className="w-4 h-4" />
        <span className={cn(
          'text-xs font-medium',
          theme === 'android' && 'font-light'
        )}>
          {formattedOperator}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Wifi className="w-4 h-4" />
        <Battery className={cn(
          'w-4 h-4',
          theme === 'ios' ? 'rotate-90' : ''
        )} />
      </div>
    </div>
  );
}