import hooks from '../../../utils/hooks.js';
import Module from '../../base.js';

export default class DisableSuccess extends Module {
    constructor() {
        super({
            name: 'Disable Success',
            sect: 'Miscellaneous',
            state: true,
            type: 'Toggle',
            tip: 'Disables the success banner that appears at the top of your screen.'
        });
    }

    onEnable() {
        hooks.notifs(true);
    }

    onDisable() {
        hooks.notifs(false);
    }
};