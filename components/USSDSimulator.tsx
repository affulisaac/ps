"use client";

import { useState } from "react";
import { PhoneFrame } from "./phone-simulator/PhoneFrame";
import { MallScreen } from "./mall-simulator/MallScreen";
import { ConfigForm } from "./settings/ConfigForm";
import { USSDConfig, PhoneTheme, Platform } from "@/lib/types";
import { DEFAULT_CONFIG } from "@/lib/constants";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Settings, History } from "lucide-react";
import { LogViewer } from "./logs/LogViewer";
import {  useAppStore } from "@/hooks/use-app-state";

export function USSDSimulator() {
  const [theme, setTheme] = useState<PhoneTheme>("ios");
  const [config, setConfig] = useState<USSDConfig>(DEFAULT_CONFIG);
  const [platform, setPlatform] = useState<Platform>("USSD");
  const { logs } = useAppStore();

  const { isLoading,  } = useUSSDSession();

 

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex  justify-between flex-col gap-4 mb-4 items-center border-b pb-4">
          <h5 className="text-xl font-bold">USSD Simulator</h5>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={platform === "USSD" ? "default" : "outline"}
                onClick={() => setPlatform("USSD")}
              >
                USSD
              </Button>
              <Button
                variant={platform === "hubtel-mall" ? "default" : "outline"}
                onClick={() => setPlatform("hubtel-mall")}
              >
                Hubtel Mall
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "ios" ? "default" : "outline"}
                onClick={() => setTheme("ios")}
              >
                iOS
              </Button>
              <Button
                variant={theme === "android" ? "default" : "outline"}
                onClick={() => setTheme("android")}
              >
                Android
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            {platform === "USSD" ? (
              <PhoneFrame
                theme={theme}
                isLoading={isLoading}
                operator={config.operator}
              />
            ) : (
              <div className={`w-[320px] h-[640px] overflow-hidden relative rounded-[44px] border-[14px] border-black bg-white shadow-2xl`}>
                <MallScreen theme={theme} isLoading={isLoading} />
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
                <ConfigForm onSubmit={setConfig} />
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
