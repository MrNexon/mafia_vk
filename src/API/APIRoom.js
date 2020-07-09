import API from "./API";

class APIRoom {
    static roomId = null;
    static token = null;

    static isHost = false;

    static CLASS = 'room';

    constructor() {
        this.apiClass = "room";
    }

    getList() {
        return API.Request(this.apiClass, "getList", {});
    }

    create(usersCount, publish) {
        let dataSend = {
            'users_count': usersCount,
            'publish': publish
        };

        return new Promise(function (resolve, reject) {
            API.Request(APIRoom.CLASS, "create", dataSend)
                .then((data) => {
                    APIRoom.isHost = true;
                    APIRoom.roomId = data.data.room_id;
                    APIRoom.token = data.data.token;
                    resolve(data);
                })
                .catch((error) => reject(error));
        });

    }

    connect(roomId, roomPos) {
        let dataSend = {
            'room_id': roomId,
            'id': API.userData.id,
            'name': API.userData.first_name,
            'avatar': API.userData.photo_100,
            'room_pos': roomPos
        };

        return new Promise(function (resolve, reject) {
            API.Request(APIRoom.CLASS, "connect", dataSend)
                .then((data) => {
                    APIRoom.roomId = data.data.room_id;
                    APIRoom.token = data.data.token;
                    APIRoom.usersCount = data.data.users_count;
                    resolve();
                })
                .catch((error) => reject(error));
        });
    }

    disconnect() {
        let dataSend = {
            'room_id': APIRoom.roomId,
            'token': APIRoom.token,
            'id': API.userData.id
        };

        APIRoom.roomId = null;
        APIRoom.token = null;
        APIRoom.isHost = false;
        APIRoom.usersCount = -1;

        return API.Request(this.apiClass, "disconnect", dataSend);
    }


    get() {
        let dataSend = {
            'room_id': APIRoom.roomId,
            'token': APIRoom.token
        };

        return API.Request(this.apiClass, "get", dataSend);
    }

    getUsers() {
        let dataSend = {
            'room_id': APIRoom.roomId,
            'token': APIRoom.token
        };

        return new Promise(function (resolve, reject) {
            API.Request(APIRoom.CLASS, "getUsers", dataSend)
                .then((data) => {
                    APIRoom.users = data.data.users
                    resolve(data);
                })
                .catch((error) => reject(error));
        });
    }

    getSettings() {
        let dataSend = {
            'room_id': APIRoom.roomId,
            'token': APIRoom.token
        };

        return new Promise(function (resolve, reject) {
            API.Request(APIRoom.CLASS, "getSettings", dataSend)
                .then((data) => {
                    APIRoom.settings = data.data.settings;
                    /*APIRoom.settings.steps.forEach((step) => {
                        let count = 0;

                        APIRoom.settings.roles.forEach((role) => {
                            console.log(role);
                            console.log(count);
                            if (role.step.indexOf(step) > -1) count++
                        });

                        APIRoom.rolesCount.push({
                            step: step,
                            count: count
                        });
                    });
*/
                    resolve();
                })
                .catch((error) => reject(error));
        });
    }

    parseSettings() {
        APIRoom.settings.steps.forEach((step) => {
            let count = 0;
            let roleName = "";

            APIRoom.settings.roles.forEach((role) => {
                if (role.step.indexOf(step) > -1) {
                    count++;
                    roleName = role.name;
                }
            });

            APIRoom.rolesCount.push({
                name: roleName,
                step: +step,
                count: count
            });
        });
    }
}

export default APIRoom;