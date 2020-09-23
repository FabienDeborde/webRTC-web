export interface RoomData {
  name: string;
  password?: string;
}

export interface RoomCreateResponse {
  id?: string;
  code?: number;
  message?: string;
}
export interface RoomAccessResponse {
  access?: boolean;
  id?: string;
  code?: number;
  message?: string;
}
