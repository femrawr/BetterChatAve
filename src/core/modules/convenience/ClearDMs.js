import notifs from '../../../gui/notifs.js';
import Module from '../../base.js';

export default class ClearDMs extends Module {
    constructor() {
        super({
            name: 'Clear DMs',
            sect: 'Convenience',
            type: 'Button',
            tip: 'Clears all your DMs.'
        });
    }

    onActive() {
        window.privateClear();
        notifs.good('DMs cleared', 3);
    }
};