import './notif.css';
import common from '../utils/common.js';

export default {
    _container: {},
    _count: 0,
    _active: new Map(),
    enabled: true,

    init() {
        this._container = common.gui('div', 'notif-ctnr');
        window.bca.artifacts.push(this._container);
        document.body.appendChild(this._container);
    },

    _show(msg, time, type) {
        if (!this.enabled) return;

        const main = common.gui('div', ['notif', 'notif-' + type]);
        const content = common.gui('div', 'notif-cont');

        const icon = this._icon(type);
        const iconEl = common.gui('div', 'notif-icon', icon);

        const textEl = common.gui('div', 'notif-text', msg);
        const closeBtn = common.gui('div', 'notif-close', 'X');
        closeBtn.onclick = () => this._hide(id);

        content.appendChild(iconEl);
        content.appendChild(textEl);
        main.appendChild(content);
        main.appendChild(closeBtn);

        const id = this._count += 1;

        this._container.appendChild(main);
        this._active.set(id, main);

        setTimeout(() => main.classList.add('show'), 10);
        setTimeout(() => this._hide(id), time * 1000);

        return id;
    },

    _hide(id) {
        const notif = this._active.get(id);
        if (!notif) return;

        notif.classList.add('hide');
        setTimeout(() => {
            if (notif.parentNode) {
                notif.parentNode.removeChild(notif);
            }

            this._active.delete(id);
        }, 300);
    },

    _icon(type) {
        const icons = {
            good: '✓',
            error: '✕',
            warn: '⚠',
            info: 'ⓘ'
        };

        return icons[type] || icons.info;
    },

    clear() {
        this._active.forEach((_, id) => this._hide(id));
    },

    info(msg, time) {
        return this._show(msg, time, 'info');
    },

    warn(msg, time) {
        return this._show(msg, time, 'warn');
    },

    error(msg, time) {
        return this._show(msg, time, 'error');
    },

    good(msg, time) {
        return this._show(msg, time, 'good');
    }
};