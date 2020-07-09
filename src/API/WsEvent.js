class WsEvent {
    static USER_READY = 'user_ready';
    static USER_SPEAK = 'user_speak';
    static USER_SPEAK_END = 'user_speak_end';
    static START_NIGHT = 'start_night';
    static ROLE_PLAY = 'role_play';
    static ROLE_SLEEP = 'role_sleep';
    static ROLE_SELECT = 'role_select';
    static ROLE_CHOOSE = 'role_choose';
    static START_DAY = 'start_day';
    static NIGHT_DATA = 'night_data';
    static USER_SELECT = 'user_select';
    static USER_CHOOSE = 'user_choose';
    static DISCUSSION = 'discussion';
    static USER_DISC_SPEAK = 'user_disc_speak';
    static USER_DISK_SPEAK_END = 'user_disk_speak_end';
    static VOTING = 'voting';

    static USER_KICK = 'user_kick';
    static USER_KICK_END = 'user_kick_end';
}

export default WsEvent;