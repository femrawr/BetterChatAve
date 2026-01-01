import main from './main.js';

import { Sides, Tabs } from './main.js';

export default class Element {
    constructor() {
        this.side = Sides.Left;
        this.tab = Tabs.Modules
    }

    setSide(side) {
        this.side = side;
        return this;
    }

    setTab(tab) {
        this.tab = tab;
        return this;
    }

    _buildInto(item) {
        main.content[this.tab][this.side].push(item);

        if (main.tab == this.tab) {
            main._renderTab();
        }
    }
};