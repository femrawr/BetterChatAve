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

    request(hook) {
        if (hook) {
            const self = this;

            this._hooked.xhrOpen = XMLHttpRequest.prototype.open;
            this._hooked.xhrSend = XMLHttpRequest.prototype.send;

            XMLHttpRequest.prototype.open = function(...args) {
                this._main = args[1].includes('chat_process.php');
                this._priv = args[1].includes('private_process.php');
                this._hook = this._main || this._priv;

                return self._hooked.xhrOpen.apply(this, args);
            };

            XMLHttpRequest.prototype.send = function(...args) {
                if (!this._hook) {
                    return self._hooked.xhrSend.apply(this, args);
                }

                for (const func of self.xhrFuncs) {
                    func.call(this, args);
                }

                return self._hooked.xhrSend.apply(this, args);
            };

            return;
        }

        XMLHttpRequest.prototype.open = this._hooked.xhrOpen;
        delete this._hooked.xhrOpen;

        XMLHttpRequest.prototype.send = this._hooked.xhrSend;
        delete this._hooked.xhrSend;

        this.xhrFuncs = [];
    }
};