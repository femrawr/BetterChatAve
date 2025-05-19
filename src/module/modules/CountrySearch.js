import hooks from '../../utils/hooks';
import Module from '../base';

export default class CountrySearch extends Module {
	constructor() {
		super('Search By Country', 'Button');
	}

	onClicked() {
		const code = prompt('country code to search, example: "sg" for singapore');
		if (!code) return;

		prepareRight(0);
		$.post('system/panel/user_list.php', {}, function(res) {
			$('#chat_right_data').html(res);
			firstPanel = '';

			document.querySelectorAll('#chat_right_data .user_item').forEach(item => {
				const country = item.getAttribute('data-country');
				if (country !== code.toUpperCase()) item.remove();
			});

			hooks.hookCloseRight();
		});
	}
};