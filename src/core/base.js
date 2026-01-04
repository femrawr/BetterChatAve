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
        this.state = false;
    }

    onInit() {}
    onEnable() {}
    onDisable() {}
    onChange(change) {}

    enable() {
        this.state = true;
        this.onEnable();
    }

    disable() {
        this.state = false;
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