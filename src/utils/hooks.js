export default {
	hooked: {},

	hookNotifis(t) {
		if (t) {
			this.hooked.callSuccess = callSuccess;
			callSuccess = () => {};
			return;
		}

		if (!this.hooked.callSuccess)
			return;

		callSuccess = this.hooked.callSuccess;
		delete this.hooked.callSuccess;
	},

	hookCloseRight() {
		let oldCloseRight = closeRight;

		closeRight = () => {
			prepareRight(0);
			userReload(1);

			closeRight = oldCloseRight;
			oldCloseRight = null;
		};
	}
};