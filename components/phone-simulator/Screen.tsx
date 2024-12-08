'use client';

import { cn } from '@/lib/utils';
import { USSDResponse } from '@/lib/types';
import { useAppStore } from '@/hooks/use-app-state';

interface ScreenProps {
  content: string;
  theme: 'ios' | 'android';
  response: USSDResponse | null;
  isLoading?: boolean;
}

export function Screen({ content, theme, response, isLoading }: ScreenProps) {
  const { formState } = useAppStore()
  const isInputMode = response?.dataType === 'input';
  const displayContent =  formState.ussdCode || 'Enter USSD code';

  return (
    <div className={cn(
      'flex-1 min-h-0 p-4 font-mono overflow-y-auto',
      theme === 'ios' 
        ? 'bg-[#F2F2F7]' 
        : 'bg-[#1C1C1E] text-white'
    )}>
      <div className={cn(
        'h-full p-6 rounded-2xl flex flex-col',
        theme === 'ios' 
          ? 'bg-white shadow-sm' 
          : 'bg-black/40 text-white/90',
        isLoading && 'animate-pulse'
      )}>
        <div className="flex-1 whitespace-pre-line text-lg">
          {displayContent}
        </div>
        {isInputMode && (
          <div className={cn(
            'mt-2 h-0.5 w-16 animate-pulse',
            theme === 'ios' ? 'bg-black' : 'bg-white'
          )} />
        )}
      </div>
    </div>
  );
}