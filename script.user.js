// ==UserScript==
// @name         Clicker
// @namespace    http://tampermonkey.net/
// @version      2026-02-10
// @description  click click click
// @author       You
// @match        https://ava.cqcomenius.ruipena.pt/mod/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ruipena.pt
// @grant        none
// @run-at       document-idle
// ==/UserScript==

function tick() {
    const links = Array.from(document.querySelectorAll('a.courseindex-link.text-truncate'));
    if (!links.length)
    {
        console.log('no links found. go back');
        history.back();
        return;
    }

    const currentUrl = location.href;
    const re = /^https:\/\/ava\.cqcomenius\.ruipena\.pt\/mod\/(resource|url)\/view\.php\?id=[0-9]*$/;
    const filtered = links.filter(a =>
                                  a.href
                                  && a.href !== currentUrl
                                  && (a.href.startsWith('https://ava.cqcomenius.ruipena.pt/mod/resource') || a.href.startsWith('https://ava.cqcomenius.ruipena.pt/mod/url')));
    if (!filtered.length)
    {
        console.log('all links were filtered');
        return;
    }

    const randomLink = filtered[Math.floor(Math.random() * filtered.length)];
    const timeoutSeconds = 60*10;
    const timeout = 1000 * timeoutSeconds;
    console.log(`after ${timeoutSeconds} seconds link ${randomLink} will be clicked`);
    setTimeout(() => {
        console.log(`click {randomLink}`);
        randomLink.click();
    }, timeout);
}

(function() {
    'use strict';

    setTimeout(tick, 1000 * 5);
})();
