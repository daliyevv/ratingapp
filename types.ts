
export interface Room {
  id: string;
  name: string;
  code: string;
  maxUploadsPerUser: number;
  createdAt: number;
}

export type AssetType = 'image' | 'stl';

export interface ImageModel {
  id: string;
  title: string;
  url: string; // Base64 data or URL
  type: AssetType;
  roomId: string;
  creatorId: string;
  createdAt: number;
}

export interface AccessCode {
  code: string;
  isActive: boolean;
  singleUse: boolean;
  usedCount: number;
  roomId: string;
  createdAt: number;
}

export interface Vote {
  id: string;
  imageId: string;
  anonId: string;
  codeUsed: string;
  score: number;
  createdAt: number;
}

export interface ImageStats {
  average: number;
  count: number;
  min: number;
  max: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  anonId: string | null;
  code: string | null;
  isAdmin: boolean;
  roomId: string | null;
  roomName: string | null;
}
