'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Types
export type PlatformType = 'WEB' | 'HUBTEL APP' | 'HUBTEL POS' | 'USSD' | 'NONE';
export type ResponseType = 'initiation' | 'response' | 'timeout' | 'release'| 'addtocart';

export interface RequestPayload {
    url: string;
    platform: string;
    device: SimulatedDevices;
    operator: string;
    ussdCode: string;
    mobile: string;
    type?: string;
    message: string;
    authToken: string;
    serviceCode: string;
    sessionId: string;
}

export interface SessionResponse {
    sessionId: string;
    data: any;
    status: string;
    message: string;
    dataType: string;
    fieldName: string;
    fieldType: string;
    item: any;
    type: ResponseType;
    label: string;
}

export interface RequestLog {
    request: RequestPayload;
    response: SessionResponse;
    timestamp: Date;
}

export type SimulatedDevices = 'android' | 'ios' | 'web';



// Initial state
const initialState = {
    showDialog: false,
    isLoading: false,
    formState: {
        url: 'http://localhost:2000/api/requests/interaction',
        platform: 'HUBTEL-MALL',
        device: 'android',
        operator: 'mtn',
        mobile: '233547469379',
        ussdCode: '*713#',
        message: '',
        authToken: 'hsdeofgfg',
        serviceCode: '70972a31e8e443c69ed189160590d7cf',
        sessionId: 'ssdsdsd'
    } as RequestPayload,
    activeSection: 'NONE' as PlatformType,
    sessionResponse: {} as SessionResponse,
    userInput: '',
    dialCode: '',
    logs: [] as RequestLog[]
};

// State interface
interface AppState {
    isLoading: boolean;
    showDialog: boolean;    
    formState: RequestPayload;
    activeSection: PlatformType;
    sessionResponse: SessionResponse;
    userInput: string;
    dialCode: string;
    logs: RequestLog[];
    
    // Actions
    setIsLoading: (loading: boolean) => void;
    setShowDialog: (loading: boolean) => void;
    updateFormState: (updates: Partial<RequestPayload>) => void;
    setActiveSection: (section: PlatformType) => void;
    setSessionResponse: (response: SessionResponse) => void;
    setUserInput: (input: string) => void;
    updateDialCode: (code: string) => void;
    updateRequestLogs: (log: RequestLog) => void;
    reset: () => void;
}

export const useAppStore = create<AppState>()(
    devtools(
        (set) => ({
            ...initialState,

            // Actions
            setIsLoading: (loading) => 
                set({ isLoading: loading }, false, 'setIsLoading'),

            setShowDialog: (loading) => 
                set({ showDialog: loading }, false, 'setIsLoading'),

            updateFormState: (updates) =>
                set(
                    (state) => ({ 
                        formState: { ...state.formState, ...updates } 
                    }),
                    false,
                    'updateFormState'
                ),

            setActiveSection: (section) =>
                set({ activeSection: section }, false, 'setActiveSection'),

            setSessionResponse: (response) =>
                set({ sessionResponse: response }, false, 'setSessionResponse'),

            setUserInput: (input) =>
                set({ userInput: input }, false, 'setUserInput'),

            updateDialCode: (code) =>
                set(
                    (state) => ({ dialCode: state.dialCode + code }),
                    false,
                    'updateDialCode'
                ),

                updateRequestLogs: (log) =>
                set(
                    (state) => ({ logs: [...state.logs, log] }),
                    false,
                    'addLog'
                ),

            reset: () =>
                set(initialState, false, 'reset'),
        }),
        { name: 'app-store' }
    )
);

