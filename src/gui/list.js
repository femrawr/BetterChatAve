import Element from './base.js';
import event from '../utils/event.js';

export default class List extends Element {
    constructor() {
        super();

        this.text = 'text';
        this.info = '';
        this.items = [];
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setInfo(info) {
        this.info = info;
        return this;
    }

    setItems(items) {
        this.items = items;
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

        const selector = document.createElement('div');
        Object.assign(selector.style, {
            width: '100%',
            padding: '8px',
            background: '#2a2a2a',
            color: '#ddd',
            border: '1px solid #333',
            fontSize: '13px',
            cursor: 'pointer',
            outline: 'none',
            position: 'relative',
            userSelect: 'none'
        });

        let chosen = this.items[0] || '';

        const selected = document.createElement('span');
        selected.textContent = chosen;

        const dropdown = document.createElement('div');
        Object.assign(dropdown.style, {
            position: 'absolute',
            top: '100%',
            left: '-1px',
            right: '-1px',
            background: '#2a2a2a',
            border: '1px solid #333',
            borderTop: 'none',
            maxHeight: '200px',
            overflowY: 'auto',
            display: 'none',
            zIndex: '1000',
            marginTop: '0'
        });

        this.items.forEach((item) => {
            const option = document.createElement('div');
            option.textContent = item;
            Object.assign(option.style, {
                padding: '8px',
                cursor: 'pointer',
                color: '#ddd',
                fontSize: '13px'
            });

            option.addEventListener('mouseenter', () => {
                option.style.background = '#1967d2';
            });

            option.addEventListener('mouseleave', () => {
                option.style.background = 'transparent';
            });

            option.addEventListener('click', (e) => {
                e.stopPropagation();

                chosen = item;

                selected.textContent = item;
                dropdown.style.display = 'none';

                event.emit('module.change', {
                    name: this.text,
                    val: item
                });
            });

            dropdown.appendChild(option);
        });

        selector.addEventListener('click', (e) => {
            e.stopPropagation();

            const isOpen = dropdown.style.display === 'block';
            dropdown.style.display = isOpen ? 'none' : 'block';
        });

        document.addEventListener('click', () => {
            dropdown.style.display = 'none';
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

        wrapper.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            opened = !opened;

            info.style.display = opened ? 'block' : 'none';
            wrapper.style.background = opened ? '#151515' : '#0f0f0f';
        });

        selector.appendChild(dropdown);
        selector.appendChild(selected);
        wrapper.appendChild(label);
        wrapper.appendChild(selector);
        container.appendChild(wrapper);
        container.appendChild(info);

        this._buildInto(container);
        return this;
    }
};