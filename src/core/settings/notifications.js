import Module from '../base.js';
import gui, { ModuleType, Sides, Tabs } from '../../gui/main.js';

export default class NotifSettings extends Module {
    constructor() {
        super({
            text: 'Notifications',
            tab: Tabs.Settings,
            side: Sides.Left,
            type: ModuleType.Toggle,
            info: 'Whether notifications should be sent.',
            config: { state: true }
        });
    }

    onEnable() {
        gui.notifsAllowed = true;
    }

    onDisable() {
        gui.notifsAllowed = false;
    }
};