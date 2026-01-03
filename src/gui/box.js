import Element from './base.js';
import event from '../utils/event.js';

export default class Textbox extends Element {
    constructor() {
        super();

        this.text = 'text';
        this.placeholder = '';
        this.val = '';
        this.info = '';
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setGhost(ghost) {
        this.placeholder = ghost;
        return this;
    }

    setVal(val) {
        this.val = val;
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
            padding: '12px',
            background: '#0f0f0f',
            border: '1px solid #2a2a2a',
            cursor: 'pointer',
            userSelect: 'none'
        });

        const label = document.createElement('div');
        label.textContent = this.text;
        Object.assign(label.style, {
            color: '#ddd',
            fontSize: '13px',
            marginBottom: '8px'
        });

        const input = document.createElement('input');
        Object.assign(input, {
            type: 'text',
            value: this.val,
            placeholder: this.placeholder,
            spellcheck: false
        });

        Object.assign(input.style, {
            width: '100%',
            padding: '8px',
            background: '#2a2a2a',
            color: '#ddd',
            border: '1px solid #333',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box'
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

        input.addEventListener('change', (e) => {
            event.emit('module.change', {
                name: this.text,
                val: e.target.value
            });
        });

        let opened = false;

        wrapper.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            opened = !opened;

            info.style.display = opened ? 'block' : 'none';
            wrapper.style.background = opened ? '#151515' : '#0f0f0f';
        });

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        container.appendChild(wrapper);
        container.appendChild(info);

        this._buildInto(container);
        return this;
    }
};