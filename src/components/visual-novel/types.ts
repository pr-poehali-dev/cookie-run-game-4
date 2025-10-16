export type Character = 'silent' | 'narrator' | 'shadowmilk' | 'whitelily';

export interface DialogLine {
  id: number;
  character: Character;
  name: string;
  text: string;
  image?: string;
}

export interface Choice {
  text: string;
  nextScene: number;
}

export interface Scene {
  id: number;
  background: string;
  backgroundImage?: string;
  dialogs: DialogLine[];
  choices?: Choice[];
  isEnding?: boolean;
}
