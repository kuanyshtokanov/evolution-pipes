import { LinearBackoff, WebsocketBuilder, Websocket } from "websocket-ts";
import { SocketStatus } from "../const";
import { setSocketBusy, setSocketStatus } from "../store/socket/socket.slice";
import { setCurrentLevel, setMap } from '../store/map/map.slice';
import { store as Storage } from '../store/store';

export const WEBSOCKET_RECONNECT_CODE = 4001;

export class WebSocketService {
  protected static instance: WebSocketService;
  protected static _webSocket: Websocket;
  protected static _url = process.env.REACT_APP_SOCKET_URL!;
  protected static store: Storage;

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public static async connect() {
    return this.init()
      .catch((err:any) => console.log(err));
  }

  static init(): Promise<any> {
    return new Promise(
       (resolve: any, reject: any) => {
        this._webSocket = new WebsocketBuilder(this._url)
          .withBackoff(new LinearBackoff(0, 1000, 8000))
          .onOpen((i, ev) => {
              this.onOpen.bind(this)(i, ev);
              resolve();
          })
          .onClose(this.onClose)
          .onError((i, ev) => reject(this.onError.bind(this)(i, ev)))
          .onMessage((i, ev) => {
              this.parseMessage.bind(this)(ev);
          })
          .onRetry((i, ev) => this.onRetry.bind(this, i, ev))
          .build();
      }
    );
  }

  static onOpen(i: any, ev: any) {
    Storage.dispatch(setSocketStatus(SocketStatus.CONNECTED));
  }

  static onClose = (i: any, ev: any) => {
    Storage.dispatch(setSocketStatus(SocketStatus.DISCONNECTED));
    Storage.dispatch(setSocketBusy(false));
  };

  static onError(i: any, ev: any) {
    console.log(ev);
    Storage.dispatch(setSocketStatus(SocketStatus.DISCONNECTED));
    return ev;
  }

  static onRetry(i: any, ev: any) {
    Storage.dispatch(setSocketStatus(SocketStatus.NOT_CONNECTED));
  }

  static sendWSMessage(msg: any) {
    Storage.dispatch(setSocketBusy(true));
    this._webSocket.send(msg);
  }

  //todo fill case with contains for different responses
  static parseMessage(evt: { data: any; }) {
    const dividerIdx = evt.data.indexOf(':');
    const msgType: string = evt.data.slice(0, dividerIdx);

    const data: string = evt.data.slice(dividerIdx + 1).replaceAll(' ', '');

    switch (msgType) {
      case "new": {
        Storage.dispatch(setSocketBusy(false));
        break;
      }
      case "map": {
        Storage.dispatch(setMap(
          data
            .split('\n')
            .slice(1, -1)
            .map((row) => row.split(''))));
        break;
      }
      case "rotate": {
        break;
      }
      case "verify": {
        if(data !== 'Incorrect.'){
          const curLevel = Storage.getState().map.level;
          Storage.dispatch(setCurrentLevel(curLevel+1));
        }
        break;
      }
      default: {
          break;
      }
    }
  }

}
