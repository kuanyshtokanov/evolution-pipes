import { SocketStatus } from "../const";

export interface SocketState {
  status: SocketStatus;
  busy: boolean;
}