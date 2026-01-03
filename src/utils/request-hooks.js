export default {
    onXHR: [],

    _hooked: {},

    hookXHR(hook) {
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

            for (const func of self.onXHR) {
                func.call(this, args);
            }

            return self._hooked.xhrSend.apply(this, args);
        };
    },

    unhookXHR() {
        XMLHttpRequest.prototype.open = this._hooked.xhrOpen;
        delete this._hooked.xhrOpen;

        XMLHttpRequest.prototype.send = this._hooked.xhrSend;
        delete this._hooked.xhrSend;

        this.onXHR = [];
    }
};