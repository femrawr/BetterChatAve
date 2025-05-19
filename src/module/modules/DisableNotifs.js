import hooks from '../../utils/hooks';
import Module from '../base';

export default class DisableNotifs extends Module {
	constructor() {
		super('Disable Success Notification', 'Toggle');
	}

	onEnabled() {
		hooks.hookNotifis(true);
	}

	onDisabled() {
		hooks.hookNotifis(false);
	}
};