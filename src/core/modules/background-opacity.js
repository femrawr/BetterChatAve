import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

export default class BackgroundOpacity extends Module {
    constructor() {
        super({
            text: 'Background opacity',
            tab: Tabs.Modules,
            side: Sides.Right,
            type: ModuleType.Slider,
            info: 'The opacity of the background when you click on someones profile.',
            config: { min: 0, max: 100, val: 50 }
        });
    }

    onChange(change) {
        $('#large_modal').css('background-color', `rgb(0, 0, 0, ${change / 100})`);
    }
};