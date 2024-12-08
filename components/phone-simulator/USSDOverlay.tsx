'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ResponseType, useAppStore } from '@/hooks/use-app-state';
import { useUSSDSession } from '@/hooks/use-ussd-session';

interface USSDOverlayProps {
  theme: 'ios' | 'android';
  onDismiss: () => void;
  content: string;
  isLoading?: boolean;
}

export function USSDOverlay({  
  theme, 
  onDismiss, 
}: USSDOverlayProps) {
  const { sessionResponse, formState, isLoading, showDialog, setUserInput, setShowDialog, userInput } = useAppStore();
  const { sendRequest } = useUSSDSession()
  console.log(sessionResponse, formState)


  if (!showDialog ) return null;

  const isReleaseType = sessionResponse.type?.toLocaleLowerCase() === 'release';
  const isInputMode = sessionResponse.type?.toLocaleLowerCase() === 'response';
  const displayContent = sessionResponse.label ?? sessionResponse.message 

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDialog(false)
  };

  const handleSubmit = async (e: React.FormEvent, type: ResponseType) => {
    e.preventDefault();
    const response = await sendRequest(type)
    setUserInput('')
    console.log(response)
  };

  return (
    <div 
      className={cn(
        'absolute inset-0 z-50 flex items-center justify-center p-6',
        'bg-black/40 backdrop-blur-sm'
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={cn(
        'w-full max-w-[280px] rounded-2xl overflow-hidden',
        theme === 'ios' ? 'bg-white' : 'bg-[#2C2C2E]'
      )}>
        <div className={cn(
          'p-4 flex flex-col',
          isLoading && 'animate-pulse'
        )}>
          <div className={cn(
            'flex-1 whitespace-pre-line text-base',
            theme === 'ios' ? 'text-black' : 'text-white'
          )}>
            {displayContent}
          </div>
          {isInputMode && (
            <div className={cn(
              'mt-2 mb-2 h-0.5 w-16 animate-pulse',
              theme === 'ios' ? 'bg-black' : 'bg-white'
            )} />
          )}
          {sessionResponse.data && sessionResponse.data.map((item: any, index: any) => (
            <div 
              key={index} 
              className={cn(
                'flex items-center justify-between p1-2',
                theme === 'ios' ? 'text-black' : 'text-white'
              )}
            >
              <span>{item.value}. {item.display}</span>
            </div>
          ))}

         
        </div>

        <div >
          <form onSubmit={(e) => handleSubmit(e, 'response')} className="p-4">
            {isInputMode && (
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter response..."
                className={cn(
                  'mb-3 text-center', 
                  theme === 'ios' 
                    ? 'bg-transparent' 
                    : 'bg-transparent text-white placeholder:text-gray-400'
                )}
              />
            )}
            <div className={cn(
              'flex gap-2',
              isReleaseType ? 'justify-end' : 'justify-center'
            )}>
              {isInputMode ? (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleDismiss}
                    className={cn(
                      'flex-1 h-12 rounded-md font-medium',
                      theme === 'ios'
                        ? 'text-red-600 hover:bg-gray-100'
                        : 'text-red-400 hover:bg-gray-800'
                    )}
                  >
                    Cancel
                  </Button>
                  <Button
                  //  disabled={!userInput}
                    type="submit"
                    variant="ghost"
                    className={cn(
                      'flex-1 h-12 rounded-md font-medium',
                      theme === 'ios'
                        ? 'text-blue-600 hover:bg-gray-100'
                        : 'text-blue-400 hover:bg-gray-800'
                    )}
                  >
                    Send
                  </Button>
                </>
              ) : (
                <Button
                  type="submit"
                  onClick={handleDismiss}
                  variant="ghost"
                  className={cn(
                    'w-full h-12 rounded-md font-medium',
                    theme === 'ios'
                      ? 'text-blue-600 hover:bg-gray-100'
                      : 'text-blue-400 hover:bg-gray-800'
                  )}
                >
                  OK
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}