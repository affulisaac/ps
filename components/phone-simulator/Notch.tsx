'use client';

interface NotchProps {
  theme: 'ios' | 'android';
}

export function Notch({ theme }: NotchProps) {
  if (theme !== 'ios') {
    return (
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
        <div className="w-2 h-2 mt-1.5 rounded-full bg-black/20" />
      </div>
    );
  }
  
  return (
    <div className="absolute top-0 inset-x-0 h-7 flex justify-center items-start">
      <div className="w-[40%] h-[25px] bg-black rounded-b-[24px] flex items-center justify-center">
        <div className="w-16 h-2 bg-[#1C1C1E] rounded-full" />
      </div>
    </div>
  );
}