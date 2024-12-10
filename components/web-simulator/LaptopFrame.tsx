"use client";

import { cn } from "@/lib/utils";
import { WebScreen } from "./WebScreen";

interface LaptopFrameProps {
  isLoading?: boolean;
}

export function LaptopFrame({ isLoading }: LaptopFrameProps) {
  return (
    <div className="w-full max-w-[1024px] mx-auto">
      {/* Laptop Lid */}
      <div className="relative bg-gray-800 rounded-t-2xl pt-2 px-2">
        {/* Camera */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700">
          <div className="absolute w-1 h-1 rounded-full bg-gray-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Screen */}
        <div className="aspect-video rounded-lg overflow-hidden bg-white border-4 border-gray-700">
          <WebScreen isLoading={isLoading} />
        </div>
      </div>
      
      {/* Laptop Base */}
      <div className="relative bg-gray-800 rounded-b-lg">
        <div className="h-4 bg-gradient-to-b from-gray-800 to-gray-700"></div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-b-lg"></div>
      </div>
    </div>
  );
}