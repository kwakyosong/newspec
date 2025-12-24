export type UserRole = 'super_admin' | 'company_admin' | 'user';

export type ContentCategory = 'contest' | 'event' | 'education' | 'community';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
}

export interface Content {
  id: string;
  title: string;
  category: ContentCategory;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  organizer: string;
  maxParticipants?: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'ended';
  tags: string[];
  createdBy: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: string;
  category: string;
}

export interface CareerStep {
  stepId: number;
  title: string;
  description: string;
  emotion: 'positive' | 'negative' | 'neutral'; // 당시 감정 상태
  date?: string;
}

export interface CareerJourney {
  id: string;
  persona: string; // 예: "30대 초반 비전공자"
  outcome: 'survivor' | 'dropout';
  name: string; // 예: "A씨의 여정"
  description: string;
  steps: CareerStep[];
}
