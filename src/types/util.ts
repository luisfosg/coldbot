export interface PrefixFun {
  args: string[];
  isPrefix: boolean;
}

export interface ServerType {
  active?: boolean;
  prefix?: string;
}
