import hooks from '../../../utils/hooks.js';
import Module from '../../base.js';

export default class CountrySearch extends Module {
    constructor() {
        super({
            name: 'Country Search',
            sect: 'Miscellaneous',
            type: 'Button',
            tip: 'Search for people based on thier country code.'
        });
    }

    onActive() {
        const code = prompt('Country code to search, example: "sg" for Singapore.');
        if (!code) return;

        window.prepareRight(0);
        window.$.post('system/panel/user_list.php', {}, function(res) {
            window.$('#chat_right_data').html(res);
            window.firstPanel = '';

            document.querySelectorAll('#chat_right_data .user_item').forEach(item => {
                const country = item.getAttribute('data-country');
                if (country !== code.toUpperCase()) item.remove();
            });

            hooks.closeRight();
        });
    }
};