import APIRoom from "../API/APIRoom";
import WsGameEvent from "../API/WsGameEvent";
import GameController from "./GameController";

class HostController {
    constructor(ws, api) {
        this.WS = ws;
        this.API = api;

        this.speak = {
            index: 0,
            offset: 0
        };

        this.firstCircle = true;
        this.timerEnd = null;
        this.roleStep = {
            index: -1,
            oldStep: -1
        }

        this.blockRolesEvents = false;

        this.dissUsers = [];
        this.discIndex = 0;
        this.dissStep = -1;

        this.voteUsersCounters = [];
    }

    Parse(message) {

    }

    StartGame(readyCount) {
        if (!APIRoom.isHost) return;
        if (readyCount === APIRoom.usersCount) this.StartSpeak();
    }

    StartSpeak() {
        if (!APIRoom.isHost) return;
        this.speak.index = 0;
        this.timerEnd = this.UserSpeakEnd;

        this.UserSpeak();
    }
    UserSpeak() {
        if (!APIRoom.isHost) return;
        if (this.speak.offset === APIRoom.usersCount) this.speak.offset = 0;

        let currentIndex = (this.speak.offset + this.speak.index);
        if (currentIndex >= APIRoom.usersCount) currentIndex = (this.speak.index + this.speak.offset) - APIRoom.usersCount;

        let userId = APIRoom.users[currentIndex].id;
        this.sendEvent(WsGameEvent.USER_SPEAK, {
            user_id: userId,
            time: 60,
            diss_step: this.dissStep
        });
    }
    UserSpeakEnd() {
        if (!APIRoom.isHost) return;
        this.sendEvent(WsGameEvent.USER_SPEAK_END, null);
    }
    NextUserSpeak() {
        if (!APIRoom.isHost) return;
        this.speak.index++;

        if (this.speak.index >= APIRoom.usersCount){
            this.speak.index = 0;
            if (this.firstCircle) {
                this.StartNight();
            } else {
                this.SendUsersDisc();
            }
        }
        else {
            this.UserSpeak();
        }
    }

    StartNight() {
        if (!APIRoom.isHost) return;
        this.firstCircle = false;
        this.speak.offset++;
        this.dissStep = 0;
        this.timerEnd = this.RolePlay;

        this.sendEvent(WsGameEvent.START_NIGHT, {
            time: 3
        });
    }

    RolePlay() {
        if (!APIRoom.isHost) return;
        this.blockRolesEvents = false;
        if (this.roleStep.index + 1 >= APIRoom.settings.steps.length) {
            this.StartDay();
            this.timerEnd = null;
            return;
        }

        this.roleStep.index++;
        let currentStep = APIRoom.settings.steps[this.roleStep.index];
        this.timerEnd = this.RoleSleep;

        this.sendEvent(WsGameEvent.ROLE_PLAY, {
            step: currentStep,
            time: 30
        });
    }
    RoleSleep() {
        if (!APIRoom.isHost) return;
        this.timerEnd = this.RolePlay;
        this.sendEvent(WsGameEvent.ROLE_SLEEP, {
            step: APIRoom.settings.steps[this.roleStep.index],
            time: 3,
            host: true
        });
    }
    onRoleSleep() {
        if (!APIRoom.isHost) return;
        this.timerEnd = this.RolePlay;
    }
    RoleChoose() {
        let hsThis = this;

        return new Promise(function (resolve) {
            if (!APIRoom.isHost) return;
            if (hsThis.blockRolesEvents) return;
            hsThis.blockRolesEvents = true;

            hsThis.RoleSleep();
            resolve();
        });
    }

    StartDay() {
        if (!APIRoom.isHost) return;
        this.roleStep = {
            index: -1,
            oldStep: -1
        }
        this.sendEvent(WsGameEvent.START_DAY, {
            time: 3
        });
    }

    NightData(killId, win) {
        if (!APIRoom.isHost) return;
        this.sendEvent(WsGameEvent.NIGHT_DATA, {
            kill_id: killId,
            win: win
        });
    }
    SendUsersDisc() {
        if (this.dissUsers.length < 1) {
            this.StartNight();
        } else {
            this.sendEvent(WsGameEvent.DISCUSSION, {
                users: this.dissUsers
            });
        }
    }

    StartDisc() {
        if (!APIRoom.isHost) return;
        this.discIndex = 0;
        this.timerEnd = this.UserDiscSpeakEnd;

        this.UserDiscSpeak();
    }
    UserDiscSpeak() {
        this.sendEvent(WsGameEvent.USER_DISC_SPEAK, {
           user_id: this.dissUsers[this.discIndex],
           time: 30,
           disc_step: this.dissStep
        });
    }
    UserDiscSpeakEnd() {
        if (!APIRoom.isHost) return;
        this.sendEvent(WsGameEvent.USER_DISK_SPEAK_END, null);
    }
    NextUserDiscSpeak() {
        if (!APIRoom.isHost) return;
        this.discIndex++;

        if (this.discIndex >= this.dissUsers.length){
            this.discIndex = 0;
            this.VoteStart();
        }
        else {
            this.UserDiscSpeak();
        }
    }
    VoteStart() {
        if (!APIRoom.isHost) return;
        this.dissStep = 1;
        this.timerEnd = this.KickUser;
        this.sendEvent(WsGameEvent.VOTING, {
            time: 120,
            disc_step: this.dissStep
        });
    }

    addDissUser(user) {
        if (!APIRoom.isHost) return;
        if (user !== null) {
            let exist = false;
            this.dissUsers.forEach((discUser) =>  {
                if (discUser === user.id) {
                    exist = true;
                }
            });

            if (!exist)
                this.dissUsers.push(user.id);
        }


    }

    setVotesCount(chooseUser) {
        if (!APIRoom.isHost) return;
        if (chooseUser === null) return;
        let exist = false;
        let votesCount = 0;

        this.voteUsersCounters = this.voteUsersCounters.map((user) => {
            if (user.id === chooseUser.id) {
                user.count++;
                exist = true;
            }
            votesCount += user.count;

            return user;
        });

        if (!exist) {
            this.voteUsersCounters.push({
                id: chooseUser.id,
                count: 1
            });
            votesCount++;
        }
        console.log(votesCount);
        console.log(GameController.LifePlayers);

        if (votesCount === GameController.LifePlayers) this.KickUser();

    }

    KickUser() {
        if (!APIRoom.isHost) return;
        let maxUser = {
            id: -1,
            count: 0
        };
        let repeated = false;

        this.voteUsersCounters.forEach((user) => {
            if (user.count === maxUser.count) {
                repeated = true;
            }

            if (user.count > maxUser.count) {
                maxUser = user;
                repeated = false;
            }
        });

        this.sendEvent(WsGameEvent.USER_KICK, {
            id: repeated ? 0 : maxUser.id,
            time: 30
        });

        this.timerEnd = this.UserKickEnd;
        this.blockRolesEvents = false;

        this.dissUsers = [];
        this.discIndex = 0;
        this.dissStep = -1;

        this.voteUsersCounters = [];
    }

    UserKickEnd() {
        if (!APIRoom.isHost) return;
        this.sendEvent(WsGameEvent.USER_KICK_END, null);
    }

    TimerEnd() {
        if (!APIRoom.isHost) return;
        if (typeof this.timerEnd === 'function') this.timerEnd();
    }

    sendEvent(eventType, data) {
        this.WS.sendEvent(eventType, data);
    }
}

export default HostController;