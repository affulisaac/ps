'use client';

import { RequestPayload } from '@/hooks/use-app-state';
export async function makeFetch<T>(
  request: RequestPayload,
  interactionUrl: string
): Promise<T> {
  try {
    const response = await fetch(interactionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMTk3OWMwMS0wOTkyLTQ2Y2QtYmYxZi1mM2Y1MGEwNTc0NmMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjIzMzU0NzQ2OTM3OSIsIm5iZiI6MTczMzY1NTA5MiwiZXhwIjoxNzY1MTkxMDkyLCJpc3MiOiJodHRwOi8vaHVidGVsLmNvbSIsImF1ZCI6Imh0dHA6Ly9odWJ0ZWwuY29tIn0.sORP44c2fHw_LTlNvSBbbNkbd0FGsJmrFAKwmlyIKPo'
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data as T;
  } catch (error) {
    console.error('USSD request failed:', error);
    return  error as T;

  }
}