import APIRoom from "./APIRoom";
import APIGame from "./APIGame";
import WS from "./WS";
import Bridge from '@vkontakte/vk-bridge';

import $ from "jquery";

class API {
    static userData = {id: 0};

    constructor() {
        this.room = new APIRoom();
        this.game = new APIGame();
    }

    get Room() {
        return this.room;
    }

    get Game() {
        return this.game;
    }

    initVkUserData() {
        return new Promise(function (resolve, reject) {
            Bridge.send("VKWebAppGetUserInfo", {})
                .then((data) => {
                    API.userData = data;
                    resolve();
                })
                .catch((data) => {
                    reject(data);
                });
        });
    }

    static Request(apiClass, method, data) {
        console.log("https://api.mtdl.ru/mafia/" + apiClass + "." + method);
        console.log(data);
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: "https://api.mtdl.ru/mafia/" + apiClass + "." + method,
                //url: "https://127.0.0.1:8000/" + apiClass + "." + method,
                type: "GET",
                data: data,
                success: function (resData) {
                    if (resData.status === "ok") resolve(resData);
                    else reject(resData);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
    }

    static GetTime() {
        return new Date().getTime();
    }

    static Debug(message) {
        console.log("[" + API.GetTime() + "] " + message);
    }

    static div(val, by){
        return (val - val % by) / by;
    }

    static RandomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

}

export default API;