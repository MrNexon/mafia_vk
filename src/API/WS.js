import API from "./API";
import APIRoom from "./APIRoom";


class WS {
    static socket = null;

    static onOpen = null;
    static onMessage = null;
    static onError = null;
    static onClose = null;

    static connected = false;

    static toBuffer = false;
    static readingBuffer = false;
    static messagesPull = [];
    static bufferIndex = 0;

    static PUBLIC_MODE = 0;

    static connect() {
        if (WS.connected) return 0;
        console.log("Connect to WebSocket server");
        WS.connected = true;
        
        let host = "wss://api.mtdl.ru/ws/mafia/?name="+ API.userData.first_name + "&id=" + API.userData.id;
        if (APIRoom.roomId !== null && APIRoom.token !== null) {
            host += "&room_id=" + APIRoom.roomId + "&token=" + APIRoom.token;
        }

        WS.socket = new WebSocket(host);
        this.setHandlers();
    }

    static disconnect() {
        WS.connected = false;
        if (WS.socket !== null) WS.socket.close();
    }

    static setHandlers() {
        if (WS.socket === null) return 0;

        WS.socket.onopen = this.onOpenEvent;
        WS.socket.onclose = (event) => WS.onCloseEvent(event);
        WS.socket.onerror = (error) => WS.onErrorEvent(error);
        WS.socket.onmessage = (event) => WS.onMessageEvent(event, false);
    }


    static onOpenEvent() {
        WS.connected = true;
        if (WS.onOpen !== null) WS.onOpen();
    }

    static onCloseEvent(event) {
        console.log("Web socket close connection");
        WS.connected = false;
        if (event.wasClean) return 0;
        if (WS.onClose !== null) WS.onClose(event);
        //this.connect();
    }

    static onMessageEvent(event) {
        let data = JSON.parse(event.data);
        if (this.toBuffer || this.readingBuffer) {
            WS.messagesPull.push(data);
        } else {
            if (WS.onMessage !== null) {
                WS.callEvent(data);
            }
        }
    }

    static callEvent(data) {
        if (WS.onMessage !== null) WS.onMessage(data);
    }

    static onErrorEvent(error) {
        console.error(error);
        WS.socket.onclose = null;
        WS.connected = false;
        WS.socket.close();
        if (WS.onError !== null) WS.onError(error);
        this.connect();
    }

    static readBuffer() {
        WS.readingBuffer = true;
        WS.toBuffer = false;
        while (WS.messagesPull.length > 0) {
            if (!this.toBuffer) {
                let event = WS.messagesPull[0];
                WS.callEvent(event);
                WS.messagesPull.splice(0, 1);
            }
            else {
                return;
            }
        }
        WS.readingBuffer = false;
    }

    static sendEvent(room_id, apiClass, eventType, data) {
        if (WS.socket === null) return;
        WS.socket.send(JSON.stringify({
            class: apiClass,
            event: eventType,
            data: data,
            room_id: room_id
        }));
    }
}

export default WS;
