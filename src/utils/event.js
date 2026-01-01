export default {
    listeners: {},

    on(event, func) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(func);
    },

    remove(event, func) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event] = this.listeners[event].filter((fn) => fn !== func);
    },

    emit(event, data) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach((func) => func(data));
    }
};