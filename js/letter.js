/* ==========================================================
   Forever v2 - letter.js
   ----------------------------------------------------------
   Part A
   Envelope & Letter Initialisation
========================================================== */

"use strict";

const LetterModule = {

    envelope: null,
    letterScreen: null,
    typewriter: null,
    galleryButton: null,
    signature: null,

    opened: false,
    typing: false,

    init() {

        this.envelope =
            $("#birthday-envelope");

        this.letterScreen =
            $("#letter-content-screen");

        this.typewriter =
            $("#typewriter");

        this.galleryButton =
            $("#gallery-button");

        this.signature =
            $("#signature");

        if (!this.envelope) return;

        this.reset();

        this.registerEvents();

    },

    reset() {

        this.opened = false;

        this.typing = false;

	if(this.typewriter)
        	this.typewriter.textContent = "";

	if(this.signature)
        	this.signature.style.opacity = "0";

	if(this.galleryButton){

        	this.galleryButton.classList.add("hidden");

		this.galleryButton.disabled = false;
	}

        this.envelope.classList.remove("open");

    },

    registerEvents() {

        this.envelope.addEventListener(

            "click",

            () => this.openEnvelope(),

            { once: true }

        );

        this.envelope.addEventListener(

            "touchstart",

            () => this.openEnvelope(),

            {
                once: true,
                passive: true
            }

        );

    },

    async openEnvelope() {

        if (this.opened) return;

        this.opened = true;

        playSound(
            CONFIG.sounds.buttonClick,
            0.6
        );

        this.envelope.classList.add("open");

        await sleep(1200);

        showScreen("letter-content-screen");

        await sleep(500);

        this.startTyping();

    },

    /* ======================================================
       Part B
    ====================================================== */

    async startTyping() {

        // Coming in Part B

    },

    finishLetter() {

        // Coming in Part C

    }

};


/* ==========================================================
   INITIALISE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        LetterModule.init();

    }

);

/* ==========================================================
   Forever v2 - letter.js
   ----------------------------------------------------------
   Part B
   Typewriter Animation
========================================================== */

Object.assign(LetterModule, {

    async startTyping() {

        if (this.typing) return;

        this.typing = true;

        this.typewriter.innerHTML = "";

        const text = CONFIG.letter;

        /* Create blinking cursor */

        const cursor = create(
            "span",
            "typewriter-cursor"
        );

        this.typewriter.appendChild(cursor);

        for (const character of text) {

            if (character === "\n") {

                cursor.insertAdjacentHTML(
                    "beforebegin",
                    "<br>"
                );

            } else {

                cursor.insertAdjacentText(
                    "beforebegin",
                    character
                );

            }

            /* Optional typing sound */

            /*
            playSound(
                CONFIG.sounds.buttonClick,
                0.08
            );
            */

            await sleep(
                CONFIG.typewriterSpeed
            );

        }

        cursor.remove();

        this.typing = false;

        this.finishLetter();

    }

});

/* ==========================================================
   Forever v2 - letter.js
   ----------------------------------------------------------
   Part C
   Letter Completion & Gallery Transition
========================================================== */

Object.assign(LetterModule, {

    finishLetter() {

        /* Show signature */

        this.signature.classList.add("fade-in");

        this.signature.style.opacity = "1";

        /* Small celebration */

        if (
            typeof AnimationModule !== "undefined" &&
            typeof AnimationModule.confetti === "function"
        ) {

            AnimationModule.confetti(
		CONFIG.animation.confettiCount ?? 60
	);

        }

        /* Reveal Gallery button */

        setTimeout(() => {

            this.galleryButton.classList.remove("hidden");

            this.galleryButton.style.display = "inline-block";

            this.galleryButton.style.visibility = "visible";

            this.galleryButton.style.opacity = "1";

            this.galleryButton.classList.add("success-pop");

        }, 700);

        /* Register click only once */

        this.galleryButton.addEventListener(

            "click",

            () => {

                this.openGallery();

            },

            { once: true }

        );

    },



    async openGallery() {

        playSound(
            CONFIG.sounds.buttonClick,
            0.7
        );

        disable(this.galleryButton);

        await sleep(500);

        showScreen("gallery-screen");

        if (

            typeof GalleryModule !== "undefined" &&

            typeof GalleryModule.init === "function"

        ) {

            GalleryModule.init();

        }

    }

});