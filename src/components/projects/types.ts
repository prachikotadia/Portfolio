
import { ReactNode } from 'react';

export interface ProjectType {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  icon: ReactNode;
  emoji: string;
}
