export default {
    gui(tag, group, text) {
        const element = document.createElement(tag);
        if (text) element.textContent = text;
        if (group) {
            if (Array.isArray(group)) {
                element.className = group.map(cls => 'gui-' + cls).join(' ');
            } else {
                element.className = 'gui-' + group;
            }
        }

        return element;
    }
}