import Module from '../base.js';
import { ModuleType, Sides, Tabs } from '../../gui/main.js';

export default class CountrySearch extends Module {
    constructor() {
        super({
            text: 'Search users by country',
            tab: Tabs.Modules,
            side: Sides.Right,
            type: ModuleType.Button,
            info: 'Lets you search for people in a specific country.'
        });
    }

    onEnable() {
        const code = prompt('Country code to search, example: "sg" for Singapore.');
        if (!code) {
            return;
        }

        window.prepareRight(0);
        $.post('system/panel/user_list.php', {}, function(res) {
            $('#chat_right_data').html(res);
            window.firstPanel = '';

            document.querySelectorAll('#chat_right_data .user_item').forEach(item => {
                const country = item.getAttribute('data-country');
                if (country !== code.toUpperCase()) {
                    item.remove();
                }
            });

            hooks.closeRight();
        });
    }
};