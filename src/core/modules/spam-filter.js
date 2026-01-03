import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

import filter from '../../../resources/filter.json';

export default class SpamFilter extends Module {
    constructor() {
        super({
            text: 'Spam filter',
            tab: Tabs.Modules,
            side: Sides.Left,
            type: ModuleType.Toggle,
            info: 'Attemps to detect and remove messages sent by spam bots.'
        });

        this._list = [];
    }

    onInit() {
        filter.spam_list.forEach((word) => {
            const decoded = atob(word);
            if (this._list.includes(decoded)) {
                return;
            }

            this._list.push(decoded);
        });
    }

    onEnable() {
        this.watcher = new MutationObserver((list) => {
            list.forEach(thing => {
                thing.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) {
                        return;
                    }

                    node.querySelectorAll('.chat_message').forEach(el => {
                        const text = el.innerText.toLowerCase().replace(/[^a-z0-9 ]/g, '');
                        // console.log(text);

                        const match = this._list.find(word => text.includes(word.toLowerCase()));
                        if (!match) {
                            return;
                        }

                        const msg = el.closest('.public__message');
                        if (!msg) {
                            return;
                        }

                        const time = msg.querySelector('.cdate').innerText.trim();
                        const name = msg.querySelector('.username').innerText.trim();
                        const id = msg.querySelector('.cclear.logs_menu.sub_chat').getAttribute('data-user');

                        console.log(`[${time}] removed: ${name} (${id}) - ${text} for "${match}"`);

                        msg.remove();
                    });
                });
            });
        });

        this.watcher.observe($('#chat_logs_container')[0], {
            childList: true,
            subtree: true
        });
    }

    onDisable() {
        if (!this.watcher) {
            return;
        }

        this.watcher.disconnect();
    }
};