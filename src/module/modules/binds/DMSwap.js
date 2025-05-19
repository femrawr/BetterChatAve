import Module from '../../base';

export default class DMSwap extends Module {
	constructor() {
		super('Dm Swap', 'Bind', 'L');
	}

	onClicked() {
		const menu = document.getElementById('private_menu');
		if (menu.style.display === 'none') getPrivate();

		setTimeout(() => {
			const button = document.querySelector('.fmenu_name.gprivate');
			if (button) button.click();
		}, 460);

		setTimeout(() => {
			const input = document.querySelector('#message_content');
			if (input) input.focus();
		}, 460);
	}
};