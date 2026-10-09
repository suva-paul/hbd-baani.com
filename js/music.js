/* ==========================================================
   Forever v2 - music.js
   ----------------------------------------------------------
   Part A
   Music Controller
========================================================== */

"use strict";

const MusicModule = {

    audio: null,
    toggle: null,
    slider: null,

    playing: false,

    init() {

        this.audio = $("#bg-music");

        this.toggle = $("#music-toggle");

        this.slider = $("#volume-slider");

        if (!this.audio) return;

        this.audio.volume = CONFIG.musicVolume;

        this.registerEvents();

	this.updateButton();

    },

    registerEvents() {

        if (this.toggle) {

    		this.toggle.addEventListener(

        		"click",

        		() => this.togglePlayback()

    		);

	}

	if (this.slider) {

    		this.slider.addEventListener(

        		"input",

        		(event) => {

            		this.audio.volume =
                		parseFloat(event.target.value);

        		}

    		);

	}

        this.audio.addEventListener(

            "ended",

            () => {

                this.playing = false;

                this.updateButton();

            }

        );

    },



    async start() {

        if (this.playing) return;

        try {

            await this.audio.play();

            this.playing = true;

	    if (this.slider) {

    		this.audio.volume =
        		parseFloat(this.slider.value);

	    }

            this.updateButton();

        }

        catch (error) {

            console.warn(

                "Music autoplay blocked.",

                error

            );

        }

    },



    /* ======================================================
       Part B
    ====================================================== */

    togglePlayback() {

        // Coming in Part B

    },



    updateButton() {

        // Coming in Part B

    }

};



/* ==========================================================
   INITIALISE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        MusicModule.init();

    }

);

/* ==========================================================
   Forever v2 - music.js
   ----------------------------------------------------------
   Part B
   Playback Controls
========================================================== */

Object.assign(MusicModule, {

    async togglePlayback() {

        if (!this.audio) return;

        if (this.playing) {

            await fadeAudio(
                this.audio,
                0,
                500
            );

            this.audio.pause();

            this.audio.volume =
                this.slider
                    ? parseFloat(this.slider.value)
                    : CONFIG.musicVolume;

            this.playing = false;

            this.updateButton();

            return;

        }

        try {

            this.audio.volume = 0;

            await this.audio.play();

            this.playing = true;

            this.updateButton();

            const targetVolume =
                this.slider
                    ? parseFloat(this.slider.value)
                    : CONFIG.musicVolume;

            await fadeAudio(
                this.audio,
                targetVolume,
                700
            );

        }

        catch (error) {

            console.warn(
                "Unable to play music.",
                error
            );

        }

    },



    updateButton() {

        if (!this.toggle) return;

        this.toggle.textContent =
            this.playing
                ? "⏸️"
                : "▶️";

        this.toggle.setAttribute(

            "aria-label",

            this.playing
                ? "Pause music"
                : "Play music"

        );

    }

});