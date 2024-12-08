import { ResponseTypes } from "@/hooks/use-app-state";

export interface USSDConfig {
  mobile: string;
  ussdCode: string;
  operator: string;
  interactionUrl: string;
  sequence?: number;
  clientState: string;
  platform: string;
  serviceCode: string;
  sessionId: string;
}

export interface USSDRequest {
  type: ResponseTypes
  mobile: string;
  message: string;
  serviceCode: string;
  operator: string;
  clientState: string;
  sessionId: string;
  sequence?: number;
  platform: string;
}

export interface USSDResponse {
  sessionId: string;
  type: 'response' | 'release' | 'AddToCart';
  message: string;
  label: string;
  data: Record<string, any>[]
  clientState?: string;
  dataType: 'display' | 'input';
  fieldType: 'text' | 'phone' | 'email' | 'number' | 'decimal' | 'textarea';
  inputPrompt?: string;
  validationRegex?: string;
}

export type PhoneTheme = 'ios' | 'android';
export type Platform = 'USSD' | 'HUBTEL-MALL';

export interface NomineeData {
  display: string;
  value: string;
  amount: number;
}

