import Module from '../../base';

export default class QuickBlock extends Module {
	constructor() {
		super('Quick Block', 'Bind', 'B');
	}

	onClicked() {
		if (currentPrivate === 0) return;
		ignoreThisUser();

		const button = document.getElementById('private_close');
		if (button) button.click();
	}
};