import hooks from '../../utils/hooks.js';
import saving from '../saving.js';

let saved = [];
let index = -1;
let focused = false;

const input = window.$('#content');

export default () => {
    const loaded = saving.get();
    if (loaded && loaded.chat_save) {
        saved = loaded.chat_save;
    }

    hooks.xhrFuncs.push(function(args) {
        const body = args[0];
        if (!this._main || typeof body !== 'string') {
            return;
        }

        const params = new URLSearchParams(body);
        if (!params.has('content')) return;

        const content = params.get('content');
        for (let i = saved.length - 1; i >= 0; i--) {
            if (saved[i] === content) {
                saved.splice(i, 1);
            }
        }

        saved.push(content);
        saving.update('chat_save', saved);
    });

    input.on('focus', () => {
        focused = true;
        index = saved.length;
    });

    input.on('blur', () => {
        focused = false;
        index = saved.length;
    });

    input.on('keydown', (e) => {
        if (!focused) return;
        if (saved.length === 0) return;

        if (e.key == 'ArrowUp') {
            e.preventDefault();
            index--;

            if (index < 0)
                index = saved.length - 1;

            input.val(saved[index]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            index++;

            if (index >= saved.length)
                index = 0;

            input.val(saved[index]);
        }
    });
};