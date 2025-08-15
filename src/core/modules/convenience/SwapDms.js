import notifs from '../../../gui/notifs.js';
import Module from '../../base.js';

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
        window.hideMenu('private_menu');

        window.$.post('system/float/private_notify.php', {}, (res) => {
            window.appendMenu('private_menu', res);

            const item = window.$('.priv_mess')[0];
            if (!item) return;

            const menu = item.querySelector('.fmenu_name.gprivate');
            if (!menu) return;

            menu.click();
            window.$('#message_content')[0]?.focus();
        });

        notifs.info('Swapping DMs...', 3);
    }
};