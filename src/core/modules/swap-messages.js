import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

import inputUtils from '../../utils/input-utils.js';

export default class SwapDms extends Module {
    constructor() {
        super({
            text: 'Swap private messages',
            tab: Tabs.Modules,
            side: Sides.Right,
            type: ModuleType.Button,
            info: 'Quickly open an unread private message.'
        });
    }

    onEnable() {
        if (!inputUtils.canRunBind()) {
            return;
        }

        window.hideMenu('private_menu');

        window.$.post('system/float/private_notify.php', {}, (res) => {
            window.appendMenu('private_menu', res);

            const item = $('.priv_mess')[0];
            if (!item) {
                return;
            }

            const menu = item.querySelector('.fmenu_name.gprivate');
            if (!menu) {
                return;
            }

            menu.click();
            $('#message_content').focus();
        });
    }
};