// ==UserScript==
// @name         better chat ave
// @version      15/8/2025 - 2.0.0
// @description  tampermonkey script to make websites like chat avenue abit better
// @author       femrawr
// @match        *://www.chat-avenue.com/*
// @match        *://www.teen-chat.org/*
// ==/UserScript==

(() => {
    'use strict';

    fetch('https://raw.githubusercontent.com/femrawr/BetterChatAve/refs/heads/main/build/main.min.js')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`http error, status: ${res.status}`);
            }

            return res.text();
        })
        .then((src) => new Function(src)())
        .catch((_) => console.error('an error occurred while executing'));
})();