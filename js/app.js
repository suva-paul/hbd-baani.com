/* ==========================================================
   Forever v2 - app.js
   ----------------------------------------------------------
   Main Application Controller
========================================================== */

"use strict";

const App = {

    music: null,

    init() {

        console.log("Forever v2 starting...");

        this.loadConfig();

        this.loadAudio();

        this.registerEvents();

        this.hideSplash();

    },

    loadConfig() {

        document.title =
            `Happy Birthday ${CONFIG.girlfriendName} ❤️`;

        setText(
            "proposal-title",
            CONFIG.proposalTitle
        );

        setText(
            "proposal-question",
            CONFIG.proposalQuestion
        );

        setText(
            "birthday-heading",
            CONFIG.birthdayHeading
        );

        setText(
            "letter-title",
            CONFIG.letterTitle
        );

        setText(
            "gallery-title",
            CONFIG.galleryTitle
        );

        setText(
            "ending-title",
            CONFIG.endingTitle
        );

        setText(
            "ending-message",
            CONFIG.endingMessage
        );

        setText(
            "hint",
            `Hint: ${CONFIG.passwordHint}`
        );

	const yesBtn = $("#yes-btn");
	const noBtn = $("#no-btn");

	if(yesBtn)
        	yesBtn.textContent = CONFIG.yesButtonText;

	if(noBtn)
        	noBtn.textContent = CONFIG.noButtonText;

    },

    loadAudio() {

        this.music =
            $("#bg-music");

	if(this.music){
        	this.music.src = CONFIG.music;

        	this.music.volume = CONFIG.musicVolume;
	}

	const pop = $("#pop-sound");
	const click = $("#click-sound");
	const success = $("#success-sound");

	if(pop)
        	pop.src = CONFIG.sounds.balloonPop;

	if(click)
        	click.src = CONFIG.sounds.buttonClick;

	if(success)
        	success.src = CONFIG.sounds.success;

    },

    registerEvents() {

        window.addEventListener(

            "resize",

            () => {

                if (typeof repositionNoButton === "function") {

                    repositionNoButton();

                }

            }

        );

    },

    hideSplash() {

        window.addEventListener(

            "load",

            async () => {

                await sleep(1200);

                $("#splash-screen")
                    .classList.add("hidden");

            }

        );

    }

};



/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        App.init();

    }

);