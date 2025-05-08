
import { ReactNode } from 'react';

export interface ProjectType {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;    
  iconComponent?: string;
  iconColor?: string;
  emoji?: string;
  icon?: React.ReactNode;
}
