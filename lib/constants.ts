import { SimulatedDevices } from '@/hooks/use-app-state';
import { USSDConfig } from './types';

export const OPERATORS = [
  { label: 'Vodafone', value: 'vodafone' },
  { label: 'MTN', value: 'mtn' },
  { label: 'AirtelTigo', value: 'airteltigo' },
  { label: 'Webstore', value: 'Webstore' },
];

export const SIMULATED_DEVICES = {
  android: 'Android',
  ios: 'iOS',
  web: 'Web',
}

export const DEFAULT_CONFIG:  USSDConfig = {
  mobile: '233547469379',
  ussdCode: '*713#',
  operator: 'vodafone',
  clientState: '',
  interactionUrl: 'http://localhost:2000/api/requests/interaction',
  platform: 'USSD',
  serviceCode: '3e0841e70afc42fb97d13d19abd36384',
  sessionId: "ssdsdsd",
};