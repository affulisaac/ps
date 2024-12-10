"use client";

import { ChevronLeft } from "lucide-react";
import { NomineeData } from "@/lib/types";
import { ResponseType, useAppStore } from "@/hooks/use-app-state";
import { Button } from "../ui/button";
import { StatusBar } from "../phone-simulator/StatusBar";
import { ScrollArea } from "../ui/scroll-area";
import { useUSSDSession } from "@/hooks/use-ussd-session";
import { Notch } from "../phone-simulator/Notch";

interface MallScreenProps {
  theme: "ios" | "android";
  isLoading?: boolean;
}

export function MallScreen({ theme, isLoading }: MallScreenProps) {
  const { sessionResponse, setUserInput, userInput, formState } = useAppStore();
  const { sendRequest } = useUSSDSession();

  const handleSubmit = async (type: ResponseType, message: string) => {
    console.log("message", message);
    setUserInput(message);
    console.log("userInput", userInput);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await sendRequest(type);
    console.log(response);
  };

  if (!sessionResponse.type) {
    return (
      <>
        <Notch theme={formState.device} />
        <StatusBar theme={formState.device} operator={formState.operator} />
        <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            There is no active session Click on the start button the web flow
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex-1 bg-background">
      <Notch theme={formState.device} />
      <StatusBar theme={formState.device} operator={formState.operator} />

      {/* Banner Image */}
      <div className="relative w-full h-40">
        <div className="absolute inset-0 bg-black/40" />

        {/* Logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-black border-2 border-white overflow-hidden"></div>
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
          <p className=" mb-4">{sessionResponse.label}</p>

          <div className="">
            {sessionResponse.data?.map((item: NomineeData) => (
              <p
                key={item.value}
                className="w-full p-2 cursor-pointer border-b flex items-center justify-between h-14 hover:bg-gray-50"
                onClick={() => handleSubmit("response", item.value)}
              >
                <span className="text-base font-normal">{item.display}</span>
                <ChevronLeft className="h-5 w-5 ml-auto rotate-180" />
              </p>
            ))}
          </div>

          {sessionResponse.type?.toLocaleLowerCase() === "addtocart" && (
            <>
              <p>{sessionResponse.item?.itemName}</p>
              <p className="text-muted-foreground">
                Quantity: <span>{sessionResponse.item?.qty}</span>
              </p>
              <p className="mt-0 text-muted-foreground">
                Price: <span>{sessionResponse.item?.price}</span>
              </p>
            </>
          )}
          {/* {sessionResponse.dataType === "input" && (
            <Input
              type="text"
              placeholder={
                sessionResponse.fieldType === "phone"
                  ? "Enter phone number"
                  : "Enter value"
              }
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full h-12 text-lg"
            />
          )} */}
          {sessionResponse.dataType != "select" && (
            <Button
              onClick={() => handleSubmit("response", userInput)}
              type="submit"
              className="text-lg text-sm text-white transition-colors"
            >
              {sessionResponse?.type?.toLocaleLowerCase() === "addtocart"
                ? "Proceed to pay"
                : sessionResponse?.type?.toLocaleLowerCase() === "response"
                ? "Next"
                : "OK"}
            </Button>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
