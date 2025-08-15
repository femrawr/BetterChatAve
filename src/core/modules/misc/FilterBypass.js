import Module from '../../base.js';

export default class FilterBypass extends Module {
    constructor() {
        super({
            name: 'Filter Bypass',
            sect: 'Miscellaneous',
            type: 'Toggle',
            tip: 'Bypasses the chat filter.'
        });
    }

    onInit() {
        const self = this;

        const oldOpen = XMLHttpRequest.prototype.open;
        const oldSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(...args) {
            this._hook = /(?:chat|private)_process\.php/.test(args[1]);
            return oldOpen.apply(this, args);
        };

        XMLHttpRequest.prototype.send = function(body) {
            if (!this._hook || typeof body !== 'string' || !self.state) {
                return oldSend.call(this, body);
            }

            const params = new URLSearchParams(body);
            if (params.has('content')) {
                const content = params.get('content');
                const bypass = content.split('').join('\u200D');

                params.set('content', bypass)
                body = params.toString();
            }

            return oldSend.call(this, body);
        };
    }
};