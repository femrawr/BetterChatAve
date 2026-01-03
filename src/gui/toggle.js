import Element from './base.js';
import event from '../utils/event.js';

export default class Toggle extends Element {
    constructor() {
        super();

        this.text = 'text';
        this.info = '';
        this.state = false;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setState(state) {
        this.state = state;
        return this;
    }

    setInfo(info) {
        this.info = info;
        return this;
    }

    build() {
        const container = document.createElement('div');
        Object.assign(container.style, {
            marginBottom: '10px'
        });

        const wrapper = document.createElement('div');
        Object.assign(wrapper.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px',
            background: '#0f0f0f',
            border: '1px solid #2a2a2a',
            cursor: 'pointer',
            userSelect: 'none'
        });

        const label = document.createElement('span');
        label.textContent = this.text;
        Object.assign(label.style, {
            color: '#ddd',
            fontSize: '13px'
        });

        let state = this.state;

        const toggle = document.createElement('div');
        Object.assign(toggle.style, {
            width: '40px',
            height: '20px',
            background: state ? '#1967d2' : '#2a2a2a',
            position: 'relative',
            transition: 'background 0.3s'
        });

        const mover = document.createElement('div');
        Object.assign(mover.style, {
            width: '16px',
            height: '16px',
            background: 'white',
            position: 'absolute',
            top: '2px',
            left: state ? '22px' : '2px',
            transition: 'left 0.3s',
            pointerEvents: 'none'
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

        wrapper.addEventListener('click', (e) => {
            if (e.button !== 0) {
                return;
            }

            state = !state;

            event.emit('module.toggle', {
                name: this.text,
                state: state
            });

            toggle.style.background = state ? '#1967d2' : '#2a2a2a';
            mover.style.left = state ? '22px' : '2px';
        });

        let opened = false;

        wrapper.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            opened = !opened;

            info.style.display = opened ? 'block' : 'none';
            wrapper.style.background = opened ? '#151515' : '#0f0f0f';
        });

        toggle.appendChild(mover);
        wrapper.appendChild(label);
        wrapper.appendChild(toggle);
        container.appendChild(wrapper);
        container.appendChild(info);

        this._buildInto(container);
        return this;
    }
};