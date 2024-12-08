import { ChevronLeft } from 'lucide-react';
import { NomineeData } from '@/lib/types';
import { useAppStore } from '@/hooks/use-app-state';
import { Button } from '../ui/button';
import { StatusBar } from './StatusBar';
import { ScrollArea } from '../ui/scroll-area';
import { useUSSDSession } from '@/hooks/use-ussd-session';
import Image from 'next/image';

interface MallScreenProps {
  theme: 'ios' | 'android';
  isLoading?: boolean;
}

export function MallScreen({ theme, isLoading }: MallScreenProps) {
  const { sessionResponse, setUserInput } = useAppStore();
    const { sendRequest } = useUSSDSession()

   const handleSubmit = async (type: ResponseType, message: string) => {
     setUserInput(message)
    const response = await sendRequest(type)
    setUserInput('')
    console.log(response)
  };

  return (
    <div className="flex-1 bg-background">
      <StatusBar />
      
      {/* Banner Image */}
      <div className="relative w-full h-40">
     
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-black border-2 border-white overflow-hidden">
          
          </div>
          <h1 className="text-xl font-semibold text-white mt-2">
          Service Name
          </h1>
        </div>
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100%-200px)]">
        <div className="p-2 space-y-4">
          <p className=" mb-4">{ sessionResponse.label }</p>
          
          <div className="">
            {sessionResponse.data?.map((nominee: NomineeData) => (
              <p
                key={nominee.value}
                variant="outline"
                className="w-full p-2 cursor-pointer border-b flex items-center justify-between h-14 hover:bg-gray-50"
                onClick={() => handleSubmit('response', nominee.value )}
              >
                <span className="text-base font-normal">{nominee.display}</span>
                <ChevronLeft className="h-5 w-5 ml-auto rotate-180" />
              </p>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}