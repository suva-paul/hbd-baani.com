/* ==========================================================
   Forever v2 - password.js
   ----------------------------------------------------------
   Handles:
   - Password validation
   - Show / Hide password
   - Enter key support
   - Success & error animations
========================================================== */

"use strict";

const PasswordModule = {

    input: null,
    submit: null,
    toggle: null,
    message: null,

    init() {

        this.input = $("#password-input");
        this.submit = $("#password-submit");
        this.toggle = $("#toggle-password");
        this.message = $("#password-message");

        if (!this.input) return;

        this.registerEvents();

    },

    registerEvents() {

        if (this.submit) {

		this.submit.addEventListener(
        		"click",
        		() => this.validate()
    	);

     }

	if (this.toggle) {

    		this.toggle.addEventListener(
        		"click",
        		() => this.toggleVisibility()
    	);

     }

        this.input.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    this.validate();

                }

            }
        );

        this.input.addEventListener(
    		"input",
    		() => {

        		if (this.message) {

            			this.message.textContent = "";

        		}

    		}
	);

    },

    toggleVisibility() {

        if (this.input.type === "password") {

            this.input.type = "text";
            this.toggle.textContent = "🙈";

        } else {

            this.input.type = "password";
            this.toggle.textContent = "👁️";

        }

    },

    async validate() {

        const value = this.input.value.trim();

        if (!value) {

            this.showError(
                "Please enter the password ❤️"
            );

            return;

        }

        if (value.toLowerCase() !== CONFIG.password.toLowerCase()) {

            playSound(
                CONFIG.sounds.buttonClick,
                0.5
            );

            this.showError(
                "Wrong password 😜"
            );

            this.shake();

            this.input.select();

            return;

        }

        await this.success();

    },

    showError(text) {

        this.message.textContent = text;
        this.message.style.color = "#FFD166";

    },

    shake() {

        const card = $("#password-card");

        if (!card) return;

        card.classList.remove("shake");

        void card.offsetWidth;

        card.classList.add("shake");

    },

    async success() {

        playSound(
            CONFIG.sounds.success,
            0.8
        );

        this.message.style.color = "#A7F3D0";
        this.message.textContent =
            "Welcome ❤️";

        disable(this.submit);
        disable(this.input);

        await sleep(900);

        showScreen("proposal-screen");

        if (
            typeof ProposalModule !== "undefined" &&
            typeof ProposalModule.init === "function"
        ) {

            ProposalModule.init();

        }

    }

};


/* ==========================================================
   INITIALISE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        PasswordModule.init();

    }

);