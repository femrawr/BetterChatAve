import Element from './base.js';
import event from '../utils/event.js';

export default class Button extends Element {
    constructor() {
        super();

        this.text = 'text';
        this.binded = false;
        this.bind = 'none';
        this.info = '';

        this._listening = false;
        this._held = new Set();
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setBinded() {
        this.binded = true;
        return this;
    }

    setBind(bind) {
        this.bind = bind;
        return this;
    }

    setInfo(info) {
        this.info = info;
        return this;
    }

    build() {
        const container = document.createElement('div');
        Object.assign(container.style, {
            marginBottom: '10px',
            position: 'relative'
        });

        const button = document.createElement('button');
        button.textContent = this.text;
        Object.assign(button.style, {
            width: '100%',
            padding: '12px',
            background: '#1967d2',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'background 0.15s'
        });

        const info = document.createElement('div');
        info.textContent = this.info;
        Object.assign(info.style, {
            padding: '12px',
            background: '#0a0a0a',
            border: '1px solid #2a2a2a',
            borderTop: 'none',
            color: '#999',
            fontSize: '12px',
            lineHeight: '1.5',
            display: 'none'
        });

        let opened = false;

        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            opened = !opened;

            info.style.display = opened ? 'block' : 'none';
            button.style.background = opened ? '#1558b0' : '#1967d2';
        });

        button.addEventListener('mousedown', () => {
            button.style.background = '#175fc4';
        });

        button.addEventListener('mouseup', () => {
            button.style.background = opened ? '#1558b0' : '#1967d2';
        });

        button.addEventListener('mouseleave', () => {
            button.style.background = opened ? '#1558b0' : '#1967d2';
        });

        button.addEventListener('click', () => {
            event.emit('module.call', {
                name: this.text,
                bind: this.bind,
                call: true
            });
        });

        if (this.binded) {
            const bind = document.createElement('div');
            Object.assign(bind.style, {
                position: 'absolute',
                top: '-6px',
                right: '-4px',
                padding: '4px 8px',
                background: '#0a0a0a',
                fontSize: '12px',
                cursor: 'pointer',
                userSelect: 'none',
                minWidth: '60px',
                textAlign: 'center',
                zIndex: '1',
                fontWeight: '600'
            });

            this._updateStyle(bind);

            bind.addEventListener('click', (e) => {
                e.stopPropagation();

                if (this._listening) {
                    return;
                }

                this._listening = true;
                this._held.clear();
                this._updateStyle(bind);
            });

            document.addEventListener('keydown', (e) => {
                if (!this._listening && this.bind !== 'none') {
                    const keys = this._getHeldKeys(e);
                    if (keys !== this.bind) {
                        return;
                    }

                    button.click();
                    return;
                }

                if (this._listening) {
                    e.preventDefault();

                    const key = this._normalizeKey(e.key);
                    this._held.add(key);

                    const allKeys = Array.from(this._held);
                    bind.textContent = `[${allKeys.join(' + ')}]`;
                    bind.style.color = '#1967d2';
                }
            });

            document.addEventListener('keyup', (e) => {
                if (!this._listening) {
                    return;
                }

                e.preventDefault();

                const key = this._normalizeKey(e.key);
                this._held.delete(key);

                if (this._held.size === 0) {
                    const keybind = bind.textContent.slice(1, -1);

                    this.bind = keybind || 'none';
                    this._listening = false;
                    this._updateStyle(bind);

                    event.emit('module.call', {
                        name: this.text,
                        bind: this.bind,
                        call: false
                    });
                }
            });

            container.appendChild(bind);
        }

        container.appendChild(button);
        container.appendChild(info);

        this._buildInto(container);
        return this;
    }

    _updateStyle(item) {
        if (this._listening) {
            item.textContent = '[...]';
            item.style.color = '#1967d2';
        } else {
            item.textContent = `[${this.bind}]`;
            item.style.color = '#999';
        }
    }

    _getHeldKeys(e) {
        const keys = [];

        if (e.ctrlKey) {
            keys.push('CTRL');
        }

        if (e.shiftKey) {
            keys.push('SHFT');
        }

        if (e.altKey) {
            keys.push('ALT');
        }

        if (e.metaKey) {
            keys.push('META');
        }

        const key = this._normalizeKey(e.key);
        if (!['control', 'shift', 'alt', 'meta'].includes(e.key.toLowerCase())) {
            keys.push(key);
        }

        return keys.join(' + ');
    }

    _normalizeKey(key) {
        const map = {
            'Control': 'CTRL',
            'Shift': 'SHFT',
            'Alt': 'ALT',
            'Meta': 'META'
        };

        if (map[key]) {
            return map[key];
        }

        return key.length === 1 ? key.toUpperCase() : key;
    }
};