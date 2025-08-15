import './panel.css'
import common from '../utils/common.js';

export default {
    _container: null,
    _main: null,
    _active: null,
    onClose: null,

    init(name) {
        this._container = common.gui('div', 'main-ctnr');

        const header = common.gui('div', 'main-header');
        const title = common.gui('span', 'main-title', name);

        const closeBtn = common.gui('div', 'main-close', 'X');
        closeBtn.onclick = () => this._close();

        header.appendChild(title);
        header.appendChild(closeBtn);

        this._main = common.gui('div', 'main-cont');

        this._container.appendChild(header);
        this._container.appendChild(this._main);

        window.bca.artifacts.push(this._container);
        document.body.appendChild(this._container);

        this._dragify(header);

        document.addEventListener('keydown', (e) => {
            if (e.code !== 'Insert') return;
            this._toggle();
        });
    },

    _dragify(element) {
        let dragging = false;
        let current = { X: 0, Y: 0 };
        let initial = { X: 0, Y: 0 };
        let offset = { X:0, Y:0 };

        const start = (e) => {
            if (e.target !== element && !e.target.closest('.gui-main-header'))
                return;

            const transform = window.getComputedStyle(this._container).transform;
            const matrix = transform === 'none' ? new DOMMatrix() : new DOMMatrix(transform);

            initial.X = e.clientX - matrix.m41;
            initial.Y = e.clientY - matrix.m42;

            dragging = true;
        };

        const end = () => {
        	dragging = false;
        };

        const drag = (e) => {
            if (!dragging)
                return;

            e.preventDefault();

            current.X = e.clientX - initial.X;
            current.Y = e.clientY - initial.Y;

            offset.X = current.X;
            offset.Y = current.Y;

            this._container.style.transform = `translate(${current.X}px, ${current.Y}px)`;
        };

        element.addEventListener('mousedown', start);
        document.addEventListener('mouseup', end);
        document.addEventListener('mousemove', drag);
	},

    _close() {
        this.onClose();
        this._container.remove();
    },

    _toggle() {
        const hidden = this._container.style.display === 'none';
        this._container.style.display = hidden ? '' : 'none';
    },

    _tip(parent, text) {
        const tip = common.gui('div', 'tip', text);
        window.bca.artifacts.push(tip);
        document.body.appendChild(tip);

        parent.addEventListener('mouseenter', (e) => {
            tip.classList.add('show');
            tip.style.left = `${e.pageX + 12}px`;
            tip.style.top = `${e.pageY - 8}px`;
        });

        parent.addEventListener('mousemove', (e) => {
            tip.style.left = `${e.pageX + 12}px`;
            tip.style.top = `${e.pageY - 8}px`;
        });

        parent.addEventListener('mouseleave', () => {
            tip.classList.remove('show');
        });
    },

    addSection(name) {
        const main = common.gui('div', 'main-sect');
        const head = common.gui('div', 'sect-head');

        const title = common.gui('span', 'sect-title', name);
        const toggle = common.gui('span', 'sect-toggle', '▼');

        head.addEventListener('click', () => {
            main.classList.toggle('collapsed');
        });

        head.appendChild(title);
        head.appendChild(toggle);

        const content = common.gui('div', 'sect-cont');

        main.appendChild(head);
        main.appendChild(content);
        this._main.appendChild(main);

        this._active = content;

        return {
            element: main,
            content: content,

            set: () => {
                this._active = content;
                return this;
            }
        }
    },

    addLabel(sect, text) {
        const main = common.gui('div', 'item-main');
        const label = common.gui('div', 'item-label', text);

        main.appendChild(label);

        const target = sect ? sect.content : this._main;
        target.appendChild(main);

        return main;
    },

    addToggle(sect, name, tip, func) {
        const main = common.gui('div', 'item-main');
        const label = common.gui('div', 'item-label', name);
        const toggle = common.gui('div', 'item-toggle');

        if (tip) this._tip(main, tip);

        let enabled = false;

        toggle.addEventListener('click', () => {
            enabled = !enabled;
            toggle.classList.toggle('active', enabled);

            if (func) func(enabled);
        });

        main.appendChild(label);
        main.appendChild(toggle);

        const target = sect ? sect.content : this._active;
        target.appendChild(main);

        return {
            get: () => enabled,
            set: (val) => {
                enabled = val;
                toggle.classList.toggle('active', enabled);
            }
        };
    },

    addButton(sect, name, tip, func) {
        const main = common.gui('div', 'item-main');
        const button = common.gui('button', 'item-button', name);

        if (tip) this._tip(main, tip);

        button.addEventListener('click', () => {
            if (func) func();
        });

        main.appendChild(button);

        const target = sect ? sect.content : this._active;
        target.appendChild(main);

        return {
            name: (val) => button.textContent = val,
            set: (val) => button.disabled = !val
        };
    },

    addBox(sect, name, tip, func) {
        const main = common.gui('div', 'item-main');
        const label = common.gui('div', 'item-label', name);

        if (tip) this._tip(main, tip);

        const textbox = common.gui('input', 'item-box');
        textbox.type = 'text';

        textbox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') textbox.blur();
        });

        if (func) {
            textbox.addEventListener('input', (e) => func(e.target.value));
        }

        main.appendChild(label);
        main.appendChild(textbox);

        const target = sect ? sect.content : this._active;
        target.appendChild(main);

        return {
            get: () => textbox.value,
            set: (val) => textbox.value = val
        };
    },

    addSlider(sect, name, tip, min, max, now, func) {
        const main = common.gui('div', 'item-main');
        const container = common.gui('div', 'item-slider-ctnr');

        if (tip) this._tip(main, tip);

        const label = common.gui('div', 'item-label', name);
        label.style.marginBottom = '0';

        const input = common.gui('input', 'item-slider-box');
        input.type = 'number';
        input.value = now;

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') input.blur();
        });

        container.appendChild(label);
        container.appendChild(input);

        const slider = common.gui('input', 'item-slider');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.value = now;

        const update = (val) => {
            slider.value = val;
            input.value = val;
            if (func) func(Number(val));
        };

        slider.addEventListener('input', (e) => update(e.target.value));
        input.addEventListener('input', (e) => update(e.target.value));

        main.appendChild(container);
        main.appendChild(slider);

        const target = sect ? sect.content : this._active;
        target.appendChild(main);

        return {
            get: () => Number(slider.value),
            set: (val) => update(val)
        };
    }
};