import gui, { ModuleType, Sides, Tabs } from '../gui/main.js';

import requestHooks from '../utils/request-hooks.js';
import event from '../utils/event.js';
import saving from './saving.js';

import Textbox from '../gui/box.js';
import Button from '../gui/button.js';
import Divider from '../gui/divider.js';
import Dropdown from '../gui/list.js';
import Slider from '../gui/slider.js';
import Toggle from '../gui/toggle.js';

import { FilterBypass, FilterBypassMode } from './modules/filter-bypass.js';
import { FastBlock, WhitelistFriends} from './modules/fast-block.js';
import SpamFilter from './modules/spam-filter.js';
import SwapDms from './modules/swap-messages.js';
import CountrySearch from './modules/country-search.js';
import ClearDMs from './modules/clear-messages.js';
import BlurBackground from './modules/blur-background.js';
import BackgroundOpacity from './modules/background-opacity.js';

import NotifSettings from './settings/notifications.js';

export default {
    sections: {},
    modules: {},
    listener: [],

    add(module) {
        this.modules[module.text] = module;
        this.ui(module);
    },

    register() {
        this.add(new FilterBypass());
        this.add(new FilterBypassMode());

        new Divider()
            .setTab(Tabs.Modules)
            .setSide(Sides.Left)
            .build();

        this.add(new SpamFilter());

        this.add(new SwapDms());
        this.add(new ClearDMs());
        this.add(new CountrySearch());
        this.add(new FastBlock());
        this.add(new WhitelistFriends());

        new Divider()
            .setTab(Tabs.Modules)
            .setSide(Sides.Right)
            .build();

        this.add(new BlurBackground());
        this.add(new BackgroundOpacity());

        new Divider()
            .setTab(Tabs.Modules)
            .setSide(Sides.Right)
            .build();

        this.add(new NotifSettings());
    },

    load(module) {
        const loaded = saving.get();
        if (!loaded || !loaded.modules) {
            return null;
        }

        for (const [name, data] of Object.entries(loaded.modules)) {
            if (!this.modules[name] || name !== module) {
                continue;
            }

            return Object.values(data)[0];
        }
    },

    save(module, config) {
        const saved = saving.get() || {};
        const data = saved.modules || {};

        data[module] = config;
        saving.update('modules', data);
    },

    ui(module) {
        const loaded = this.load(module.text);

        switch (module.type) {
            case ModuleType.Textbox:
                new Textbox()
                    .setTab(module.tab)
                    .setSide(module.side)
                    .setText(module.text)
                    .setGhost(module.config.placeholder)
                    .setVal(loaded)
                    .setInfo(module.info)
                    .build();

                this.modules[module.text].onChange(loaded);
                break;

            case ModuleType.Button:
                new Button()
                    .setTab(module.tab)
                    .setSide(module.side)
                    .setText(module.text)
                    .setBinded(true)
                    .setBind(loaded)
                    .setInfo(module.info)
                    .build();

                break;

            case ModuleType.Dropdown:
                new Dropdown()
                    .setTab(module.tab)
                    .setSide(module.side)
                    .setText(module.text)
                    .setItems(module.config.items)
                    .setItem(loaded)
                    .setInfo(module.info)
                    .build();

                this.modules[module.text].onChange(loaded);
                break;

            case ModuleType.Slider:
                new Slider()
                    .setTab(module.tab)
                    .setSide(module.side)
                    .setText(module.text)
                    .setMin(module.config.min)
                    .setMax(module.config.max)
                    .setVal(loaded)
                    .setInfo(module.info)
                    .build();

                this.modules[module.text].onChange(loaded);
                break;

            case ModuleType.Toggle:
                new Toggle()
                    .setTab(module.tab)
                    .setSide(module.side)
                    .setText(module.text)
                    .setState(loaded)
                    .setInfo(module.info)
                    .build();

                this.modules[module.text].toggle(loaded);
                break;
        }

        module.onInit();
    },

    init() {
        requestHooks.hookXHR();

        this.register();

        event.on('module.toggle', (data) => {
            for (const module in this.modules) {
                if (module !== data.name) {
                    continue;
                }

                this.save(module, { state: data.state });
                this.modules[module].toggle(data.state);
            }
        });

        event.on('module.change', (data) => {
            for (const module in this.modules) {
                if (module !== data.name) {
                    continue;
                }

                this.save(module, { val: data.val });
                this.modules[module].onChange(data.val);
            }
        });

        event.on('module.call', (data) => {
            for (const module in this.modules) {
                if (module !== data.name) {
                    continue;
                }

                this.save(module, { bind: data.bind });
                this.modules[module].onEnable();
            }
        });

        gui.sendNotif('Better Chat Avenue loaded!', 5);
        gui.sendNotif('Click the "Insert" key to toggle the UI.', 7);
    },

    deinit() {
        chatSaving.deinit();

        Object.values(this.modules).forEach((mod) => {
            mod.disable();
        });

        document.removeEventListener(
            this.listener[0].event,
            this.listener[0].func
        );

        this.listener = [];
        requestHooks.unhookXHR();
    }
};