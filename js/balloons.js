/* ==========================================================
   Forever v2 - balloons.js
   ----------------------------------------------------------
   Part A
   Balloon Creation & Initialisation
========================================================== */

"use strict";

const BalloonModule = {

    container: null,
    progress: null,
    openButton: null,

    balloons: [],
    poppedCount: 0,

    init() {

        this.container = $("#balloon-container");
        this.progress = $("#balloon-progress");
        this.openButton = $("#open-letter-btn");

        if (!this.container) return;

        this.reset();

        this.createBalloons();

        this.updateProgress();

    },

    reset() {

        this.container.innerHTML = "";

        this.balloons = [];

        this.poppedCount = 0;

	this.completed = false;

	if(this.openButton){

        	this.openButton.classList.add("hidden");

		this.openButton.disabled = false;
	}

    },

    createBalloons() {

        birthdayDigits().forEach((digit, index) => {

            const balloon =
                this.createBalloon(digit, index);

            this.container.appendChild(balloon);

            this.balloons.push(balloon);

        });

    },

    createBalloon(digit, index) {

        const balloon = create(
            "div",
            "balloon float"
        );

        balloon.dataset.index = index;

        balloon.dataset.digit = digit;

        balloon.dataset.popped = "false";

        balloon.textContent = "?";

        balloon.style.background =
            CONFIG.balloonColours[
                index % CONFIG.balloonColours.length
            ];

        balloon.addEventListener(

            "click",

            () => this.pop(balloon)

        );

        balloon.addEventListener(

            "touchstart",

            () => this.pop(balloon),

            { passive: true }

        );

        return balloon;

    },

    updateProgress() {

	if(this.progress){

        	this.progress.textContent =
            	`${this.poppedCount} / ${CONFIG.totalBalloons} Revealed`;
	}

    },

    /* ======================================================
       These methods will be added in Part B
    ====================================================== */

    pop(balloon) {

        // Coming in Part B

    },

    checkCompletion() {

        // Coming in Part C

    }

};

/* ==========================================================
   Forever v2 - balloons.js
   ----------------------------------------------------------
   Part B
   Balloon Pop Logic
========================================================== */

/* ==========================================================
   Extend BalloonModule
========================================================== */

Object.assign(BalloonModule, {

    pop(balloon) {

        if (!balloon) return;

        if (balloon.dataset.popped === "true") {

            return;

        }

        balloon.dataset.popped = "true";

        playSound(
            CONFIG.sounds.balloonPop,
            0.7
        );

        balloon.classList.add("popping");

        setTimeout(() => {

            balloon.classList.remove("popping");

            balloon.classList.add("popped");

            balloon.textContent =
                balloon.dataset.digit;

        }, 250);

        this.poppedCount++;

        this.updateProgress();

        this.createPopBurst(balloon);

        this.checkCompletion();

    },

    createPopBurst(balloon) {

        const rect =
            balloon.getBoundingClientRect();

        const container =
            $("#sparkles-container");

        if (!container) return;

        for (let i = 0; i < 12; i++) {

            const sparkle =
                create("div", "sparkle");

            sparkle.style.left =
                (rect.left + rect.width / 2) + "px";

            sparkle.style.top =
                (rect.top + rect.height / 2) + "px";

            sparkle.style.animationDuration =
                random(0.6, 1.2) + "s";

            sparkle.style.transform =
                `translate(
                    ${random(-40,40)}px,
                    ${random(-40,40)}px
                )`;

            container.appendChild(sparkle);

            removeLater(
                sparkle,
                1300
            );

        }

    }

});

/* ==========================================================
   Forever v2 - balloons.js
   ----------------------------------------------------------
   Part C
   Completion Logic
========================================================== */

Object.assign(BalloonModule, {

    completed: false,

    checkCompletion() {

        if (this.completed) return;

        if (this.poppedCount < CONFIG.totalBalloons) {

            return;

        }

        this.completed = true;

        playSound(
            CONFIG.sounds.success,
            0.9
        );

        this.celebrate();

        this.showLetterButton();

    },

    celebrate() {

        /* Fireworks */

        if (
            typeof AnimationModule !== "undefined" &&
            typeof AnimationModule.fireworks === "function"
        ) {

            AnimationModule.fireworks(
		CONFIG.animation.fireworksCount
	);

        }

        /* Confetti */

        if (
            typeof AnimationModule !== "undefined" &&
            typeof AnimationModule.confetti === "function"
        ) {

            AnimationModule.confetti(
		CONFIG.animation.confettiCount
	);

        }

        /* Screen shake */

        document.body.classList.add("shake");

        setTimeout(() => {

            document.body.classList.remove("shake");

        }, 500);

    },

    showLetterButton() {

        this.openButton.classList.remove("hidden");

        this.openButton.classList.add("success-pop");

        this.openButton.addEventListener(

            "click",

            () => {

                this.openLetter();

            },

            { once: true }

        );

    },

    async openLetter() {

        playSound(
            CONFIG.sounds.buttonClick,
            0.7
        );

        this.openButton.disabled = true;

        await sleep(600);

        showScreen("letter-screen");

        if (
            typeof LetterModule !== "undefined" &&
            typeof LetterModule.init === "function"
        ) {

            LetterModule.init();

        }

    }

});