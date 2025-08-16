export default {
    _hooked: {},
    xhrFuncs: [],

    notifs(hook) {
        if (hook) {
            this._hooked.callSuccess = window.callSuccess;
            window.callSuccess = () => {}

            return;
        }

        if (!this._hooked.callSuccess)
            return;

        window.callSuccess = this._hooked.callSuccess;
        delete this._hooked.callSuccess;
    },

    closeRight() {
        let old = window.closeRight;

        window.closeRight = () => {
            window.prepareRight(0);
            window.userReload(1);

            window.closeRight = old;
            old = null;
        };
    },

    request() {
        window.nighg = this;
        const self = this;

        const oldOpen = XMLHttpRequest.prototype.open;
        const oldSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(...args) {
            this._hook = /(?:chat|private)_process\.php/.test(args[1]);
            return oldOpen.apply(this, args);
        };

        XMLHttpRequest.prototype.send = function(...args) {
            if (!this._hook) return oldSend.apply(this, args);

            for (const func of self.xhrFuncs) {
                func.call(this, args);
            }

            return oldSend.apply(this, args);
        }
    }
};