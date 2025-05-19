import gui from './gui/gui'
import manager from './module/manager';

class Main {
	constructor() {
		window.bca = {};
	}

	init() {
		gui.init();
		manager.init();

		window.bca.modules = manager.modules;
		window.bca.gui = gui;
	}
};

const main = new Main();

const onLoaded = () => {
	main.init();
	document.removeEventListener('DOMContentLoaded', onLoaded);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onLoaded);
} else {
	onLoaded();
}