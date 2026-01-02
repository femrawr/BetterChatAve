import gui, { Sides, Tabs } from './main.js';

export default class Element {
    constructor() {
        this.side = Sides.Left;
        this.tab = Tabs.Modules;
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
        if (!gui.content[this.tab]) {
            gui.content[this.tab] = {};
        }

        Object.values(Sides).forEach((side) => {
            if (Object.hasOwn(gui.content[this.tab], side)) {
                return;
            }

            gui.content[this.tab][side] = [];
        });

        gui.content[this.tab][this.side].push(item);

        if (gui.tab !== this.tab) {
            return;
        }

        gui._renderTab();
    }
};