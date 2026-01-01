import Element from './base.js';

export default class Textbox extends Element {
    constructor() {
        super();

        this.text = 'text';
        this.placeholder = '';
        this.val = '';
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

    build() {
        const wrapper = document.createElement('div');
        Object.assign(wrapper.style, {
            padding: '12px',
            background: '#0f0f0f',
            marginBottom: '10px',
            border: '1px solid #2a2a2a'
        });

        const label = document.createElement('span');
        label.textContent = this.text;
        Object.assign(label.style, {
            color: '#ddd',
            fontSize: '13px',
            marginBottom: '8px'
        });

        const input = document.createElement('input');
        Object.assign(input, {
            type: 'text',
            placeholder: this.placeholder
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

        wrapper.appendChild(label);
        wrapper.appendChild(input);

        this._buildInto(wrapper);
        return this;
    }
};