import React, {Component} from 'react';
import './GameRoom.css';
import {Howl, Howler} from 'howler';
import CenterPanel from "../../Layout/CenterPanel/CenterPanel";
import {Alert, Button, FixedLayout, Panel, Title} from "@vkontakte/vkui";
import Table from "../../Layout/Table/Table";
import GameStepCard from "../../Components/GameStepCard/GameStepCard";
import UserEntity from "../../Components/UserEntity/UserEntity";
import APIRoom from "../../API/APIRoom";
import WS from "../../API/WS";
import API from "../../API/API";
import GameController from "../../Controllers/GameController";
import APIGame from "../../API/APIGame";

let timerId;

class GameRoom extends Component {
    constructor(props) {
        super(props);

        this.API = props.api;
        this.GameController = new GameController(props.api);
        this.onTimerEnd = null;

        this.killedUser = false;
        this.citySleep = new Howl({
            src: ['https://mafia.mtdl.ru/voices/sity_sleep.ogg']
        });
        this.cityPlay = new Howl({
            src: ['https://mafia.mtdl.ru/voices/sity_play.ogg']
        });

        this.mafiaPlay = new Howl({
            src: ['https://mafia.mtdl.ru/voices/mafia_play.ogg']
        });
        this.mafiaSleep = new Howl({
            src: ['https://mafia.mtdl.ru/voices/mafia_sleep.ogg']
        });

        this.bossPlay = new Howl({
            src: ['https://mafia.mtdl.ru/voices/boss_play.ogg']
        });
        this.bossSleep = new Howl({
            src: ['https://mafia.mtdl.ru/voices/boss_sleep.ogg']
        });

        this.policePlay = new Howl({
            src: ['https://mafia.mtdl.ru/voices/police_play.ogg']
        });
        this.policeSleep = new Howl({
            src: ['https://mafia.mtdl.ru/voices/police_sleep.ogg']
        });

        this.doctorPlay = new Howl({
            src: ['https://mafia.mtdl.ru/voices/doctor_play.ogg']
        });
        this.doctorSleep = new Howl({
            src: ['https://mafia.mtdl.ru/voices/doctor_sleep.ogg']
        });

        this.mafiaWin = new Howl({
            src: ['https://mafia.mtdl.ru/voices/mafia_win.ogg']
        });
        this.usersWin = new Howl({
            src: ['https://mafia.mtdl.ru/voices/users_win.ogg']
        });

        this.onMessage = this.onMessage.bind(this);

        this.onUserReady = this.onUserReady.bind(this);
        this.onUserSpeak = this.onUserSpeak.bind(this);
        this.onUserSpeakEnd = this.onUserSpeakEnd.bind(this);
        this.onStartNight = this.onStartNight.bind(this);
        this.onRolePlay = this.onRolePlay.bind(this);
        this.onRoleSleep = this.onRoleSleep.bind(this);
        this.onStartDay = this.onStartDay.bind(this);
        this.onUserSelect = this.onUserSelect.bind(this);
        this.onRoleSelect = this.onRoleSelect.bind(this);
        this.onUserChoose = this.onUserChoose.bind(this);
        this.onDiscUsers = this.onDiscUsers.bind(this);
        this.onDiscUserSpeak = this.onDiscUserSpeak.bind(this);
        this.onDiscUserSpeakEnd = this.onDiscUserSpeakEnd.bind(this);
        this.onVoting = this.onVoting.bind(this);
        this.onKick = this.onKick.bind(this);

        this.RoleChoose = this.RoleChoose.bind(this);

        this.setGlobalHeader = this.setGlobalHeader.bind(this);
        this.setStepCardTitle = this.setStepCardTitle.bind(this);
        this.setStepCardTimer = this.setStepCardTimer.bind(this);
        this.setActionButtonTitle = this.setActionButtonTitle.bind(this);
        this.setActionButtonOnClick = this.setActionButtonOnClick.bind(this);
        this.setVisualUserSelectAction = this.setVisualUserSelectAction.bind(this);

        this.stepCardVisible = this.stepCardVisible.bind(this);
        this.actionButtonVisible = this.actionButtonVisible.bind(this);
        this.allowUserSelect = this.allowUserSelect.bind(this);
        this.showUserKeys = this.showUserKeys.bind(this);
        this.allowActionButton = this.allowActionButton.bind(this);
        this.showVoteUsers = this.showVoteUsers.bind(this);
        this.allowInterface = this.allowInterface.bind(this);

        this.resetGreenSelect = this.resetGreenSelect.bind(this);
        this.resetBlueSelect = this.resetBlueSelect.bind(this);
        this.resetRedSelect = this.resetRedSelect.bind(this);
        this.resetCounter = this.resetCounter.bind(this);

        this.resetAllSelect = this.resetAllSelect.bind(this);

        this.getUsers = this.getUsers.bind(this);
        this.setUsers = this.setUsers.bind(this);

        this.onVisualUserSelect = this.onVisualUserSelect.bind(this);

        this.loadUsers = this.loadUsers.bind(this);

        this.startTimer = this.startTimer.bind(this);
        this.timerTick = this.timerTick.bind(this);
        this.renderUserTable = this.renderUserTable.bind(this);

        this.actionButtonClick = this.actionButtonClick.bind(this);
        this.userEntityClick = this.userEntityClick.bind(this);

        this.state = {
            users: [],

            voting_show: false,
            global_header: 'Ожидаем игроков',

            step_card_timer: '00:00',
            step_card_hide: true,
            step_card_title: 'Этап',

            action_button_hide: true,
            action_button_title: 'Завершить',
            action_button_onclick: null,
            action_button_allow: false,

            ready_count: 0,

            allow_user_select: false,
            action_user_select: null
        };
    }

    componentDidMount() {
        WS.onMessage = this.onMessage;

        GameController.onUserReady = this.onUserReady;
        GameController.onUserSpeak = this.onUserSpeak;
        GameController.onUserSpeakEnd = this.onUserSpeakEnd;
        GameController.onStartNight = this.onStartNight;
        GameController.onRolePlay = this.onRolePlay;
        GameController.onRoleSleep = this.onRoleSleep;
        GameController.onStartDay = this.onStartDay;
        GameController.onRoleSelect = this.onRoleSelect;
        GameController.onUserSelect = this.onUserSelect;
        GameController.onUserChoose = this.onUserChoose;
        GameController.onDiscUsers = this.onDiscUsers;
        GameController.onDiscSpeak = this.onDiscUserSpeak;
        GameController.onDiscSpeakEnd = this.onDiscUserSpeakEnd;
        GameController.onVoting = this.onVoting;
        GameController.onKick = this.onKick;

        /*GameController.onUserSpeak = this.onUserSpeak;
        GameController.onUserSpeakEnd = this.onUserSpeakEnd;
        GameController.onStartNight = this.onStartNight;
        GameController.onRolePlay = this.onRolePlay;
        GameController.onRoleSleep = this.onRoleSleep;
        GameController.onRoleSelect = this.onRoleSelect;
        GameController.onRoleChoose = this.onRoleChoose;
        GameController.onStartDay = this.onStartDay;
        GameController.onUserSelect = this.onUserSelect;
        GameController.onUserChoose = this.onUserChoose;
        GameController.onDiscussion = this.onDiscussion;
        GameController.onUserDiscSpeak = this.onUserDiscSpeak;
        GameController.onUserDiscSpeakEnd = this.onUserDiscSpeakEnd;
        GameController.onVoting = this.onVoting;
        GameController.onUserKick = this.onUserKick;
        GameController.onUserKickEnd = this.onUserKickEnd;*/

        this.loadUsers();
        this.API.Game.ready();
    }

    onMessage(message) {
        this.GameController.Parse(message);
    }

    onUserReady(userId) {
        let readyCount = 0;

        this.setUsers(
            this.getUsers().map((user) => {
                if (user.id === userId) user['enabled'] = true;
                if (user['enabled']) readyCount++;
                return user;
            })
        );
    } //Юзер нажал кнопку готов
    onUserSpeak(userId, speakTime, tour) {
        if (userId === API.userData.id) {
            this.setGlobalHeader("Ваш ход");
            this.setActionButtonTitle("Завершить");
            this.actionButtonVisible(true);
            this.allowActionButton(true);
            this.setVisualUserSelectAction(() => {
                this.setActionButtonTitle("Выставить и завершить");
            })
            this.setActionButtonOnClick(() => {
                this.GameController.UserChoose();
            });
            if (tour > -1) this.allowUserSelect(true);
        } else {
            this.actionButtonVisible(false);
        }

        this.setUsers(
            this.getUsers().map((user) => {
                if (userId === user.id && userId !== API.userData.id) this.setGlobalHeader("Говорит " + user.name);
                user['blue_select'] = (userId === user.id);
                return user;
            })
        );
        this.setStepCardTitle("Обсуждение");
        this.startTimer(speakTime);
    } //Юзер начал говорить
    onUserSpeakEnd(userId) {
        this.resetGreenSelect();
        this.resetRedSelect(false);
        this.resetBlueSelect();

        this.allowInterface(false);
    } //Юзер закончил говорить
    onUserChoose(fromId, toId) {
        this.setUsers(
            this.getUsers().map((user) => {
                if (user.id === toId) {
                    user['voting'] = true;
                }
                return user;
            })
        )
    } //Юзер выбрал пользователя
    onUserSelect(fromId, toId, oldId, tour) {
        switch (tour) {
            case 0:
                this.setUsers(
                    this.getUsers().map((user) => {
                        if (user.id === oldId) user['red_select'] = false;
                        if (user.id === toId) user['red_select'] = true;
                        return user;
                    })
                );
                break;
            case 2:
            case 4:
                this.setUsers(
                    this.getUsers().map((user) => {
                        user['show_counter'] = true;
                        if (user.id === oldId && user['select_count'] > 0) user['select_count']--;
                        if (user.id === toId) user['select_count']++;
                        return user;
                    })
                );
        }
    } //Юзер выделил пользователя

    onStartNight(time) {
        this.showVoteUsers(false);
        this.setGlobalHeader("Город засыпает");
        this.setStepCardTitle("Наступает ночь");
        this.actionButtonVisible(false);
        this.allowUserSelect(false);
        this.resetAllSelect();
        this.resetCounter();

        WS.toBuffer = true;
        this.onTimerEnd = () => {
            this.onTimerEnd = null;
            WS.readBuffer();
        }
        this.citySleep.play();
        this.startTimer(time);
    } //Начало ночи

    onRolePlay(step, time) {
        if (APIGame.role.step !== "-1" && APIGame.role.step.indexOf(step) !== -1 && !this.killedUser) {
            this.setGlobalHeader("Ваш ход");
            this.allowInterface(true);
            this.allowActionButton(false);
            this.showUserKeys(true);
            switch (+step) {
                case 0:
                    this.setActionButtonTitle("Убить");
                    this.setActionButtonOnClick(() => this.RoleChoose());
                    this.setVisualUserSelectAction(null);
                    break;
                case 3:
                    this.setActionButtonTitle("Вылечить");
                    this.setVisualUserSelectAction(() => this.allowActionButton(true));
                    this.setActionButtonOnClick(() => this.RoleChoose());
                    break;
                case 2:
                    this.setActionButtonTitle("Проверить");
                    this.setVisualUserSelectAction(() => this.allowActionButton(true));
                    this.setActionButtonOnClick(() => {
                        this.getUsers().forEach((user)=> {
                            if (user.id === this.GameController.currentUserSelectId) {
                                let alertText = user.name;
                                if (user.role.indexOf("mafia") > -1 || user.role.indexOf("boss") > -1) {
                                    alertText += " мафия";
                                } else {
                                    alertText += " мирный";
                                }

                                this.props.popout(<Alert
                                    actions={[{
                                        title: 'Ок',
                                        autoclose: true,
                                        mode: 'cancel'
                                    }]}
                                    onClose={() => this.props.popout(null)}
                                >
                                    <p>{alertText}</p>
                                </Alert>);
                            }
                        });

                        this.RoleChoose();
                    });
                    break;
                case 1:
                    this.setActionButtonTitle("Проверить");
                    this.setVisualUserSelectAction(() => this.allowActionButton(true));
                    this.setActionButtonOnClick(() => {
                        this.getUsers().forEach((user)=> {
                            if (user.id === this.GameController.currentUserSelectId) {
                                let alertText = user.name;
                                if (user.role.indexOf("police") > -1) {
                                    alertText += " комиссар";
                                } else {
                                    alertText += " мирный";
                                }

                                this.props.popout(<Alert
                                    actions={[{
                                        title: 'Ок',
                                        autoclose: true,
                                        mode: 'cancel'
                                    }]}
                                    onClose={() => this.props.popout(null)}
                                >
                                    <p>{alertText}</p>
                                </Alert>);
                            }
                        });

                        this.RoleChoose();
                    });
                    break;
                default:
                    console.log("ok))");
                    break;
            }
        } else {
            this.setGlobalHeader("Ночь");
        }

        switch (+step) {
            case 0:
                this.setStepCardTitle("Ход Мафии");
                this.mafiaPlay.play();
                break;
            case 1:
                this.setStepCardTitle("Ход Дона");
                this.bossPlay.play();
                break;
            case 2:
                this.setStepCardTitle("Ход Комиссара");
                this.policePlay.play();
                break;
            case 3:
                this.setStepCardTitle("Ход Доктора");
                this.doctorPlay.play();
                break;
            default:
                break;
        }

        if (this.killedUser && +step !== 0) {
            let times = API.RandomInteger(4, 10) * 1000;
            setTimeout(() => this.RoleChoose(), times);
        }

        this.startTimer(time);
    } //Начало игры ночной роли
    onRoleSleep(step, time) {
        WS.toBuffer = true;
        this.onTimerEnd = () => WS.readBuffer();

        if (APIGame.role.step.indexOf(step) !== -1) {
            this.setGlobalHeader("Ход завершен");
            this.allowInterface(false);
            this.resetAllSelect();
            this.resetCounter();
        } else {
            this.setGlobalHeader("Ночь");
        }

        switch (+step) {
            case 0:
                this.setStepCardTitle("Мафия засыпает");
                this.mafiaSleep.play();
                break;
            case 1:
                this.setStepCardTitle("Дон засыпает");
                this.bossSleep.play();
                break;
            case 2:
                this.setStepCardTitle("Комиссар засыпает");
                this.policeSleep.play();
                break;
            case 3:
                this.setStepCardTitle("Доктор засыпает");
                this.doctorSleep.play();
                break;
            default:
                break;
        }

        this.startTimer(time);
    } //Завершение игры ночной роли
    onRoleSelect(fromId, toId, oldId, step) {
        if (APIGame.role.step.indexOf(step) !== -1) {
            this.setUsers(
                this.getUsers().map((user) => {
                    if (typeof user['select_count'] === 'undefined') user['select_count'] = 0;
                    user['show_counter'] = APIGame.teamCount > 1 && step === 0;

                    if (user.id === toId) {
                        user['select_count']++;
                    }
                    if (user.id === oldId) {
                        user['select_count']--;
                    }

                    if (step === 0) {
                        if (user.id === toId && user['select_count'] === APIGame.teamCount) {
                            this.allowActionButton(true);
                        } else if (user.id === toId && user['select_count'] !== APIGame.teamCount) {
                            this.allowActionButton(false);
                        }
                    }

                    return user;
                })
            );
        }
    }
    RoleChoose() {
        this.GameController.RoleChoose();
    }

    onStartDay(time, killId, win, randTime) {
        WS.toBuffer = true;
        this.setGlobalHeader("Наступает день");
        this.setStepCardTitle("Город просыпается");
        this.onTimerEnd = () => {
            this.setUsers(
                this.getUsers().map((user) => {
                    if (user.id === killId) {
                        user.killed = true;
                        if (user.id === API.userData.id) this.killedUser = true;
                        if ((user['role'] === 'mafia' || user['role'] === 'boss') && (APIGame.role.name === 'mafia' || APIGame.role.name === 'boss')) {
                            APIGame.teamCount--;
                        }
                    }
                    return user;
                })
            );
            this.onTimerEnd = null;
            WS.readBuffer();
        }
        if (win !== 'undefined') {
            this.onWin(win);
        } else {
            this.cityPlay.play();
        }
        this.startTimer(time);
    } //Начало дня

    onDiscUsers() {
        this.showVoteUsers(true);
    }

    onDiscUserSpeak(id, tour, time) {
        this.resetAllSelect();
        this.resetCounter();
        if (id === API.userData.id) {
            this.setGlobalHeader("Ваша речь");
            this.setActionButtonTitle("Завершить");
            this.actionButtonVisible(true);
            this.allowActionButton(true);
            this.setActionButtonOnClick(() => {
                this.GameController.DiscSpeakEnd();
            });

        } else {
            this.actionButtonVisible(false);
        }

        this.setUsers(
            this.getUsers().map((user) => {
                if (id === user.id && id !== API.userData.id) this.setGlobalHeader("Говорит " + user.name);
                user['blue_select'] = (id === user.id);
                return user;
            })
        );

        this.setStepCardTitle("Обсуждение | Тур: " + (tour === 1 ? 1 : 2));
        this.startTimer(time);
    }
    onDiscUserSpeakEnd(id) {
        this.resetBlueSelect();
        this.resetGreenSelect();
        this.resetRedSelect(false);
        this.allowInterface(false);
    }

    onVoting(time) {
        this.resetAllSelect();
        this.setGlobalHeader("Голосование");
        this.setActionButtonTitle("Завершить");
        this.allowUserSelect(true);
        this.actionButtonVisible(true);
        this.allowActionButton(false);
        this.setVisualUserSelectAction(() => this.allowActionButton(true));
        this.setActionButtonOnClick(() => {
            this.GameController.UserChoose();
        });

        this.setStepCardTitle("Голосование");
        this.startTimer(time);
    }

    onKick(kickId, win, time) {
        WS.toBuffer = true;
        /*this.onTimerEnd = () => {

        }*/
        if (win !== 'undefined') {
            this.onWin(win);
        }

        this.setUsers(
            this.getUsers().map((user) => {
                if (user.id === kickId) {
                    user.killed = true;
                    if (user.id === API.userData.id) this.killedUser = true;
                    if ((user['role'] === 'mafia' || user['role'] === 'boss') && (APIGame.role.name === 'mafia' || APIGame.role.name === 'boss')) {
                        APIGame.teamCount--;
                    }
                }
                return user;
            })
        );
        //this.onTimerEnd = null;
        WS.readBuffer();

       // this.startTimer(5);
    }

    /* onUserSelect(fromId, toId, oldId, step) {

        if (step === 0) {
            this.setUsers(
                this.getUsers().map((user) => {
                    if (user.id === oldId) user['partner_select'] = false;
                    if (user.id === toId) user['partner_select'] = true;
                    return user;
                })
            );
        } else if (step === 1) {
            this.setVoteUsers(
                this.getVoteUsers().map((user) => {
                    user['show_counter'] = true;
                    if (user.id === oldId) user['select_count']--;
                    if (user.id === toId) user['select_count']++;
                    return user;
                })
            );
        }
    }
    onUserChoose(fromId, toId) {
        let chooseUser = null;
        this.getUsers().forEach((user) => {
            if (user.id === toId) {
                user['partner_select'] = false;
                chooseUser = user;
                if (this.GameController.discStep === 0) user['voting'] = true;
                console.log("Voting: " + user['voting']);
                return null;
            }
        });

        if (this.GameController.discStep === 0) {
            this.HostController.addDissUser(chooseUser);
        } else if (this.GameController.discStep === 1) {
            this.HostController.setVotesCount(chooseUser);
        }
    }

    onDiscussion(users) {
        this.setUsers(
            this.getUsers().map((user) => {
                user['user_select'] = false;
                user['partner_select'] = false;
                user['user_choose'] = false;
                user['voting'] = false;
                return user;
            })
        );

        let voteUsers = [];
        this.getUsers().forEach((user) => {
            if (users.indexOf(user.id) !== -1) voteUsers.push(user);
        });

        this.setVoteUsers(voteUsers);
        this.showVoteUsers(true);

        this.HostController.StartDisc();
    }
    onUserDiscSpeak(userId, speakTime, discStep) {
        if (userId === API.userData.id) {
            this.setGlobalHeader("Ваш ход");
            this.setActionButtonTitle("Завершить");
            this.actionButtonVisible(true);
            this.allowActionButton(true);
            this.setActionButtonOnClick(() => {
                this.GameController.UserDiscSpeakEnd();
            });
        } else this.actionButtonVisible(false);

        this.setVoteUsers(
            this.getVoteUsers().map((user) => {
                if (userId === user.id && userId !== API.userData.id) this.setGlobalHeader("Говорит " + user.name);
                user['user_select'] = (userId === user.id);
                return user;
            })
        );
        this.setStepCardTitle("Оправдательные речи");
        this.startTimer(speakTime);
    }
    onUserDiscSpeakEnd() {
        this.setVoteUsers(
            this.getVoteUsers().map((user) => {
                user['partner_select'] = false;
                user['user_choose'] = false;
                user['user_select'] = false;
                return user;
            })
        );

        this.HostController.NextUserDiscSpeak();
    }

    onVoting(voteTime) {
        this.setStepCardTitle("Голосование");
        this.setGlobalHeader("Кто покинет город");
        this.actionButtonVisible(true);
        this.allowActionButton(false);
        this.allowUserSelect(true);
        this.setActionButtonTitle("Проголосовать");
        this.setActionButtonOnClick(() => {
            this.GameController.UserChoose();
        });
        this.startTimer(voteTime);
    }
    onUserKick(userId, time) {
        let exist = false;

        this.setUsers(
            this.getUsers().map((user) => {
                user['user_select'] = false;
                user['partner_select'] = false;
                user['show_counter'] = false;
                user['select_count'] = 0;
                user['user_choose'] = false;

                if (user.id === userId) {
                    user['user_select'] = true;
                    exist = true;
                    user['killed'] = true;
                    GameController.LifePlayers--;
                    this.setGlobalHeader("Говорит " + user.name);
                }
                return user;
            })
        );

        this.showVoteUsers(false);
        this.setVoteUsers([]);

        if (!exist) {
            this.HostController.StartNight();
        } else if (userId === API.userData.id) {
            this.setGlobalHeader("Ваш ход");
            this.setActionButtonTitle("Завершить");
            this.allowActionButton(true);
            this.actionButtonVisible(true);
            this.setActionButtonOnClick(() => {
                this.GameController.UserKickEnd();
            });
            this.killedUser = true;
        }

        this.setStepCardTitle("Последнее слово");
        this.startTimer(time);
    }
    onUserKickEnd() {
        this.setUsers(
            this.getUsers().map((user) => {
                user['user_select'] = false;
                user['partner_select'] = false;
                user['show_counter'] = false;
                user['select_count'] = 0;
                user['user_choose'] = false;
                return user;
            })
        );

        this.HostController.StartNight();
    }*/

    setGlobalHeader(text) {
        this.setState({
            global_header: text
        });
    }
    setStepCardTitle(text) {
        this.setState({
            step_card_title: text
        });
    }
    setStepCardTimer(text) {
        this.setState({
            step_card_timer: text
        });
    }
    setActionButtonTitle(text) {
        this.setState({
            action_button_title: text
        });
    }
    setActionButtonOnClick(action) {
        this.setState({
            action_button_onclick: action
        });
    }
    setVisualUserSelectAction(action) {
        this.setState({
            action_user_select: action
        });
    }

    stepCardVisible(visible) {
        this.setState({
            step_card_hide: !visible
        });
    }
    actionButtonVisible(visible) {
        if (visible && this.killedUser) return;
        this.setState({
            action_button_hide: !visible
        });
    }
    allowUserSelect(b) {
        if (b && this.killedUser) return;
        this.setState({
            allow_user_select: b
        });
    }
    showUserKeys(b) {
        this.setUsers(
            this.getUsers().map((user) => {
                user['show_key'] = b === true;
                return user;
            })
        );
    }
    allowActionButton(b) {
        if (b && this.killedUser) return;
        this.setState({
            action_button_allow: b
        });
    }
    showVoteUsers(b) {
        this.setState({
            voting_show: b
        });
    }
    allowInterface(b) {
        this.actionButtonVisible(b);
        this.allowUserSelect(b);
    }

    resetGreenSelect() {
        this.getUsers().forEach((user) => {
            user['green_select'] = false;
        });
    }
    resetBlueSelect() {
        this.getUsers().forEach((user) => {
            user['blue_select'] = false;
        });
    }
    resetRedSelect(all) {
        this.getUsers().forEach((user) => {
            user['red_select'] = false;
            if (all) user['voting'] = false;
        });
    }
    resetCounter() {
        this.setUsers(
            this.getUsers().map((user) => {
                user['select_count'] = 0;
                return user;
            })
        );
    }
    resetAllSelect() {
        this.getUsers().forEach((user) => {
            user['green_select'] = false;
            user['red_select'] = false;
            user['voting'] = false;
            user['blue_select'] = false;
            user['show_counter'] = false;
        });
    }

    getUsers() {
        return this.state.users;
    }
    setUsers(users) {
        this.setState({
            users: users
        });
    }
    onVisualUserSelect() {
        if (this.state.action_user_select !== null) this.state.action_user_select();
        this.setVisualUserSelectAction(null);
    }

    loadUsers() {
        WS.toBuffer = true;
        this.API.Room.getUsers()
            .then((data) => {
                this.setUsers(data.data.users);
                WS.readBuffer();
            })
            .catch((data) => {
                console.log(data);
                this.props.showError(data);
            });

    }

    actionButtonClick() {
        this.showUserKeys(false);
        this.allowInterface(false);
        this.resetGreenSelect();
        this.state.action_button_onclick();
    }
    userEntityClick(userId) {
        if (!this.state.allow_user_select) return;
        let block = false;

        this.getUsers().forEach((user) => {
            if (user.id === userId) {
                if (user['killed'] || user['voting']) block = true;
                if (this.GameController.step === -1 && this.GameController.tour < 2 && this.GameController.step !== 0) {
                    if (user.id === API.userData.id) block = true;
                }

                if (!block) {
                    this.resetGreenSelect();
                    user['green_select'] = true;
                }
            }
        })

        if (block) return;

        this.onVisualUserSelect();
        this.GameController.SelectAction(userId);
    }

    startTimer(seconds) {
        this.stepCardVisible(true);
        clearTimeout(timerId);
        this.timerTick(API.GetTime() + (seconds * 1000));
    }
    timerTick(fuTime) {
        let lastSeconds = (Math.round((fuTime - API.GetTime()) / 1000));
        if (lastSeconds >= 0) timerId = setTimeout(this.timerTick, 200, fuTime);
        else {
            if (this.onTimerEnd !== null) this.onTimerEnd();
        }

        let timerText;

        let minutes = API.div(lastSeconds, 60);
        let seconds = lastSeconds - (minutes * 60);

        if (minutes > 9) timerText = "" + minutes + ":";
        else timerText = "0" + minutes + ":";

        if (seconds > 9) timerText += ""  + seconds;
        else timerText += "0" + (seconds < 0 ? 0 : seconds);

        this.setStepCardTimer(timerText);
    }

    renderUserTable() {
        let content = [];
        let users = this.state.users;
        let usersCount = APIRoom.usersCount;
        for (let i = 0; i < usersCount; i++) {
            if (typeof users[i] !== 'undefined'){
                if (this.GameController.diskUsers.indexOf(users[i].id.toString()) === -1 && this.state.voting_show) {
                    continue;
                }
                content.push(<UserEntity
                    onClick={() => this.userEntityClick(users[i].id)}
                    avatar={users[i].avatar}
                    name={users[i].name}
                    id={users[i].id}
                    blue_select={users[i].blue_select}
                    red_select={users[i].red_select || users[i]['voting']}
                    green_select={users[i].green_select}
                    killed={users[i].killed}
                    disable={!users[i].enabled}
                    select_count={users[i].select_count}
                    show_counter={users[i].show_counter}
                    key={i}
                    key_index={i}
                    show_key={users[i].show_key === true}
                />);
            } else content.push(<UserEntity name="Загрузка" mode="wait"/>);
        }

        return content;
    }

    onWin(b) {
        this.props.popout(<Alert
            actions={[{
                title: 'Ок',
                autoclose: true,
                mode: 'cancel'
            }]}
            onClose={() => {
                this.props.popout(null);
            }}
        >
            <p>{b === "black" ? "Мафия победила" : "Мирный город победил"}</p>
        </Alert>);

        if (b === "black") {
            this.mafiaWin.play();
        } else {
            this.usersWin.play();
        }

        this.props.action_exit();
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <CenterPanel>
                    <div>
                        <Title level="1" weight="bold" className="global-step__title">{this.state.global_header}</Title>
                        <GameStepCard step={this.state.step_card_title} timer={this.state.step_card_timer} hide={this.state.step_card_hide}/>
                        <Table>
                            {this.renderUserTable()}

                            {/*<UserEntity avatar="https://sun9-59.userapi.com/c857632/v857632003/1fbdd8/yhbd9ERGeVk.jpg?ava=1" name="Илья" id="1" user_select={true}/>
                            <UserEntity avatar="https://sun9-59.userapi.com/c857632/v857632003/1fbdd8/yhbd9ERGeVk.jpg?ava=1" name="Илья" id="1" user_select={true}/>
                            <UserEntity avatar="https://sun9-59.userapi.com/c857632/v857632003/1fbdd8/yhbd9ERGeVk.jpg?ava=1" name="Илья" id="2" killed={true}/>
                            <UserEntity avatar="https://sun9-59.userapi.com/c857632/v857632003/1fbdd8/yhbd9ERGeVk.jpg?ava=1" name="Илья" id="3" disable={true}/>
                            <UserEntity avatar="https://sun9-59.userapi.com/c857632/v857632003/1fbdd8/yhbd9ERGeVk.jpg?ava=1" name="Илья" id="4" select_count="5"/>
                            <UserEntity avatar="https://sun9-59.userapi.com/c857632/v857632003/1fbdd8/yhbd9ERGeVk.jpg?ava=1" name="Илья" id="4" user_select={true} select_count="2"/>
                            <UserEntity name="Пусто" mode="wait"/>
                            <UserEntity mode="add"/>*/}
                        </Table>
                    </div>
                </CenterPanel>

                <FixedLayout vertical="bottom" className="logo__footer">
                    <Button size="l" onClick={this.actionButtonClick} disabled={!this.state.action_button_allow} className={"control__button control__primary game__action " + (this.state.action_button_hide ? 'hide' : '')}>{this.state.action_button_title}</Button>
                </FixedLayout>
            </Panel>
        );
    }
}

export default GameRoom;