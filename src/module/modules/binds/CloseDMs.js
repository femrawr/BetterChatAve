import Module from '../../base';

export default class CloseDMs extends Module {
	constructor() {
		super('Close DMS', 'Bind', 'P');
	}

	onClicked() {
		togglePrivate(1);
	}
};