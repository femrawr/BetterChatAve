import './style.css'

export default {
	state: {},

	create(type, name, text) {
		const element = document.createElement(type);
		if (name) element.className = 'gui-' + name;
		if (text) element.textContent = text;
		return element;
	},

	init() {
		this.state.main = this.create('div', 'main');
		this.state.titleBar = this.create('div', 'title-bar');
		this.state.title = this.create('div', 'title', 'Better Chat Avenue');

		const controls = this.create('div', 'control-btns-bar');

		const minimizeBtn = this.create('button', 'control-btn', '-');
		minimizeBtn.onclick = () => this.minimize();

		const closeBtn = this.create('button', 'control-btn', 'x');
		closeBtn.onclick = () => this.deinit();

		controls.appendChild(minimizeBtn);
		controls.appendChild(closeBtn);
		this.state.titleBar.appendChild(this.state.title);
		this.state.titleBar.appendChild(controls);

		this.state.content = this.create('div', 'content');

		this.state.main.appendChild(this.state.titleBar);
		this.state.main.appendChild(this.state.content);
		document.body.appendChild(this.state.main);

		document.addEventListener('keydown', (e) => {
			if (e.key !== 'Insert')
				return;

			if (this.state.main.style.display === 'none') {
				this.state.main.style.display = 'block';
				setTimeout(() => {
					this.state.main.style.opacity = '1';
				}, 50);
			} else {
				this.state.main.style.opacity = '0';
				setTimeout(() => {
					this.state.main.style.display = 'none';
				}, 50);
			}
		});

		this.dragify(this.state.titleBar);

		this.notif('you can click INSERT to toggle visibility of the ui', 15);
	},

	deinit() {
		this.state.main.style.opacity = '0';
		setTimeout(() => {
			this.state.main.remove();
		}, 300);
	},

	minimize() {
		this.state.main.style.opacity = '0';
		setTimeout(() => {
			this.state.main.style.display = 'none';
		}, 300);
	},

	dragify(element) {
		let dragging = false;
		let current = { X: 0, Y: 0 };
		let initial = { X: 0, Y: 0 };
		let offset = { X:0, Y:0 };

		const start = (e) => {
			if (e.target !== element && !e.target.closest('.gui-title-bar'))
				return;

			const transform = window.getComputedStyle(this.state.main).transform;
			const matrix = transform === 'none' ? new DOMMatrix() : new DOMMatrix(transform);

			initial.X = e.clientX - matrix.m41;
			initial.Y = e.clientY - matrix.m42;

			dragging = true;
		}

		const end = () => {
			dragging = false;
		}

		const drag = (e) => {
			if (!dragging)
				return;

			e.preventDefault();

			current.X = e.clientX - initial.X;
			current.Y = e.clientY - initial.Y;

			offset.X = current.X;
			offset.Y = current.Y;

			this.state.main.style.transform = `translate(${current.X}px, ${current.Y}px)`;
		}

		element.addEventListener('mousedown', start);
		document.addEventListener('mouseup', end);
		document.addEventListener('mousemove', drag);
	},

	notif(text = '', dur = 2, func = null) {
		const notif = this.create('div', 'notif', text)

		notif.addEventListener('click', () => {
			notif.classList.remove('show');
			setTimeout(() => notif.remove(), 300);

			if (typeof func === 'function')
				destroyCallback();

			if (notif.timeout)
				clearTimeout(notif.timeout);
		});

		document.body.appendChild(notif);
		setTimeout(() => notif.classList.add('show'), 100);

		if (dur !== -1) {
			notif.timeout = setTimeout(() => {
				notif.classList.remove('show');
				setTimeout(() => notif.remove(), 300);
			}, dur * 1000);
		}

		return notif;
	},

	addButton(text, func) {
		const button = this.create('button', 'main-btn', text);
		button.addEventListener('click', func);

		this.state.content.appendChild(button);
		return button;
	},

	addToggle(text, func) {
		const container = this.create('div', 'main-toggle-container');
		const toggleLabel = this.create('span', 'blank00', text);
		const toggle = this.create('label', 'main-toggle-switch');

		const input = this.create('input');
		input.type = 'checkbox';
		input.addEventListener('change', (e) => func(e.target.checked));

		const slider = this.create('span', 'main-toggle-slider');

		toggle.appendChild(input);
		toggle.appendChild(slider);
		container.appendChild(toggle);
		container.appendChild(toggleLabel);
		this.state.content.appendChild(container);

		return container;
	}
};