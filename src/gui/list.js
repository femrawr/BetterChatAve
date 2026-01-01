import Element from './base.js';

export default class List extends Element {
    constructor() {
        super();

        this.text = 'text';
        this.items = [];
    }

    setText(text) {
        this.text = text;   
        return this;
    }

    setItems(items) {
        this.items = items;
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

        const label = document.createElement('div');
        Object.assign(label.style, {
            color: '#ddd',
            fontSize: '13px',
            marginBottom: '8px'
        });

        const selector = document.createElement('select');
        Object.assign(selector.style, {
            width: '100%',
            padding: '8px',
            background: '#2a2a2a',
            color: '#ddd',
            border: '1px solid #333',
            fontSize: '13px',
            cursor: 'pointer',
            outline: 'none'
        });

        this.items.forEach((item) => {
            const option = document.createElement('span');
            Object.assign(option, {
                value: item,
                textContent: item
            });

            selector.appendChild(option);
        });

        wrapper.appendChild(label);
        wrapper.appendChild(selector);

        this._buildInto(wrapper);
        return this;
    }
};