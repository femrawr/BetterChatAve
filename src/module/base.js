import gui from "../gui/gui";

export default class Module {
	constructor(name, type, bind) {
		this.name = name;
		this.type = type;
		this.enabled = false;
		this.bind = bind;

		if (type === 'Button') {
			this.ui = gui.addButton(name, this.onClicked.bind(this));
		} else if (type === 'Toggle') {
			this.ui = gui.addToggle(name, this.toggle.bind(this));
		}
	}

	onEnabled() {}

	onDisabled() {}

	onClicked() {}

	enable() {
		this.enabled = true;
		this.onEnabled();
	}

	disable() {
		this.enabled = false;
		this.onDisabled();
	}

	toggle(state) {
		if (state) {
			this.enable();
		} else {
			this.disable();
		}
	}
};