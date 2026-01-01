import Element from './base.js';

export default class Divider extends Element {
    constructor() {
        super();
    }

    build() {
        const separator = document.createElement('div');
        Object.assign(separator.style, {
            height: '1px',
            background: '#2a2a2a',
            margin: '15px 0'
        });

        this._buildInto(separator);
        return this;
    }
};