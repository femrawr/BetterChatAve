import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

export default class ClearDMs extends Module {
    constructor() {
        super({
            text: 'Clear private messages',
            tab: Tabs.Modules,
            side: Sides.Right,
            type: ModuleType.Button,
            info: 'Deletes everyone from the private message list.'
        });
    }

    onEnable() {
        window.privateClear();
    }
};