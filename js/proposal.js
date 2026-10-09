/* ==========================================================
   Forever v2 - proposal.js
   ----------------------------------------------------------
   Handles:
   - Yes button
   - Escaping No button
   - Funny messages
========================================================== */

"use strict";

const ProposalModule = {

    yesBtn: null,
    noBtn: null,
    message: null,
    area: null,

    init() {

        this.yesBtn = $("#yes-btn");
        this.noBtn = $("#no-btn");
        this.message = $("#no-message");
        this.area = $(".button-area");

        if (!this.yesBtn || !this.noBtn) return;

        this.registerEvents();

    },

    registerEvents() {

        this.yesBtn.addEventListener(
            "click",
            () => this.accept()
        );

        this.noBtn.addEventListener(
            "mouseenter",
            () => this.moveNoButton()
        );

        this.noBtn.addEventListener(
            "touchstart",
            (event) => {

                event.preventDefault();

                this.moveNoButton();

            },
            { passive: false }
        );

    },

    moveNoButton() {

	if(!this.area || !this.noBtn) return;

        const areaWidth = this.area.clientWidth;
        const areaHeight = this.area.clientHeight;

        const buttonWidth = this.noBtn.offsetWidth;
        const buttonHeight = this.noBtn.offsetHeight;

        const left = randomInt(
            0,
            areaWidth - buttonWidth
        );

        const top = randomInt(
            0,
            areaHeight - buttonHeight
        );

        this.noBtn.style.left = left + "px";
        this.noBtn.style.top = top + "px";

        this.noBtn.style.right = "auto";
        this.noBtn.style.transform = "none";

        this.showFunnyMessage();

    },

    showFunnyMessage() {

	if(this.message) {

        	this.message.textContent =
            	randomItem(CONFIG.noButtonMessages);
	}

    },

    async accept() {

        playSound(
            CONFIG.sounds.success,
            0.8
        );

        disable(this.yesBtn);
        disable(this.noBtn);

        this.createHeartBurst();

        if (
            typeof MusicModule !== "undefined" &&
            typeof MusicModule.start === "function"
        ) {

            MusicModule.start();

        }

        await sleep(1800);

        showScreen("balloon-screen");

        if (
            typeof BalloonModule !== "undefined" &&
            typeof BalloonModule.init === "function"
        ) {

            BalloonModule.init();

        }

    },

    createHeartBurst() {

        const container = $("#hearts-container");

        if (!container) return;

        for (let i = 0; i < 35; i++) {

            const heart = create("div", "heart");

            heart.textContent = "❤️";

            heart.style.left =
                randomInt(0, window.innerWidth) + "px";

            heart.style.fontSize =
                randomInt(18, 40) + "px";

            heart.style.animationDuration =
                random(2.5, 5) + "s";

            container.appendChild(heart);

            removeLater(heart, 5000);

        }

        if (
            typeof AnimationModule !== "undefined" &&
            typeof AnimationModule.confetti === "function"
        ) {

            AnimationModule.confetti(
		CONFIG.animation.confettiCount
	);

        }

    }

};


/* ==========================================================
   GLOBAL
========================================================== */

function repositionNoButton() {

    if (
        typeof ProposalModule !== "undefined" &&
        ProposalModule.noBtn
    ) {

        ProposalModule.moveNoButton();

    }

}