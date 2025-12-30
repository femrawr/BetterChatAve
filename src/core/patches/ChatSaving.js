import hooks from '../../utils/hooks.js';
import saving from '../saving.js';

const main = {
    saved: [],
    index: -1,
    focused: false,
    input: window.$('#content'),
    listener: []
};

const priv = {
    saved: [],
    index: -1,
    focused: false,
    input: window.$('#message_content'),
    listener: []
};

const clean = (str) => {
    return str.normalize('NFC').replace(/[\u200B-\u200D\uFEFF]/g, '');
}

const updateSave = (body, store) => {
    const params = new URLSearchParams(body);
    if (!params.has('content')) {
        return;
    }

    const content = params.get('content');
    for (let i = store.saved.length - 1; i >= 0; i--) {
        if (clean(store.saved[i]) === clean(content)) {
            store.saved.splice(i, 1);
        }
    }

    store.saved.push(clean(content));

    if (store.saved.length > 35) {
        store.saved = store.saved.slice(-35);
    }

    saving.update('chat_save', {
        main: main.saved,
        priv: priv.saved
    });
};

const updateEvent = (store) => {
    const focus = () => {
        store.focused = true;
        store.index = store.saved.length;
    };

    const blur = () => {
        store.focused = false;
        store.index = store.saved.length;
    };

    const keydown = (e) => {
        if (!store.focused) return;
        if (store.saved.length === 0) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            store.index--;

            if (store.index < 0) {
                store.index = store.saved.length - 1;
            }

            store.input.val(store.saved[store.index]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            store.index++;

            if (store.index >= store.saved.length) {
                store.index = 0;
            }

            store.input.val(store.saved[store.index]);
        }
    };

    store.input.on('focus', focus);
    store.input.on('blur', blur);
    store.input.on('keydown', keydown);

    store.listener.push(
        { event: 'focus', func: focus },
        { event: 'blur', func: blur },
        { event: 'keydown', func: keydown }
    );
};

export default {
    init() {
        const loaded = saving.get();
        if (loaded && loaded.chat_save) {
            main.saved = loaded.chat_save.main;
            priv.saved = loaded.chat_save.priv;
        }

        hooks.xhrFuncs.push(function(args) {
            const body = args[0];

            if (typeof body !== 'string') {
                return;
            }

            if (this._main) {
                console.log('main', this);
                updateSave(body, main);
            }

            if (this._priv) {
                console.log('priv', this);
                updateSave(body, priv);
            }
        });

        updateEvent(main);
        updateEvent(priv);
    },

    deinit() {
        [main, priv].forEach((store) => {
            store.listener.forEach(({ event, func }) => {
                store.input.off(event, func);
            });

            store.listener = [];
            store.focused = false;
            store.index = -1;
        });
    }
};