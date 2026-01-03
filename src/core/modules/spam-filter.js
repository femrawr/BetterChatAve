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

        this._watcher = null;
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
        this._watcher = new MutationObserver((list) => {
            list.forEach((thing) => {
                thing.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) {
                        return;
                    }

                    node.querySelectorAll('.chat_message').forEach((element) => {
                        const text = element.innerText.toLowerCase().replace(/[^a-z0-9 ]/g, '');

                        const match = this._list.find((word) => text.includes(word.toLowerCase()));
                        if (!match) {
                            return;
                        }

                        const msg = element.closest('.public__message');
                        if (!msg) {
                            return;
                        }

                        msg.remove();

                        const time = msg.querySelector('.cdate').innerText.trim();
                        const name = msg.querySelector('.username').innerText.trim();
                        const id = msg.querySelector('.avtrig.avs_menu.chat_avatar').getAttribute('data-id');

                        console.log(`[${time}] removed: ${name} (${id}) - ${text} for "${match}"`);
                    });
                });
            });
        });

        this._watcher.observe($('#chat_logs_container')[0], {
            childList: true,
            subtree: true
        });
    }

    onDisable() {
        if (!this._watcher) {
            return;
        }

        this._watcher.disconnect();
        this._watcher = null;
    }
};