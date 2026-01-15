export enum ViewState {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  CALENDAR = 'CALENDAR',
  SKYE = 'SKYE',
  CHAT = 'CHAT',
  LOVE_NOTE = 'LOVE_NOTE',
  GALLERY = 'GALLERY',
  WATCH = 'WATCH',
  CALL = 'CALL'
}

export type User = 'Fidel' | 'Ravi';

export interface Message {
  id: string;
  sender: User;
  text: string;
  timestamp: number;
}

export interface SkyeStats {
  hunger: number; // 0-100
  energy: number; // 0-100
  happiness: number; // 0-100
  level: number;
  xp: number;
  streak: number;
  lastInteraction: number;
  avatarUrl?: string;
}

export interface CalendarEvent {
  date: string; // MM-DD
  title: string;
  type: 'BIRTHDAY' | 'ANNIVERSARY' | 'VISIT';
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}