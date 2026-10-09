/* ==========================================================
   Forever v2 - animations.js
   ----------------------------------------------------------
   Part A
   Background Effects
   - Stars
   - Floating Hearts
   - Sparkles
========================================================== */

"use strict";

const AnimationModule = {

    starsContainer: null,
    heartsContainer: null,
    sparklesContainer: null,
    petalsContainer: null,
    fireworksContainer: null,

    heartTimer: null,
    sparkleTimer: null,
    petalTimer: null,

    init() {

        this.starsContainer = $("#stars");
        this.heartsContainer = $("#hearts-container");
        this.sparklesContainer = $("#sparkles-container");
        this.petalsContainer = $("#petals-container");
        this.fireworksContainer = $("#fireworks-container");

        this.createStars();

        this.startHearts();

        this.startSparkles();

    },



    /* ======================================================
       STARS
    ====================================================== */

    createStars() {

	if(!this.starsContainer) return;

        if (!CONFIG.effects.stars) return;

        this.starsContainer.innerHTML = "";

        for (let i = 0; i < CONFIG.animation.starCount; i++) {

            const star = create("span", "star");

            star.style.left =
                randomInt(0, window.innerWidth) + "px";

            star.style.top =
                randomInt(0, window.innerHeight) + "px";

            star.style.animationDelay =
                random(0, 6) + "s";

            star.style.animationDuration =
                random(2, 6) + "s";

            this.starsContainer.appendChild(star);

        }

    },



    /* ======================================================
       HEARTS
    ====================================================== */

    startHearts() {

        if (!CONFIG.effects.floatingHearts) return;

        this.stopHearts();

        this.heartTimer = setInterval(() => {

            this.spawnHeart();

        }, CONFIG.animation.heartInterval);

    },



    stopHearts() {

        if (this.heartTimer) {

            clearInterval(this.heartTimer);

            this.heartTimer = null;

        }

    },



    spawnHeart() {

        const heart = create("div", "heart");

        heart.textContent = "❤️";

        heart.style.left =
            randomInt(5, 95) + "%";

        heart.style.fontSize =
            randomInt(16, 34) + "px";

        heart.style.animationDuration =
            random(4, 8) + "s";

	if(!this.heartsContainer) return;

        this.heartsContainer.appendChild(heart);

        removeLater(heart, 8500);

    },



    /* ======================================================
       SPARKLES
    ====================================================== */

    startSparkles() {

        if (!CONFIG.effects.sparkles) return;

        this.stopSparkles();

        this.sparkleTimer = setInterval(() => {

            this.spawnSparkle();

        }, CONFIG.animation.sparkleInterval);

    },



    stopSparkles() {

        if (this.sparkleTimer) {

            clearInterval(this.sparkleTimer);

            this.sparkleTimer = null;

        }

    },



    spawnSparkle() {

        const sparkle =
            create("div", "sparkle");

        sparkle.style.left =
            randomInt(0, window.innerWidth) + "px";

        sparkle.style.top =
            randomInt(0, window.innerHeight) + "px";

        sparkle.style.animationDuration =
            random(1.2, 2.5) + "s";

	if(!this.sparklesContainer) return;

        this.sparklesContainer.appendChild(sparkle);

        removeLater(sparkle, 2500);

    },



    /* ======================================================
       Part B
    ====================================================== */

    startPetals() {

        // Coming in Part B

    },



    confetti() {

        // Coming in Part C

    },



    fireworks() {

        // Coming in Part C

    }

};



/* ==========================================================
   INITIALISE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        AnimationModule.init();

    }

);

/* ==========================================================
   Forever v2 - animations.js
   ----------------------------------------------------------
   Part B
   Rose Petals
   Cursor Trail
========================================================== */

Object.assign(AnimationModule, {

    /* ======================================================
       ROSE PETALS
    ====================================================== */

    startPetals() {

        if (!CONFIG.effects.petals) return;

        this.stopPetals();

        this.petalTimer = setInterval(() => {

            this.spawnPetal();

        }, CONFIG.animation.petalInterval);

    },



    stopPetals() {

        if (this.petalTimer) {

            clearInterval(this.petalTimer);

            this.petalTimer = null;

        }

    },



    spawnPetal() {

        const petal = create(
            "div",
            "petal"
        );

        petal.style.left =
            randomInt(0, window.innerWidth) + "px";

        petal.style.animationDuration =
            random(7, 12) + "s";

        petal.style.animationDelay =
            random(0, 1) + "s";

        petal.style.transform =
            `rotate(${randomInt(0,360)}deg)`;

	if(!this.petalsContainer) return;

        this.petalsContainer.appendChild(
            petal
        );

        removeLater(
            petal,
            13000
        );

    },



    /* ======================================================
       HEART CURSOR TRAIL
    ====================================================== */

    enableCursorTrail() {

        if (!CONFIG.effects.cursorTrail) {

            return;

        }

        document.addEventListener(

            "mousemove",

            this.cursorHandler

        );

    },



    disableCursorTrail() {

        document.removeEventListener(

            "mousemove",

            this.cursorHandler

        );

    },



    cursorHandler(event) {

        if (Math.random() > 0.45) {

            return;

        }

        const heart =
            create("div", "heart");

        heart.textContent = "❤";

        heart.style.position = "fixed";

        heart.style.left =
            event.clientX + "px";

        heart.style.top =
            event.clientY + "px";

        heart.style.pointerEvents =
            "none";

        heart.style.fontSize =
            randomInt(10, 18) + "px";

        heart.style.animationDuration =
            random(1.5, 3) + "s";

        document.body.appendChild(
            heart
        );

        removeLater(
            heart,
            3000
        );

    },



    /* ======================================================
       START / STOP
    ====================================================== */

    startAll() {

        this.startHearts();

        this.startSparkles();

        this.startPetals();

        this.enableCursorTrail();

    },



    stopAll() {

        this.stopHearts();

        this.stopSparkles();

        this.stopPetals();

        this.disableCursorTrail();

    }

});

/* ==========================================================
   Forever v2 - animations.js
   ----------------------------------------------------------
   Part C
   Confetti & Fireworks Engine
========================================================== */

Object.assign(AnimationModule, {

    /* ======================================================
       CONFETTI
    ====================================================== */

    confetti(count = 80) {

        if (!this.fireworksContainer) return;

        const colours = [

            "#ff4d6d",
            "#ffd166",
            "#06d6a0",
            "#118ab2",
            "#c77dff",
            "#ffffff"

        ];

        for (let i = 0; i < count; i++) {

            const piece = create(
                "div",
                "confetti"
            );

            piece.style.left =
                randomInt(0, window.innerWidth) + "px";

            piece.style.top = "-20px";

            piece.style.background =
                randomItem(colours);

            piece.style.width =
                randomInt(6, 12) + "px";

            piece.style.height =
                randomInt(8, 18) + "px";

            piece.style.opacity =
                random(0.7, 1);

            piece.style.transform =
                `rotate(${randomInt(0,360)}deg)`;

            piece.style.animationDuration =
                random(2.5, 5) + "s";

            this.fireworksContainer.appendChild(
                piece
            );

            removeLater(
                piece,
                5500
            );

        }

    },



    /* ======================================================
       FIREWORKS
    ====================================================== */

    fireworks(bursts = 8) {

        for (let i = 0; i < bursts; i++) {

            setTimeout(() => {

                this.fireworkBurst(

                    randomInt(
                        80,
                        window.innerWidth - 80
                    ),

                    randomInt(
                        80,
                        window.innerHeight / 2
                    )

                );

            }, i * 280);

        }

    },



    fireworkBurst(x, y) {

        const colours = [

            "#ff4d6d",
            "#ffd166",
            "#06d6a0",
            "#4cc9f0",
            "#ffffff",
            "#c77dff"

        ];

        for (let i = 0; i < 40; i++) {

            const particle = create(

                "div",

                "firework-particle"

            );

            const angle =
                (Math.PI * 2 * i) / 40;

            const distance =
                randomInt(60, 150);

            particle.style.left =
                x + "px";

            particle.style.top =
                y + "px";

            particle.style.background =
                randomItem(colours);

            particle.style.setProperty(

                "--dx",

                Math.cos(angle) *
                    distance +
                    "px"

            );

            particle.style.setProperty(

                "--dy",

                Math.sin(angle) *
                    distance +
                    "px"

            );

            particle.style.animationDuration =
                random(0.8, 1.6) + "s";

	    if(!this.fireworksContainer) return;

            this.fireworksContainer.appendChild(
                particle
            );

            removeLater(
                particle,
                1800
            );

        }

        this.createSmoke(x, y);

    },



    /* ======================================================
       SMOKE
    ====================================================== */

    createSmoke(x, y) {

        for (let i = 0; i < 10; i++) {

            const smoke = create(

                "div",

                "smoke"

            );

            smoke.style.left =
                x + randomInt(-10,10) + "px";

            smoke.style.top =
                y + randomInt(-10,10) + "px";

            smoke.style.animationDuration =
                random(1.5,3) + "s";

	    if(!this.fireworksContainer) return;

            this.fireworksContainer.appendChild(
                smoke
            );

            removeLater(
                smoke,
                3200
            );

        }

    }

});

/* ==========================================================
   Forever v2 - animations.js
   ----------------------------------------------------------
   Part D
   Final Initialisation & Optimisation
========================================================== */

Object.assign(AnimationModule, {

    /* ======================================================
       REDUCED MOTION SUPPORT
    ====================================================== */

    prefersReducedMotion() {

        return window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    },



    /* ======================================================
       WINDOW RESIZE
    ====================================================== */

    handleResize() {

        window.addEventListener(

            "resize",

            debounce(() => {

                this.createStars();

            }, 300)

        );

    },



    /* ======================================================
       CLEANUP
    ====================================================== */

    clearContainers() {

        [

            this.heartsContainer,

            this.sparklesContainer,

            this.petalsContainer,

            this.fireworksContainer

        ].forEach(container => {

            if (container) {

                container.innerHTML = "";

            }

        });

    },



    destroy() {

        this.stopAll();

        this.clearContainers();

    },



    /* ======================================================
       STARTUP
    ====================================================== */

    start() {

        if (this.prefersReducedMotion()) {

            console.log(

                "Reduced motion detected."

            );

            return;

        }

	this.createStars();

        this.startAll();

        this.handleResize();

    }

});



/* ==========================================================
   START ANIMATION ENGINE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        AnimationModule.init();

        AnimationModule.start();

    }

);



/* ==========================================================
   PAGE VISIBILITY
========================================================== */

document.addEventListener(

    "visibilitychange",

    () => {

        if (document.hidden) {

            AnimationModule.stopAll();

        }

        else {

            AnimationModule.startAll();

        }

    }

);



/* ==========================================================
   BEFORE UNLOAD
========================================================== */

window.addEventListener(

    "beforeunload",

    () => {

        AnimationModule.destroy();

    }

);