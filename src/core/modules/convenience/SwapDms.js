import Module from '../../base.js';
import notifs from '../../../gui/notifs.js';
import common from '../../../utils/common.js';

export default class SwapDms extends Module {
    constructor() {
        super({
            name: 'Swap DMs',
            sect: 'Convenience',
            type: 'Button',
            bind: 'L',
            tip: 'Quickly switch to the next person in your DMs.'
        });
    }

    onActive() {
        if (!common.canRunBind()) return;

        window.hideMenu('private_menu');

        window.$.post('system/float/private_notify.php', {}, (res) => {
            window.appendMenu('private_menu', res);

            const item = window.$('.priv_mess')[0];
            if (!item) return;

            const menu = item.querySelector('.fmenu_name.gprivate');
            if (!menu) return;

            menu.click();
            window.$('#message_content').focus();
        });

        notifs.info('Swapping DMs...', 3);
    }
};