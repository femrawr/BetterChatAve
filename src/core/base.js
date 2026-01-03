export default class Module {
    constructor(options = {}) {
        const {
            text = '',
            tab = '',
            side = '',
            type = '',
            info = '',
            config = {}
        } = options;

        this.text = text;
        this.tab = tab;
        this.side = side;
        this.type = type;
        this.info = info;
        this.config = config;
        this.ui = null;
    }

    onInit() {}
    onEnable() {}
    onDisable() {}
    onChange(change) {}

    enable() {
        this.onEnable();
    }

    disable() {
        this.onDisable();
    }

    toggle(state) {
        if (state) {
            this.enable();
        } else {
            this.disable();
        }
    }
};