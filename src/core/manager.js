import panel from '../gui/panel.js';

import ClearDMs from './modules/convenience/ClearDMs.js';
import FastBlock from './modules/convenience/FastBlock.js';
import SwapDms from './modules/convenience/SwapDms.js';

import CountrySearch from './modules/misc/CountrySearch.js';
import DisableSuccess from './modules/misc/DisableSuccess.js';
import FilterBypass from './modules/misc/FilterBypass.js';

import NotifSettings from './modules/settings/Notifications.js';

export default {
    sections: {},
    modules: {},

    add(module) {
        this.modules[module.name] = module;
        this.ui(module);
    },

    load() {
        this.add(new ClearDMs());
        this.add(new SwapDms());
        this.add(new FastBlock());

        this.add(new FilterBypass());
        this.add(new DisableSuccess());
        this.add(new CountrySearch());

        this.add(new NotifSettings());
    },

    ui(module) {
        let sect = this.sections[module.sect];
        if (!sect) {
            sect = panel.addSection(module.sect);
            this.sections[module.sect] = sect;
        }

        switch (module.type) {
            case 'Toggle':
                module.ui = panel.addToggle(
                    sect,
                    module.name,
                    module.tip,

                    (state) => {
                        module.toggle(state);
                    }
                );

                break;

            case 'Button':
                module.ui = panel.addButton(
                    sect,
                    module.name,
                    module.tip,

                    () => {
                        module.onActive();
                    }
                );

                break;

            case 'Slider':
                const { min = 0, max = 100, value = 50 } = module.config;
                module.ui = panel.addSlider(
                    sect,
                    module.name,
                    module.tip,
                    min,
                    max,
                    value,

                    (val) => {
                        module.onChange(val);
                    }
                );

                break;

            case 'Box':
                module.ui = panel.addBox(
                    sect,
                    module.name,
                    module.tip,

                    (val) => {
                        module.onChange(val);
                    }
                );

                break;

            case 'Label':
                module.ui = panel.addLabel(section, module.name);
                break;
        }

        module.onInit();

        if (module.bind) {
            this.bind(module);

            if (module.type === 'Button') {
                module.ui.name(`${module.name} (${module.bind.toUpperCase()})`);
            }
        }
    },

    bind(module) {
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() !== module.bind.toLowerCase() || !e.shiftKey) return;

            window.$('#message_content')[0]?.blur();
            window.$('#main_input')[0]?.blur();

            if (module.type === 'Toggle') {
                const state = !module.state;
                module.toggle(state);
                module.ui?.set?.(state);
            } else if (module.type === 'Button') {
                module.onActive();
            }
        });
    },

    init() {
        this.load();

        panel.addLabel(null, 'Hold down shift to activate binds.');

        Object.values(this.modules).forEach(mod => {
            if (!mod.state) return;
            mod.onEnable();
        });
    }
};