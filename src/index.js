import manager from './core/manager.js';
import notifs from './gui/notifs.js';
import panel from './gui/panel.js';

class Main {
    constructor() {
        window.bca = {};
        window.bca.artifacts = [];
        window.bca.events = [];

        this.init();
    }

    init() {
        panel.init('Better Chate Avenue - femrawr')
        notifs.init();

        manager.init();

        panel.onClose = () => {
            window.bca.artifacts.forEach(el => {
                el.remove();
            });

            manager.deinit();
        };

        notifs.good('Better Chat Avenue loaded!', 5);
        notifs.info('Click the "Insert" key to toggle the UI', 7);
    }
};

export default new Main();