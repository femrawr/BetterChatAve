import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

export class FilterBypass extends Module {
    constructor() {
        super({
            text: 'Filter bypass',
            tab: Tabs.Modules,
            side: Sides.Left,
            type: ModuleType.Toggle,
            info: 'Attemps to bypass the chat filter.'
        });
    }

    onEnable() {
        
    }

    onDisable() {
        
    }
};

export class FilterBypassMode extends Module {
    constructor() {
        super({
            text: 'Bypass mode',
            tab: Tabs.Modules,
            side: Sides.Left,
            type: ModuleType.Dropdown,
            info: 'The method to use to bypass the message.',
            config: { items: ['No width space', 'Character look-alike'] }
        });
    }

    onChange(change) {
        
    }
}