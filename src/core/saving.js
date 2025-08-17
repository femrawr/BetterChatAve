export default {
    save: {},

    get() {
        const data = localStorage.getItem('bca');
        return JSON.parse(data) || null;
    },

    set() {
        localStorage.setItem('bca', JSON.stringify(this.save));
    },

    update(key, data) {
        const loaded = this.get() || {};
        loaded[key] = data;

        this.save = loaded;
        this.set();
    }
};