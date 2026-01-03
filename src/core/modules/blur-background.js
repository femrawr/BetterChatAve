import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

export default class BlurBackground extends Module {
    constructor() {
        super({
            text: 'Blur background',
            tab: Tabs.Modules,
            side: Sides.Right,
            type: ModuleType.Toggle,
            info: 'Blurs the background when you open someones profile instead of turning the screen black.',
        });
    }

    onEnable() {
        $('#large_modal').css('backdrop-filter', 'blur(8px)');
    }

    onDisable() {
        $('#large_modal').css('backdrop-filter', 'blur(0px)');
    }
};