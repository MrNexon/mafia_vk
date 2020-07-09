class WsGameEvent {
    static READY = 'ready';
    static START = 'start'
    static USER_SPEAK = 'user_speak';
    static USER_SPEAK_END = 'user_speak_end';
    static START_NIGHT = 'night';
    static ROLE_PLAY = 'role_play';
    static ROLE_SLEEP = 'role_play_end';

    static START_DAY = 'day'

    static DISC_SPEAK = 'disc_speak';
    static DISC_SPEAK_END = 'disc_speak_end';

    static VOTING = 'voting';
    static KICK = 'kick';

    static USER_DISC_SPEAK = 'user_disc_speak';
    static USER_DISK_SPEAK_END = 'user_disk_speak_end';

    static DISC_USERS = 'disc_users';

    //VISUAL
    static ROLE_SELECT = 'role_select';
    static USER_SELECT = 'user_select';
    static USER_CHOOSE = 'user_choose';
}

export default WsGameEvent;