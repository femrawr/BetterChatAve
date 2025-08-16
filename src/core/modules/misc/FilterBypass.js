import hooks from '../../../utils/hooks.js';
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

        hooks.xhrFuncs.push(function(args) {
            const body = args[0];
            if (!this._hook || typeof body !== 'string' || !self.state) {
                return;
            }

            const params = new URLSearchParams(body);
            if (params.has('content')) {
                const content = params.get('content');
                const bypass = content.split('').join('\u200D');

                params.set('content', bypass)
                args[0] = params.toString();
            }
        });
    }
};