'use client';

import { KeyPad } from './KeyPad';
import { Screen } from './Screen';
import { StatusBar } from './StatusBar';
import { Notch } from './Notch';
import { USSDOverlay } from './USSDOverlay';
import { cn } from '@/lib/utils';
import { PhoneTheme } from '@/lib/types';
import { useAppStore } from '@/hooks/use-app-state';
import { useUSSDSession } from '@/hooks/use-ussd-session';

interface PhoneFrameProps {
  theme: PhoneTheme;
  isLoading?: boolean;
  operator: string;
}

export function PhoneFrame({ theme, isLoading, operator }: PhoneFrameProps) {
  const { updateDialCode, setUserInput, dialCode  } = useAppStore(); 
  const { sendRequest } = useUSSDSession()

   const handleKeyPress = async (key: string) => {
    updateDialCode(key);
    if (key === '#') {
      await sendRequest('initiation');
    }
  };

  const handleDismiss = () => {
    setUserInput('');
  };

  return (
    <div className={cn(
      'w-[320px] h-[640px] overflow-hidden relative',
      theme === 'ios' 
        ? [
            'rounded-[44px]',
            'border-[14px] border-black',
            'bg-black',
            'shadow-2xl',
          ].join(' ')
        : [
            'rounded-[40px]',
            'border-[12px] border-[#1C1C1E]',
            'bg-[#1C1C1E]',
            'shadow-2xl',
          ].join(' ')
    )}>
      {/* Phone Frame Shine Effect */}
      <div className={cn(
        'absolute inset-[-14px] pointer-events-none z-50',
        theme === 'ios' 
          ? 'bg-[linear-gradient(120deg,#888_0%,transparent_10%,transparent_90%,#888_100%)]' 
          : 'bg-[linear-gradient(120deg,#333_0%,transparent_10%,transparent_90%,#333_100%)]'
      )} />
      
      {/* Power Button (Right) */}
      <div className={cn(
        'absolute right-[-14px] top-[120px] w-[3px] h-[60px] rounded-r-sm',
        theme === 'ios' ? 'bg-[#444]' : 'bg-[#2A2A2A]'
      )} />
      
      {/* Volume Buttons (Left) */}
      <div className={cn(
        'absolute left-[-14px] top-[100px] w-[3px] h-[40px] rounded-l-sm',
        theme === 'ios' ? 'bg-[#444]' : 'bg-[#2A2A2A]'
      )} />
      <div className={cn(
        'absolute left-[-14px] top-[160px] w-[3px] h-[40px] rounded-l-sm',
        theme === 'ios' ? 'bg-[#444]' : 'bg-[#2A2A2A]'
      )} />

      {/* Main Content Container */}
      <div className="relative h-full flex flex-col">
        <Notch theme={theme} />
        <StatusBar operator={operator} theme={theme} />
        
        {/* Dialer Area */}
        <div className="flex-1 min-h-0 flex flex-col">
          <Screen 
            content={dialCode} 
            theme={theme} 
            response={null}
            isLoading={isLoading} 
          />
          <KeyPad onKeyPress={handleKeyPress} theme={theme} />
        </div>

        {/* USSD Overlay */}
        <USSDOverlay
          theme={theme}
          onDismiss={handleDismiss}
          content={dialCode}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}