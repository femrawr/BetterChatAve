import Element from './base.js';
import event from '../utils/event.js';

export default class Button extends Element {
    constructor() {
        super();

        this.text = 'text';
        this.binded = false;

        this._listening = false;
        this._key = 'none';
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setBinded() {
        this.binded = true;
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
            transition: 'background 0.2s'
        });

        button.addEventListener('click', () => {
            event.emit('button', {
                name: this.text
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
                border: 'none',
                fontSize: '12px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.2s',
                minWidth: '60px',
                textAlign: 'center',
                zIndex: '1',
                fontWeight: '600'
            });

            this._updateStyle();

            bind.addEventListener('click', () => {
                if (this._listening) {
                    return;
                }

                this._listening = true;
                this._updateStyle();
            });

            document.addEventListener('keydown', (e) => {
                if (this._listening) {
                    e.preventDefault();

                    if (e.key.toUpperCase() === this._key.toUpperCase()) {
                        this._key = 'none';
                        this._listening = false;
                        this._updateStyle();

                        return;
                    }

                    this._key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
                    this._listening = false;
                    this._updateStyle();
                }

                if (this._key !== 'none') {
                    const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
                    if (key !== this._key || this._listening) {
                        return;
                    }

                    e.preventDefault();
                    button.click();
                }
            });

            container.appendChild(bind);
        }

        container.appendChild(button);

        this._buildInto(container);
        return this;
    }

    _updateStyle(item) {
        if (this._listening) {
            item.textContent = '[...]';
            item.style.color = '#1967d2';
        } else {
            item.textContent = `[${this._key}]`;
            item.style.color = '#999';
        }
    }
};