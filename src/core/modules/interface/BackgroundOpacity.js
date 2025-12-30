import Module from '../../base.js';

export default class BackgroundOpacity extends Module {
    constructor() {
        super({
            name: 'Background Opacity',
            sect: 'Interface',
            state: true,
            type: 'Slider',
            tip: 'How opaque the background of the profile menu will be.',
            config: { min: 0, max: 100, value: 50 }
        });
    }

    onChange(val) {
        window.$('#large_modal').css('background-color', `rgb(0, 0, 0, ${val / 100})`);
    }
};