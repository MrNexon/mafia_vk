import API from "./API";
import APIRoom from "./APIRoom";

class APIGame {
    static role = {
        alias: 'undefined'
    };
    static team = [];
    static teamCount = -1;
    static users = {};
    static usersCount = 0;


    static CLASS = 'game';

    constructor() {
        this.apiClass = "game";
    }

    start() {
        let dataSend = {
            'token': APIRoom.token
        };

        return API.Request(this.apiClass, "start", dataSend);
    }

    ready() {
        let dataSend = {
            'token': APIRoom.token,
            'id': API.userData.id
        };

        return API.Request(this.apiClass, "ready", dataSend);
    }

    userChoose(toId) {
        let dataSend = {
            'token': APIRoom.token,
            'from_id': API.userData.id,
            'to_id': toId
        };

        return API.Request(this.apiClass, "userChoose", dataSend);
    }

    userSpeakEnd() {
        let dataSend = {
            'token': APIRoom.token,
            'id': API.userData.id
        };

        return API.Request(this.apiClass, "speakEnd", dataSend);
    }

    discSpeakEnd() {
        let dataSend = {
            'token': APIRoom.token,
            'id': API.userData.id
        };

        return API.Request(this.apiClass, "discSpeakEnd", dataSend);
    }

    roleChoose(toId) {
        let dataSend = {
            'token': APIRoom.token,
            'from_id': API.userData.id,
            'to_id': toId
        };

        return API.Request(this.apiClass, "roleChoose", dataSend);
    }

    getRole(id) {
        let dataSend = {
            'token': APIRoom.token,
            'id': id
        };

        return new Promise(function (resolve, reject) {
            API.Request(APIGame.CLASS, "getRole", dataSend)
                .then((data) => {
                    APIGame.role = data.data.role_info;
                    APIGame.team = data.data.team;
                    APIGame.teamCount = APIGame.team.length;
                    resolve();
                })
                .catch((error) => reject(error));
        });
    }

    playerChoose(fromId, toId) {
        let dataSend = {
            'token': APIRoom.token,
            'from_id': fromId,
            'to_id': toId
        };

        return API.Request(this.apiClass, "playerChoose", dataSend);
    }
}

export default APIGame;