/* ==========================================================
   Forever v2 - gallery.js
   ----------------------------------------------------------
   Part A
   Gallery Initialisation
========================================================== */

"use strict";

const GalleryModule = {

    grid: null,
    lightbox: null,
    lightboxImage: null,
    closeButton: null,
    finalButton: null,

    init() {

        this.grid = $("#gallery-grid");

        this.lightbox = $("#lightbox");

        this.lightboxImage = $("#lightbox-image");

        this.closeButton = $("#close-lightbox");

        this.finalButton = $("#final-surprise-btn");

        if (!this.grid) return;

        this.buildGallery();

        this.registerEvents();

    },

    buildGallery() {

        this.grid.innerHTML = "";

        CONFIG.photos.forEach((photo, index) => {

            const card =
                this.createPhotoCard(photo, index);

            this.grid.appendChild(card);

        });

    },

    createPhotoCard(photo, index) {

        const card =
            create("div", "photo-card");

        card.style.animationDelay =
            `${index * 0.12}s`;

        const image =
            create("img");

        image.src = photo.image;

        image.alt =
            photo.caption;

        image.loading = "lazy";

        const caption =
            create("p");

        caption.textContent =
            photo.caption;

        card.appendChild(image);

        card.appendChild(caption);

        card.addEventListener(

            "click",

            () => this.openLightbox(photo)

        );

        return card;

    },

    registerEvents() {

        if (this.closeButton) {

    		this.closeButton.addEventListener(
        	"click",
        	() => this.closeLightbox()
    		);

	}

	if (this.lightbox) {

    		this.lightbox.addEventListener(

        	"click",

        	(event) => {

            		if (event.target === this.lightbox) {

                	this.closeLightbox();

            	}

        	}

        	);

	}

	if (this.finalButton) {

    		this.finalButton.addEventListener(

        	"click",

        	() => this.openFinalScreen()

    		);

	}

        document.addEventListener(

            "keydown",

            (event) => {

                if (event.key === "Escape") {

                    this.closeLightbox();

                }

            }

        );

    },

    /* ======================================================
       Part B
    ====================================================== */

    openLightbox(photo) {

        // Coming in Part B

    },

    closeLightbox() {

        // Coming in Part B

    },

    openFinalScreen() {

        // Coming in Part C

    }

};


/* ==========================================================
   INITIALISE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        GalleryModule.init();

    }

);

/* ==========================================================
   Forever v2 - gallery.js
   ----------------------------------------------------------
   Part B
   Lightbox
========================================================== */

Object.assign(GalleryModule, {

    openLightbox(photo) {

        if (!photo) return;

        playSound(
            CONFIG.sounds.buttonClick,
            0.5
        );

        this.lightboxImage.src =
            photo.image;

        this.lightboxImage.alt =
            photo.caption;

        this.lightbox.classList.add("active");

        document.body.style.overflow =
            "hidden";

    },



    closeLightbox() {

        if (
            !this.lightbox.classList.contains("active")
        ) {

            return;

        }

        playSound(
            CONFIG.sounds.buttonClick,
            0.3
        );

        this.lightbox.classList.remove("active");

        document.body.style.overflow =
            "";

        setTimeout(() => {

            this.lightboxImage.src = "";

        }, 250);

    }

});

/* ==========================================================
   Forever v2 - gallery.js
   ----------------------------------------------------------
   Part C
   Final Surprise
========================================================== */

Object.assign(GalleryModule, {

    async openFinalScreen() {

        playSound(
            CONFIG.sounds.success,
            0.8
        );

        disable(this.finalButton);

        this.finalButton.textContent =
            "Preparing your final surprise... ❤️";

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
		CONFIG.animation.confettiCount ?? 120
	);

        }

        await sleep(1800);

        showScreen("final-screen");

        this.startLoveMessages();

    },



    startLoveMessages() {

        const messages = [

            "I Love You ❤️",

            "Forever & Always ❤️",

            "Happy Birthday ❤️",

            "You Mean Everything To Me ❤️",

            "My Forever Person ❤️"

        ];

        let count = 0;

        const interval = setInterval(() => {

            if (count >= 12) {

                clearInterval(interval);

                return;

            }

            const text = create(
                "div",
                "love-text"
            );

            text.textContent =
                randomItem(messages);

            text.style.left =
                randomInt(10, 90) + "%";

            text.style.animationDuration =
                random(4, 7) + "s";

            document.body.appendChild(text);

            removeLater(text, 7000);

            count++;

        }, 700);

    }

});