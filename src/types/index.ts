// src/types/index.ts
// Shared TypeScript types for UAP Disclosure Tracker

export type Chamber = 'SENATE' | 'HOUSE' | 'JOINT';
export type HearingStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
export type Importance = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type EventCategory =
  | 'HEARING'
  | 'DOCUMENT_RELEASE'
  | 'LEGISLATION'
  | 'EXECUTIVE_ACTION'
  | 'WHISTLEBLOWER'
  | 'MEDIA'
  | 'SCIENTIFIC'
  | 'INTERNATIONAL';

export type DocumentSource =
  | 'NARA' | 'AARO' | 'FOIA' | 'CIA' | 'NSA'
  | 'DOD' | 'FAA' | 'NASA' | 'BLACK_VAULT'
  | 'CONGRESS' | 'EXECUTIVE' | 'OTHER';

export type LegislationStatus =
  | 'INTRODUCED' | 'IN_COMMITTEE' | 'PASSED_HOUSE'
  | 'PASSED_SENATE' | 'PASSED_BOTH' | 'SIGNED_INTO_LAW'
  | 'VETOED' | 'DEAD';

export type PlayerCategory =
  | 'LEGISLATOR' | 'MILITARY' | 'INTELLIGENCE'
  | 'WHISTLEBLOWER' | 'SCIENTIST' | 'JOURNALIST'
  | 'GOVERNMENT' | 'ADVOCATE';

// ============================================
// API Response Types
// ============================================

export interface Hearing {
  id: string;
  title: string;
  description?: string;
  committee: string;
  subcommittee?: string;
  chamber: Chamber;
  date: string;
  status: HearingStatus;
  isClassified: boolean;
  videoUrl?: string;
  transcriptUrl?: string;
  summary?: string;
  keyTakeaways: string[];
  witnesses: Witness[];
  tags: string[];
  sourceUrl?: string;
}

export interface Witness {
  id: string;
  name: string;
  title?: string;
  organization?: string;
  bio?: string;
  testimony?: string;
  keyQuotes: string[];
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  source: DocumentSource;
  sourceAgency?: string;
  documentType: string;
  datePublished?: string;
  dateOriginal?: string;
  fileUrl?: string;
  pageCount?: number;
  classification?: string;
  summary?: string;
  keyFindings: string[];
  tags: string[];
  sourceUrl: string;
}

export interface Legislation {
  id: string;
  title: string;
  billNumber?: string;
  congress?: number;
  chamber: Chamber;
  status: LegislationStatus;
  sponsor?: string;
  cosponsors: string[];
  description?: string;
  summary?: string;
  uapProvisions?: string;
  dateIntroduced?: string;
  dateLastAction?: string;
  lastAction?: string;
  congressGovUrl?: string;
  tags: string[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: EventCategory;
  importance: Importance;
  sourceUrl?: string;
  imageUrl?: string;
  tags: string[];
}

export interface KeyPlayer {
  id: string;
  name: string;
  role: string;
  organization?: string;
  category: PlayerCategory;
  bio?: string;
  photoUrl?: string;
  stance?: string;
  keyActions: string[];
  isActive: boolean;
}

export interface Alert {
  id: string;
  title: string;
  body: string;
  category: EventCategory;
  importance: Importance;
  sourceUrl?: string;
  createdAt: string;
}

// ============================================
// Dashboard Stats
// ============================================
export interface DashboardStats {
  totalHearings: number;
  upcomingHearings: number;
  totalDocuments: number;
  recentDocuments: number;
  activeLegislation: number;
  pendingFoiaObligations: number;
  lastUpdated: string;
}
