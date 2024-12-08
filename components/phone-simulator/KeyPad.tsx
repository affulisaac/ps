'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/hooks/use-app-state';

interface KeyPadProps {
  onKeyPress: (key: string) => void;
  theme: 'ios' | 'android';
}

export function KeyPad({ onKeyPress, theme }: KeyPadProps) {
  const { formState } = useAppStore();

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  const getLetters = (key: string) => {
    const letterMap: Record<string, string> = {
      '1': '',
      '2': 'ABC',
      '3': 'DEF',
      '4': 'GHI',
      '5': 'JKL',
      '6': 'MNO',
      '7': 'PQRS',
      '8': 'TUV',
      '9': 'WXYZ',
      '0': '+',
      '*': '',
      '#': ''
    };
    return letterMap[key] || '';
  };

  const handleKeyPress = (key: string) => {
    console.log('key', key);
    formState.ussdCode = formState.ussdCode + key;
  };

  return (
    <div className={cn(
      'px-6 pb-12 pt-4',
      theme === 'ios' 
        ? 'bg-[#F2F2F7] rounded-b-3xl' 
        : 'bg-[#1C1C1E] rounded-b-3xl'
    )}>
      <div className="grid grid-cols-3 gap-y-6 gap-x-6">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="col-span-3 grid grid-cols-3 gap-x-6">
            {row.map((key) => (
              <Button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={cn(
                  'h-[72px] relative p-0 border-0',
                  theme === 'ios' 
                    ? 'bg-white hover:bg-white/90 rounded-full text-black shadow-sm' 
                    : 'bg-transparent hover:bg-white/10 rounded-full text-white',
                )}
              >
                <div className="flex flex-col items-center">
                  <span className={cn(
                    'text-[28px] leading-none mb-1',
                    theme === 'ios' ? 'font-normal' : 'font-light'
                  )}>
                    {key}
                  </span>
                  {getLetters(key) && (
                    <span className={cn(
                      'text-[11px] tracking-[0.12em] uppercase',
                      theme === 'ios' 
                        ? 'text-black/60 font-medium' 
                        : 'text-white/60'
                    )}>
                      {getLetters(key)}
                    </span>
                  )}
                </div>
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}