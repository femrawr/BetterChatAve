import Element from './base.js';
import event from '../utils/event.js';

export default class Slider extends Element {
    constructor() {
        super();

        this.text = 'text';
        this.min = 0;
        this.max = 0;
        this.val = 0;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setMin(min) {
        this.min = min;
        return this;
    }

    setMax(max) {
        this.max = max;
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
            border: '1px solid #2a2a2a',
            marginBottom: '10px'
        });

        const head = document.createElement('div');
        Object.assign(head.style, {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            alignItems: 'center'
        });

        const label = document.createElement('span');
        label.textContent = this.text;
        Object.assign(label.style, {
            color: '#ddd',
            fontSize: '13px'
        });

        const value = document.createElement('input');
        Object.assign(value, {
            type: 'text',
            value: this.val
        });

        Object.assign(value.style, {
            color: '#1967d2',
            fontSize: '13px',
            background: 'transparent',
            border: 'none',
            padding: '0',
            width: '80px',
            textAlign: 'right',
            outline: 'none'
        });

        const slider = document.createElement('input');
        Object.assign(slider, {
            type: 'range',
            min: this.min,
            max: this.max,
            value: this.val
        });

        Object.assign(slider.style, {
            width: '100%',
            height: '4px',
            background: '#2a2a2a',
            outline: 'none'
        });

        value.addEventListener('input', (e) => {
            const parsed = parseFloat(e.target.value) || 0;
            const clamped = Math.max(this._min, Math.min(this._max, parsed));

            slider.value = clamped
            valueInput.value = parsed;

            event.emit('slider', {
                name: this.text,
                val: parsed
            });
        });

        value.addEventListener('keypress', (e) => {
            if (!/[\d.\-]/.test(e.key)) {
                e.preventDefault();
                return;
            }
        });

        slider.addEventListener('input', (e) => {
            value.value = e.target.value;

            event.emit('slider', {
                name: this.text,
                val: e.target.value
            });
        });

        head.appendChild(label);
        head.appendChild(value);
        wrapper.appendChild(head);
        wrapper.appendChild(slider);

        this._buildInto(wrapper);
        return this;
    }
};