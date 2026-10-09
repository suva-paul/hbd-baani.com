/* ==========================================================
   Forever v2 - utils.js
   ----------------------------------------------------------
   Shared Utility Functions
   Used throughout the entire project.
========================================================== */

"use strict";

/* ==========================================================
   DOM HELPERS
========================================================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) =>
    Array.from(document.querySelectorAll(selector));


/* ==========================================================
   RANDOM HELPERS
========================================================== */

function random(min, max) {

    return Math.random() * (max - min) + min;

}

function randomInt(min, max) {

    return Math.floor(random(min, max + 1));

}

function randomItem(array) {

    return array[
        Math.floor(Math.random() * array.length)
    ];

}


/* ==========================================================
   DELAY
========================================================== */

function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* ==========================================================
   SCREEN NAVIGATION
========================================================== */

const screens = {};

function initialiseScreens() {

    $$(".screen").forEach(screen => {

        screens[screen.id] = screen;

    });

}

function showScreen(id) {

    Object.values(screens).forEach(screen => {

        screen.classList.remove("active");
        screen.classList.remove("screen-enter");

    });

    const target = screens[id];

    if (!target) {

        console.warn("Screen not found:", id);

        return;

    }

    target.classList.add("active");
    target.classList.add("screen-enter");

}


/* ==========================================================
   TEXT
========================================================== */

function setText(id, text) {

    const element = document.getElementById(id);

    if (element) {

        element.textContent = text;

    }

}


/* ==========================================================
   BUTTON ENABLE / DISABLE
========================================================== */

function disable(element) {

    if (!element) return;

    element.disabled = true;

    element.style.opacity = ".6";

}

function enable(element) {

    if (!element) return;

    element.disabled = false;

    element.style.opacity = "1";

}


/* ==========================================================
   SOUND
========================================================== */

function playSound(path, volume = 1) {

    if (!path) return;

    const sound = new Audio(path);

    sound.volume = volume;

    sound.play().catch(() => {});

}


/* ==========================================================
   MUSIC FADE
========================================================== */

async function fadeAudio(audio, target, duration = 1000) {

    if (!audio) return;

    const steps = 20;

    const start = audio.volume;

    const step = (target - start) / steps;

    const delay = duration / steps;

    for (let i = 0; i < steps; i++) {

        audio.volume = clamp(
		audio.volume + step,
		0,
		1
	);

        await sleep(delay);

    }

    audio.volume = target;

}


/* ==========================================================
   CREATE ELEMENT
========================================================== */

function create(tag, className = "") {

    const el = document.createElement(tag);

    if (className) {

        el.className = className;

    }

    return el;

}


/* ==========================================================
   REMOVE AFTER
========================================================== */

function removeLater(element, time = 1000) {

    if (!element) return;

    setTimeout(() => {

        element.remove();

    }, time);

}


/* ==========================================================
   VIEWPORT
========================================================== */

function viewportWidth() {

    return window.innerWidth;

}

function viewportHeight() {

    return window.innerHeight;

}


/* ==========================================================
   MOBILE CHECK
========================================================== */

function isMobile() {

    return window.matchMedia("(pointer:coarse)").matches;

}


/* ==========================================================
   CLAMP
========================================================== */

function clamp(value, min, max) {

    return Math.min(max, Math.max(min, value));

}


/* ==========================================================
   SHUFFLE
========================================================== */

function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] =
        [copy[j], copy[i]];

    }

    return copy;

}


/* ==========================================================
   FORMAT BIRTHDAY
========================================================== */

function birthdayDigits() {

    const parts = CONFIG.birthday.split("-");

    const day = parts[0];
    const month = parts[1];

    const currentYear =
        new Date().getFullYear();

    return `${day}${month}${currentYear}`.split("");

}

/* ==========================================================
   DEBOUNCE
========================================================== */

function debounce(fn, delay = 300) {

    let timeout;

    return function (...args) {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            fn.apply(this, args);

        }, delay);

    };

}

/* ==========================================================
   READY
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initialiseScreens();

    }

);