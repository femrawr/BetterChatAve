import notifs from '../../../gui/notifs.js';
import Module from '../../base.js';

export default class NotifSettings extends Module {
    constructor() {
        super({
            name: 'Disable Notifications',
            sect: 'Settings',
            state: true,
            type: 'Toggle',
            tip: 'Disable Notifications from the UI.'
        });
    }

    onEnable() {
        notifs.enabled = false;
        notifs.clear();
    }

    onDisable() {
        notifs.enabled = true;
    }
};