import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

export default class SpamFilter extends Module {
    constructor() {
        super({
            text: 'Spam filter',
            tab: Tabs.Modules,
            side: Sides.Left,
            type: ModuleType.Toggle,
            info: 'Attemps to detect and remove messages sent by spam bots.'
        });
    }
};