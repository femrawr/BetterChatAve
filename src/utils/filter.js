import badWords from '../../resources/words.json';

export default {
	badWords: [],

	sesRegex: /^[0-9a-fA-F]{66}$/,
	filRegex: /[`'/.,:;_-]/g,

	init() {
		this.badWords = badWords;
	},

	hasSessToken(text) {
		return text.split(' ').some(word => this.sesRegex.test(word));
	},

	hasBypassedText(text) {
		return [...text].some(char => {
			const code = char.codePointAt(0);
			return code >= 0x1D400 && code <= 0x1D7FF;
		});
	},

	hasBadWord(text) {
		const found1 = this.badWords.find(word => text.includes(' ' + word));
		if (found1) return found1;

		const found2 = this.badWords.find(word => text.includes(word + ' '));
		if (found2) return found2;

		if (this.hasSessToken(text)) return 'sess token';
		if (this.hasBypassedText(text)) return 'bypassed text';

		return null;
	}
};