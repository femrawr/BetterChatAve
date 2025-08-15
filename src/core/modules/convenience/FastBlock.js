import notifs from '../../../gui/notifs.js';
import Module from '../../base.js';

export default class FastBlock extends Module {
    constructor() {
        super({
            name: 'Fast Block',
            sect: 'Convenience',
            type: 'Button',
            bind: 'B',
            tip: 'Quickly blocks the person you are talking to.'
        });
    }

    onActive() {
        if (window.currentPrivate === 0) return;
        window.ignoreThisUser();

        const close = window.$('#private_close')[0];
        if (!close) return;

        close.click();
        notifs.good('User has been blocked.', 3);
    }
};