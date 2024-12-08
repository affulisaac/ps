'use client';

import { Battery, Signal, Wifi } from 'lucide-react';

export function StatusBar() {
  return (
    <div className="h-11 px-5 flex items-center justify-between bg-white">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium">10:58</span>
      </div>
      <div className="flex items-center gap-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <div className="flex items-center">
          <Battery className="w-5 h-5 rotate-90" />
          <span className="text-xs ml-0.5">80%</span>
        </div>
      </div>
    </div>
  );
}