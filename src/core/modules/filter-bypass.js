import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

import requestHooks from '../../utils/request-hooks.js';

import similarCharacters from '../.././../resources/similar-characters.json';

const BypassMode = {
    NoWidthSpace: 'No width space',
    SimilarCharacter: 'Character look-alike'
};

let bypassMethod = BypassMode.SimilarCharacter;

export class FilterBypass extends Module {
    constructor() {
        super({
            text: 'Filter bypass',
            tab: Tabs.Modules,
            side: Sides.Left,
            type: ModuleType.Toggle,
            info: 'Attemps to bypass the chat filter.'
        });

        this._lookalikes = {};
    }

    onInit() {
        this._lookalikes = similarCharacters;

        const self = this;

        requestHooks.onXHR.push(function(args) {
            const body = args[0];
            if (!this._hook || !self.state) {
                return;
            }

            const params = new URLSearchParams(body);
            if (!params.has('content')) {
                return;
            }

            const content = params.get('content');
            let bypassed = '';

            if (bypassMethod === BypassMode.NoWidthSpace) {
                bypassed = content.split(' ').map((word) => {
                    if (word.length <= 2) {
                        return word;
                    } else {
                        return word.split('').join('\u200D');
                    }
                }).join(' ');
            } else {
                bypassed = content
                    .split('')
                    .map((char) => self._lookalikes[char] ?? char)
                    .join('');
            }

            params.set('content', bypassed)
            args[0] = params.toString();
        });
    }
};

export class FilterBypassMode extends Module {
    constructor() {
        super({
            text: 'Bypass mode',
            tab: Tabs.Modules,
            side: Sides.Left,
            type: ModuleType.Dropdown,
            info: 'The method to use to bypass the message.',
            config: { items: [BypassMode.SimilarCharacter, BypassMode.NoWidthSpace] }
        });
    }

    onChange(change) {
        bypassMethod = change;
    }
}