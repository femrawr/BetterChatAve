import manager from './core/manager.js';
import gui from './gui/main.js';
import event from './utils/event.js';

if (
    typeof window.bca !== 'undefined' &&
    Object.keys(window.bca).length !== 0
) {
    throw new Error('better chat ave is already running');
}

window.bca = {};
window.bca.utils = {};
window.bca.artifacts = [];

gui.createMain('Better Chat Avenue - femrawr');

manager.init();

event.on('exit', () => {
    window.bca.artifacts.forEach((item) => {
        item.remove();
    });

    manager.deinit();
});