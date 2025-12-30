import panel from '../gui/panel.js';
import hooks from '../utils/hooks.js';
import saving from './saving.js';

import ClearDMs from './modules/convenience/ClearDMs.js';
import FastBlock from './modules/convenience/FastBlock.js';
import SwapDms from './modules/convenience/SwapDms.js';

import BlurBackground from './modules/interface/BlurBackground.js';
import BackgroundOpacity from './modules/interface/BackgroundOpacity.js';

import CountrySearch from './modules/misc/CountrySearch.js';
import DisableSuccess from './modules/misc/DisableSuccess.js';
import FilterBypass from './modules/misc/FilterBypass.js';
import SpamFilter from './modules/misc/SpamFilter.js';

import NotifSettings from './modules/settings/Notifications.js';

import chatSaving from './patches/ChatSaving.js';

export default {
    sections: {},
    modules: {},
    listener: [],

    add(module) {
        this.modules[module.name] = module;
        this.ui(module);
    },

    register() {
        this.add(new ClearDMs());
        this.add(new SwapDms());
        this.add(new FastBlock());

        this.add(new BlurBackground());
        this.add(new BackgroundOpacity());

        this.add(new FilterBypass());
        this.add(new DisableSuccess());
        this.add(new SpamFilter());
        this.add(new CountrySearch());

        this.add(new NotifSettings());

        chatSaving.init();
    },

    load() {
        const loaded = saving.get();
        if (!loaded || !loaded.modules) return;

        Object.entries(loaded.modules).forEach(([name, data]) => {
            const module = this.modules[name];
            if (!module) return;

            if (data.state !== undefined) {
                module.state = data.state;
            }

            if (data.config && module.config) {
                Object.assign(module.config, data.config);
            }
        });
    },

    save(module) {
        const data = { state: module.state };

        if (module.config && Object.keys(module.config).length > 0) {
            data.config = { ...module.config };
        }

        const saved = saving.get() || {};
        const states = saved.modules || {};

        states[module.name] = data;
        saving.update('modules', states);
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
                        this.save(module);
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
                        module.config.value = val;
                        module.onChange(val);
                        this.save(module);
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
                        this.save(module);
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
        const keydown = (e) => {
            if (e.key.toLowerCase() !== module.bind.toLowerCase() || !e.shiftKey) return;

            window.$('#message_content').blur();
            window.$('#content').blur();

            if (module.type === 'Toggle') {
                const state = !module.state;
                module.toggle(state);
                module.ui?.set?.(state);
            } else if (module.type === 'Button') {
                module.onActive();
            }
        };

        document.addEventListener('keydown', keydown);
        this.listener.push({ event: 'keydown', func: keydown });
    },

    init() {
        hooks.request(true);
        this.register();
        this.load();

        panel.addLabel(null, 'Hold down shift to activate binds.');

        Object.values(this.modules).forEach(mod => {
            if (!mod.state) return;
            mod.onEnable();

            switch (mod.type) {
                case 'Toggle':
                    mod.ui.set(true);
                    break;

                case 'Slider':
                    mod.ui.set(mod.config.value);
                    break;
            }
        });
    },

    deinit() {
        chatSaving.deinit();

        Object.values(this.modules).forEach(mod => {
            mod.disable();
        });

        document.removeEventListener(
            this.listener[0].event,
            this.listener[0].func
        );

        this.listener = [];
        hooks.request(false);
    }
};