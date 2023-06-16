export interface BotEvent {
  name: string;
  description: string;
  once?: boolean;
  desactive?: boolean;
  permissions?: bigint[];
  execute: (...args: any[]) => Promise<void>;
}
