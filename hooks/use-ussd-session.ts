'use client';

import { useState } from 'react';
import { makeFetch } from '@/lib/api-service';
import { RequestPayload, SessionResponse, useAppStore } from './use-app-state';

export function useUSSDSession() {

  const [isLoading, setIsLoading] = useState(false);
  const { formState, updateRequestLogs, userInput, setSessionResponse, setShowDialog  } = useAppStore()

  const sendRequest = async (type: string) => {
    setIsLoading(true);

    const payload: RequestPayload = {  ...formState, message: userInput,  type };
     if(payload.platform == 'HUBTEL-MALL'){
      payload.operator = 'webstore'
    }
    try {
      const response = await makeFetch<SessionResponse>(payload, formState.url);
      setShowDialog(true)
      setSessionResponse(response);
      updateRequestLogs({
        request: payload ,
        response: response as SessionResponse,
        timestamp: new Date(),
      });
      return response;
    } catch (error) {
      console.error('USSD request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendRequest,
  };
}