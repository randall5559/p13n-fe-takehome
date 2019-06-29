'use strict';

const alreadyViewed = [];
const columns = getColumnsForDevice('.column');

// listen to resize event
window.addEventListener('resize', onEventTrigger);

// listen to scroll events
window.addEventListener('scroll', onEventTrigger);

/**
 * Firer on resize or scroll of browser
 */
function onEventTrigger() {
    columns.forEach(column => {
        const windowBottomPosition = window.scrollY + window.innerHeight;
        const positions = getElementPositions(column);

        Object.keys(positions).forEach(pos => {
            if (positions[pos] <= windowBottomPosition && !alreadyViewed.includes(`${column.id}-${pos}`)) {
                alreadyViewed.push(`${column.id}-${pos}`);
                console.log( getConsoleViewMessages(column.id)[pos] );
            }
        });
    });
}

/**
 * Bring back all column elements for a specific device
 *
 * @param {*} selector
 * @returns
 */
function getColumnsForDevice(selector) {
    const device = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 768
        ? 'computer'
        : 'mobile';

    return Array.from(document.querySelectorAll(selector))
        .filter(column =>
            !column.className.includes(`${device} only`) && !column.textContent.trim().includes(`${device} only`)
        );
}

/**
 * Get the top, mid, and bottom position of a DOM element
 *
 * @param {*} element
 * @returns
 */
function getElementPositions(element) {
    const top = element ? element.getBoundingClientRect().top - document.body.getBoundingClientRect().top : 0;
    const mid = top + (element.clientHeight / 2);
    const bottom = top + element.clientHeight;

    return { top, mid, bottom };
}

/**
 * Retrieve an object element console messages
 *
 * @param {*} id
 * @returns
 */
function getConsoleViewMessages(id) {
    return {
        top: `Column with id: ${id} started to become visible on the page.`,
        mid: `Column with id: ${id} is now more than 50% visible on the page.`,
        bottom: `Column with id: ${id} is now fully visible on the page.`
    }
}