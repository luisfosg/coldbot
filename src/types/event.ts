export interface BotEvent {
  name: string;
  description: string;
  once?: boolean;
  desactive?: boolean
  execute: (...args: any) => Promise<void>;
}
