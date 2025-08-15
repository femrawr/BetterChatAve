export default class Module {
    constructor(options = {}) {
        const {
            name = 'Name',
            sect = null,
            type = '',
            bind = '',
            tip = '',
            config = {}
        } = options;

        this.name = name;
        this.sect = sect;
        this.type = type;
        this.bind = bind;
        this.tip = tip;
        this.config = config;

        this.state = false;
        this.ui = null;
    }

    onInit() {}
    onEnable() {}
    onDisable() {}
    onActive() {}
    onChange() {}

    enable() {
        this.state = true;
        this.onEnable();
    }

    disable() {
        this.state = false;
        this.onDisable();
    }

    toggle(state) {
        if (state === undefined) {
            state = !this.state;
        }

        if (state) {
            this.enable();
        } else {
            this.disable();
        }
    }

    setValue(val) {
        this.ui?.set?.(val);
    }

    getValue() {
        return this.ui?.get?.() ?? null;
    }
};