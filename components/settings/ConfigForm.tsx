'use client';

import { useState } from 'react';
import { USSDConfig } from '@/lib/types';
import { DEFAULT_CONFIG, OPERATORS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RequestPayload, useAppStore } from '@/hooks/use-app-state';
import { useUSSDSession } from '@/hooks/use-ussd-session';




export function ConfigForm() {
  const {sendRequest} = useUSSDSession()
  const { setUserInput, updateFormState , formState: config} = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      const response = await sendRequest('initiation');
      setUserInput('')
      console.log(response)
  };

  const saveConfig = () => {
    updateFormState(config);
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input
          id="mobile"
          value={config.mobile}
          onChange={(e) => updateFormState({ ...config, mobile: e.target.value })}
          placeholder="233200000000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ussdCode">USSD Code</Label>
        <Input
          id="ussdCode"
          value={config.ussdCode}
          onChange={(e) => updateFormState({ ...config, ussdCode: e.target.value })}
          placeholder="*713#"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="operator">Operator</Label>
        <Select
          value={config.operator}
          onValueChange={(value) => updateFormState({ ...config, operator: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {OPERATORS.map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interactionUrl">Session ID</Label>
        <Input
          id="interactionUrl"
          value={config.sessionId}
          onChange={(e) => updateFormState({ ...config, sessionId: e.target.value })}
          placeholder="https://api.example.com/ussd"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interactionUrl">Service Code</Label>
        <Input
          id="interactionUrl"
          value={config.serviceCode}
          onChange={(e) => updateFormState({ ...config, serviceCode: e.target.value })}
          placeholder="https://api.example.com/ussd"
        />
      </div>


      <div className="space-y-2">
        <Label htmlFor="interactionUrl">Interaction URL</Label>
        <Input
          id="interactionUrl"
          value={config.url}
          onChange={(e) => updateFormState({ ...config, url: e.target.value })}
          placeholder="https://api.example.com/ussd"
        />
      </div>
      

      {/* <Button type="submit" className="w-full">
        Save Configuration
      </Button> */}
    <div className="flex space-x-4">
    <Button type="submit" className="w-full"  >
        Start
      </Button>
      <Button type="button" onClick={saveConfig} className="w-full">
        Save Configuration
      </Button>
      
    </div>
    </form>
  );
}