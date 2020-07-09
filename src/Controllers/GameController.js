import WsGameEvent from "../API/WsGameEvent";
import API from "../API/API";
import APIRoom from "../API/APIRoom";
import WS from "../API/WS";
import APIGame from "../API/APIGame";

class GameController {
    static onReady;
    static onStart;

    static onUserSpeak;
    static onUserSelect; //Visual

    static onUserSpeakEnd;
    static onStartNight;

    static onRolePlay;
    static onRoleSelect; //Visual
    static onRoleSleep;

    static onUserChoose; //Visual

    static onStartDay;

    static onDiscSpeak;
    static onDiscSpeakEnd;

    static onVoting;
    static onKick;

    static onUserDiskSpeak;
    static onUserDiskSpeakEnd;

    static onDiscUsers;

    static CLASS = 'game';

    constructor(api) {
        this.API = api;
        this.step = -1;
        this.tour = -1;

        this.diskUsers = "";

        this.currentUserSelectId = 0;
        this.oldUserSelectId = 0;
    }

    Parse(message) {
        if (APIRoom.roomId !== message.room_id) return;
        if (message.class === "game")
        switch (message.event) {
            case WsGameEvent.READY:
                GameController.onUserReady(+message.data.user_id);
                break;
            case WsGameEvent.USER_SPEAK:
                this.tour = +message.data.tour;
                GameController.onUserSpeak(
                    +message.data.id,
                    +message.data.time,
                    +message.data.tour
                );
                break;
            case WsGameEvent.USER_SPEAK_END:
                GameController.onUserSpeakEnd(
                    +message.data.id
                );
                break;
            case WsGameEvent.START_NIGHT:
                this.tour = 0;
                GameController.onStartNight(
                    +message.data.time
                );
                break;
            case WsGameEvent.ROLE_PLAY:
                this.step = +message.data.step;
                GameController.onRolePlay(
                    +message.data.step,
                    +message.data.time
                );
                break;
            case WsGameEvent.ROLE_SLEEP:
                this.ResetSelection();
                this.step = +message.data.step;
                GameController.onRoleSleep(
                    +message.data.step,
                    +message.data.time
                );
                break;
            case WsGameEvent.START_DAY:
                this.step = -1;
                this.ResetSelection();
                GameController.onStartDay(
                    +message.data.time,
                    +message.data.kill_id,
                    message.data.win,
                    +message.data.rand_time
                );
                break;
            case WsGameEvent.DISC_SPEAK:
                this.tour = +message.data.tour;
                GameController.onDiscSpeak(
                    +message.data.id,
                    +message.data.tour,
                    +message.data.time
                );
                break;
            case WsGameEvent.DISC_SPEAK_END:
                this.tour++;
                GameController.onDiscSpeakEnd(
                   +message.data.id
                );
                break;
            case WsGameEvent.VOTING:
                GameController.onVoting(
                    +message.data.time
                );
                break;
            case WsGameEvent.KICK:
                GameController.onKick(
                    +message.data.kick_id,
                    message.data.win,
                    +message.data.time
                );
                break;
            case WsGameEvent.DISC_USERS:
                this.diskUsers = "";
                message.data.users.forEach((user) => {
                    this.diskUsers += user.id + ",";
                })
                GameController.onDiscUsers();
                break;
            case WsGameEvent.ROLE_SELECT:
                this.step = +message.data.step;
                GameController.onRoleSelect(
                    +message.data.from_id,
                    +message.data.to_id,
                    +message.data.old_id,
                    +message.data.step
                );
                break;
            case WsGameEvent.USER_SELECT:
                this.tour = +message.data.tour;
                GameController.onUserSelect(
                    +message.data.from_id,
                    +message.data.to_id,
                    +message.data.old_id,
                    +message.data.tour
                );
                break;
            case WsGameEvent.USER_CHOOSE:
                GameController.onUserChoose(
                    +message.data.from_id,
                    +message.data.to_id
                );
                break;
            default:
                break;
        }
    }

    SelectAction(userId) {
        if (this.step === -1) {
            this.UserSelect(userId);
        } else {
            this.RoleSelect(userId);
        }
    }

    RoleChoose(){
        this.API.Game.roleChoose(this.currentUserSelectId);
        this.ResetSelection();
    }
    RoleSelect(userId) {
        this.oldUserSelectId = this.currentUserSelectId;
        this.currentUserSelectId = userId;

        WS.sendEvent(APIRoom.roomId, GameController.CLASS, WsGameEvent.ROLE_SELECT, {
            from_id: API.userData.id,
            to_id: userId,
            old_id: this.oldUserSelectId,
            step: this.step
        });
        GameController.onRoleSelect(
            API.userData.id,
            userId,
            this.oldUserSelectId,
            this.step
        );
    }
    UserChoose() {
        this.API.Game.userChoose(this.currentUserSelectId);
        this.ResetSelection();
    }
    UserSelect(userId) {
        this.oldUserSelectId = this.currentUserSelectId;
        this.currentUserSelectId = userId;

        WS.sendEvent(APIRoom.roomId, GameController.CLASS, WsGameEvent.USER_SELECT, {
            from_id: API.userData.id,
            to_id: userId,
            old_id: this.oldUserSelectId,
            tour: this.tour
        });

        GameController.onUserSelect(
            API.userData.id,
            userId,
            this.oldUserSelectId,
            this.tour
        );
    }

    ResetSelection() {
        this.currentUserSelectId = 0;
        this.oldUserSelectId = 0;
    }

    DiscSpeakEnd() {
        this.API.Game.discSpeakEnd();
    }


    sendEvent(eventType, data) {
        WS.sendEvent(eventType, data);
    }
}

export default GameController;