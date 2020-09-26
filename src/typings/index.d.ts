export interface RoomData {
  name: string;
  password?: string;
}

export interface RoomAccess {
  id: string;
  password?: string;
}

export interface SendInvitation {
  id: string;
  emails: string[];
}

export interface RoomCreateResponse {
  id?: string;
  name?: string;
  code?: number;
  message?: string;
}
export interface RoomAccessResponse {
  access?: boolean;
  id?: string;
  name?: string;
  code?: number;
  message?: string;
}

export interface RoomState {
  access: boolean;
  name?: string;
}

export interface CustomError extends Error {
  error: any;
  code: number;
}
