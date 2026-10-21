export interface KindnessNote {
  id: string;
  text: string;
  author: string;
  date: string;
  stamp?: string;
  isUserCreated?: boolean;
}

export type SceneId = 
  | 'opening'
  | 'morning'
  | 'little-things'
  | 'rain'
  | 'people'
  | 'becoming'
  | 'closing';

export interface SceneMeta {
  id: SceneId;
  index: string;
  title: string;
  subtitle: string;
  theme: string;
}

export interface WallNote {
  id: string;
  title: string;
  snippet: string;
  fullText: string;
  author: string;
  rotation: number;
  color: string;
}

export interface BecomingArtifact {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  coordinates: { x: number; y: number };
}
