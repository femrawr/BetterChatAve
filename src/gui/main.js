import event from '../utils/event.js';

export const Sides = {
    Left: 'left',
    Right: 'right'
};

export const Tabs = {
    Modules: 'modules',
    Settings: 'settings'
};

export default {
    main: null,
    left: null,
    right: null,
    notifs: null,
    content: {},
    tab: Tabs.Modules,

    createMain(theTitle) {
        this.main = document.createElement('div');
        Object.assign(this.main.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '900px',
            height: '600px',
            background: '#1a1a1a',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '10000'
        });

        const bar = document.createElement('div');
        this._dragify(bar);
        Object.assign(bar.style, {
            height: '30px',
            background: '#2a2a2a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 15px',
            borderBottom: '1px solid #333',
            userSelect: 'none'
        });

        const title = document.createElement('div');
        title.textContent = theTitle || 'Better Chat Ave';
        Object.assign(title.style, {
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600'
        });

        const controls = document.createElement('div');
        Object.assign(controls.style, {
            display: 'flex',
            gap: '8px'
        });

        const hide = this._createControl('#ffbd2e', () => {
            this.main.style.display = 'none';
        });

        const exit = this._createControl('#ff5f56', () => {
            event.emit('exit');
        });

        const tabs = document.createElement('div');
        Object.assign(tabs.style, {
            background: '#0a0a0a',
            display: 'flex',
            gap: '10px',
            padding: '5px 15px'
        });

        const content = document.createElement('div');
        Object.assign(content.style, {
            flex: '1',
            display: 'flex',
            gap: '15px',
            padding: '5px 15px 15px 15px',
            background: '#0a0a0a',
            overflow: 'hidden'
        });

        this.left = document.createElement('div');
        Object.assign(this.left.style, {
            flex: '1',
            background: '#1a1a1a',
            padding: '15px',
            overflowY: 'auto',
            border: '1px solid #2a2a2a'
        });

        this.right = document.createElement('div');
        Object.assign(this.right.style, {
            flex: '1',
            background: '#1a1a1a',
            padding: '15px',
            overflowY: 'auto',
            border: '1px solid #2a2a2a'
        });

        this.notifs = document.createElement('div');
        Object.assign(this.notifs.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: '1000000',
            pointerEvents: 'none'
        });

        Object.values(Tabs).forEach((name) => {
            const tab = document.createElement('button');
            tab.textContent = name;
            Object.assign(tab.style, {
                padding: '3px 12px',
                background: this.tab === name ? '#1967d2' : '#2a2a2a',
                color: this.tab === name ? '#fff' : '#999',
                border: 'none',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '500',
                transition: 'all 0.2s'
            });

            tab.addEventListener('mouseenter', () => {
                if (this.tab === name) {
                    return;
                }

                tab.style.background = '#333';
            });

            tab.addEventListener('mouseleave', () => {
                if (this.tab === name) {
                    return;
                }

                tab.style.background = '#2a2a2a';
            });

            tab.addEventListener('click', () => {
                this.tab = name;

                Object.values(Tabs).forEach((theName) => {
                    const btn = tabs.children[Object.values(Tabs).indexOf(theName)];
                    if (theName === name) {
                        btn.style.background = '#1967d2';
                        btn.style.color = '#fff';
                    } else {
                        btn.style.background = '#2a2a2a';
                        btn.style.color = '#999';
                    }
                });

                this._renderTab();
            });

            tabs.appendChild(tab);
        });

        controls.appendChild(hide);
        controls.appendChild(exit);
        bar.appendChild(title);
        bar.appendChild(controls);

        content.appendChild(this.left);
        content.appendChild(this.right);

        this.main.appendChild(bar);
        this.main.appendChild(tabs);
        this.main.appendChild(content);

        this._renderTab();

        document.body.appendChild(this.main);
        document.body.appendChild(this.notifs);
    },

    _renderTab() {
        this.left.innerHTML = '';
        this.right.innerHTML = '';

        if (!this.content[this.tab]) {
            this.content[this.tab] = {};
        }

        Object.values(Sides).forEach((side) => {
            if (Object.hasOwn(this.content[this.tab], side)) {
                return;
            }

            this.content[this.tab][side] = [];
        });

        const content = this.content[this.tab];
        content.left.forEach((item) => this.left.appendChild(item));
        content.right.forEach((item) => this.right.appendChild(item));
    },

    _createControl(color, func) {
        const control = document.createElement('div');
        Object.assign(control.style, {
            width: '12px',
            height: '12px',
            background: color,
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
        });

        control.addEventListener('mouseenter', () => {
            control.style.opacity = '0.7';
        });

        control.addEventListener('mouseleave', () => {
            control.style.opacity = '1';
        });

        control.addEventListener('click', func);

        return control;
    },

    _dragify(item) {
        let draggin = false;

        let currentX, currentY;
        let initialX, initialY;

        item.addEventListener('mousedown', (e) => {
            draggin = true;

            const rect = this.main.getBoundingClientRect();
            initialX = e.clientX - rect.left;
            initialY = e.clientY - rect.top;

            Object.assign(this.main.style, {
                transform: 'none',
                left: rect.left + 'px',
                top: rect.top + 'px'
            });
        });

        document.addEventListener('mousemove', (e) => {
            if (!draggin) {
                return;
            }

            e.preventDefault();

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            Object.assign(this.main.style, {
                left: currentX + 'px',
                top: currentY + 'px'
            });
        });

        document.addEventListener('mouseup', () => {
            draggin = false;
        });
    }
};