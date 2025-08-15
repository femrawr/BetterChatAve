export default {
    _hooked: {},

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
    }
};