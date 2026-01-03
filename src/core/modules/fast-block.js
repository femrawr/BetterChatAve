import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

import inputUtils from '../../utils/input-utils.js';

export class FastBlock extends Module {
    constructor() {
        super({
            text: 'Block this person',
            tab: Tabs.Modules,
            side: Sides.Right,
            type: ModuleType.Button,
            info: 'Blocks the current person you are talking to.'
        });
    }

    onEnable() {
        if (!inputUtils.canRunBind()) {
            return;
        }

        if (window.currentPrivate === 0) {
            return;
        }

        window.ignoreThisUser();

        const close = $('#private_close')[0];
        if (!close) {
            return;
        }

        close.click();
    }
};

export class WhitelistFriends extends Module {
    constructor() {
        super({
            text: 'Whitelist Friends',
            tab: Tabs.Modules,
            side: Sides.Right,
            type: ModuleType.Toggle,
            info: 'Prevents the "block this person" (fast block) module from blocking friends.'
        });
    }
}