"use client";

import { useState } from "react";
import { PhoneFrame } from "./phone-simulator/PhoneFrame";
import { MallScreen } from "./mall-simulator/MallScreen";
import { LaptopFrame } from "./web-simulator/LaptopFrame";
import { cn } from "@/lib/utils";
import { ConfigForm } from "./settings/ConfigForm";
import { PhoneTheme, Platform } from "@/lib/types";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Settings, History, Smartphone, Store, Laptop } from "lucide-react";
import { LogViewer } from "./logs/LogViewer";
import { SimulatedDevices, useAppStore } from "@/hooks/use-app-state";

export function USSDSimulator() {
  const [theme, setTheme] = useState<PhoneTheme>("ios");
  const [platform, setPlatform] = useState<Platform>("USSD");
  const { isLoading } = useUSSDSession();
  const { formState, updateFormState } = useAppStore();

  const updateState = (
    platform: string,
    operator: string,
    device: SimulatedDevices
  ) => {
    updateFormState({ ...formState, operator, platform, device });
  };

  const renderSimulator = () => {
    if (formState.platform === "USSD") {
      return (
        <PhoneFrame
          theme={theme}
          isLoading={isLoading}
          operator={formState.operator}
        />
      );
    }

    switch (formState.device) {
      case "android":
        return (
          <div className="w-[320px] h-[640px] overflow-hidden relative rounded-[44px] border-[14px] border-black bg-white shadow-2xl">
            <MallScreen theme={theme} isLoading={isLoading} />
          </div>
        );
      case "ios":
        return (
          <div className="w-[320px] h-[640px] overflow-hidden relative rounded-[44px] border-[14px] border-black bg-white shadow-2xl">
            <MallScreen theme={theme} isLoading={isLoading} />
          </div>
        );
      case "web":
        return (
          <div className="w-full py-8">
            <LaptopFrame isLoading={isLoading} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8 items-center border-b pb-4">
          <h5 className="text-xl font-bold">Hubtel PS Simulator</h5>
          <div className="flex items-center gap-2">
            <Button
              variant={formState.platform === "USSD" ? "default" : "outline"}
              className={cn(
                "gap-2",
                formState.platform === "USSD" && "text-primary-foreground"
              )}
              onClick={() => updateState("USSD", "mtn", "ios")}
            >
              <Smartphone className="h-4 w-4" />
              USSD
            </Button>
            <Button
              variant={
                formState.platform === "HUBTEL-MALL" ? "default" : "outline"
              }
              className={cn(
                "gap-2",
                formState.platform === "HUBTEL-MALL" &&
                  "text-primary-foreground"
              )}
              onClick={() => updateState("HUBTEL-MALL", "Webstore", "android")}
            >
              <Store className="h-4 w-4" />
              Hubtel
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8 justify-center items-center">
            {renderSimulator()}
            {formState.platform === "HUBTEL-MALL" && (
              <div className="flex items-center gap-2">
                <Button
                  variant={
                    formState.device === "android" ? "default" : "outline"
                  }
                  className={cn(
                    "gap-2",
                    formState.device === "android" && "text-primary-foreground"
                  )}
                  onClick={() =>
                    updateState("HUBTEL-MALL", "Webstore", "android")
                  }
                >
                  <Smartphone className="h-4 w-4" />
                  Android
                </Button>
                <Button
                  variant={formState.device === "ios" ? "default" : "outline"}
                  className={cn(
                    "gap-2",
                    formState.device === "ios" && "text-primary-foreground"
                  )}
                  onClick={() => updateState("HUBTEL-MALL", "Webstore", "ios")}
                >
                  <Smartphone className="h-4 w-4" />
                  iOS
                </Button>
                <Button
                  variant={formState.device === "web" ? "default" : "outline"}
                  className={cn(
                    "gap-2",
                    formState.device === "web" && "text-primary-foreground"
                  )}
                  onClick={() => updateState("HUBTEL-MALL", "Webstore", "web")}
                >
                  <Laptop className="h-4 w-4" />
                  Web
                </Button>
              </div>
            )}
            {formState.platform === "USSD" && (
              <div className="flex items-center gap-2">
                <Button
                  variant={theme === "android" ? "default" : "outline"}
                  className={cn(
                    "gap-2",
                    theme === "android" && "text-primary-foreground"
                  )}
                  onClick={() => setTheme("android")}
                >
                  <Smartphone className="h-4 w-4" />
                  Android
                </Button>
                <Button
                  variant={theme === "ios" ? "default" : "outline"}
                  className={cn(
                    "gap-2",
                    theme === "ios" && "text-primary-foreground"
                  )}
                  onClick={() => setTheme("ios")}
                >
                  <Smartphone className="h-4 w-4" />
                  iOS
                </Button>
              </div>
            )}
          </div>
          <div>
            <Tabs defaultValue="settings">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="logs" className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Logs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="mt-4">
                <ConfigForm />
              </TabsContent>

              <TabsContent value="logs" className="mt-4">
                <LogViewer />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
