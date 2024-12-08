import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSessionId(): string {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}


export function formatUSSDMessage(message: string): string {
  return message.split('\n').map((line, index) => {
    if (index === 0) return line;
    return line.trim();
  }).join('\n');
}