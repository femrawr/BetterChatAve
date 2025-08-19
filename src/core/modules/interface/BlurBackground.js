import Module from '../../base.js';

export default class BlurBackground extends Module {
    constructor() {
        super({
            name: 'Blur Background',
            sect: 'Interface',
            state: true,
            type: 'Toggle',
            tip: 'Blurs the background when you open someones profile.'
        });
    }

    onEnable() {
        window.$('#large_modal').css('backdrop-filter', 'blur(8px)');
    }

    onDisable() {
        window.$('#large_modal').css('backdrop-filter', 'blur(0px)');
    }
};