import Module from '../../base.js';
import filter from '../../../../resources/filter.json';

export default class SpamFilter extends Module {
    constructor() {
        super({
            name: 'Spam Filter',
            sect: 'Miscellaneous',
            state: true,
            type: 'Toggle',
            tip: 'Attempts to filter out messages from spam bots.'
        });
    }

    onEnable() {
        this.watcher = new MutationObserver(list => {
            list.forEach(thing => {
                thing.addedNodes.forEach(node => {
                    if (!(node instanceof HTMLElement)) return;

                    node.querySelectorAll('.chat_message').forEach(el => {
                        const text = el.innerText.toLowerCase().replace(/[^a-z0-9 ]/g, '');
                        // console.log(text);

                        const match = filter.find(word => text.includes(word.toLowerCase()));
                        if (!match) return;

                        const msg = el.closest('.public__message');
                        if (!msg) return;

                        const time = msg.querySelector('.cdate').innerText.trim();
                        const name = msg.querySelector('.username').innerText.trim();
                        const id = msg.querySelector('.cclear.logs_menu.sub_chat').getAttribute('data-user');

                        console.log(`[${time}] removed: ${name} (${id}) - ${text} for "${match}"`);

                        msg.remove();
                    });
                });
            });
        });

        this.watcher.observe(window.$('#chat_logs_container')[0], {
            childList: true,
            subtree: true
        });
    }

    onDisable() {
        if (!this.watcher) return;
        this.watcher.disconnect();
    }
};