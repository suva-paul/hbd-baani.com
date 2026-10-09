/* ==========================================================
   Forever v2 - config.js
   ----------------------------------------------------------
   Edit ONLY this file to personalise the website.
========================================================== */

const CONFIG = {

    /* ======================================================
       PERSONAL DETAILS
    ====================================================== */

    girlfriendName: "Sarbani De",

    nickname: "Baani ❤️",

    yourName: "Suvankar Paul",

    signature: "Forever Yours ❤️",

    birthday: "10-09-2001",


    /* ======================================================
       PASSWORD
    ====================================================== */

    password: "Baani",

    passwordHint: "The word I use to call you ❤️",


    /* ======================================================
       PROPOSAL PAGE
    ====================================================== */

    proposalTitle:
        "Hi ❤️",

    proposalQuestion:
        "Will you be my forever?",

    yesButtonText:
        "Yes 💖",

    noButtonText:
        "No 🙈",

    noButtonMessages: [

        "Nice try 😜",

        "You'll have to choose Yes ❤️",

        "Not happening 😂",

        "The universe has already decided 💕",

        "Keep trying 😆",

        "Your destiny is the Yes button ❤️",

        "Nope... Try again 😜"

    ],


    /* ======================================================
       BALLOON GAME
    ====================================================== */

    birthdayHeading:
        "Let's unlock your birthday surprise 🎈",

    balloonColours: [

        "#FF5E9C",
        "#FF7EB3",
        "#A855F7",
        "#60A5FA",
        "#F59E0B",
        "#10B981",
        "#EC4899",
        "#8B5CF6"

    ],


    /* ======================================================
       LETTER
    ====================================================== */

    letterTitle:
        "Happy Birthday ❤️",

    letter: `Happy Birthday, My Life ❤️

Your thought makes ordinary moments extraordinary.

Your smily face brightens even my darkest days.

I hope this birthday brings you as much happiness as you have brought into my life.

May every dream of you come true.

Thank you for considering me worthy of your life partner.

I love you today,

tomorrow,

and forever.

❤️`,

    typewriterSpeed: 35,


    /* ======================================================
       GALLERY
    ====================================================== */

    galleryTitle:
        "Your Beautiful Memories ❤️",

    photos: [

        {
            image:
            "assets/photos/eyes.jpeg",

            caption:
            "Those eyes... 😍"
        },

        {
            image:
            "assets/photos/smile.jpeg",

            caption:
            "That warm smile 😊"
        },

        {
            image:
            "assets/photos/beauty.jpeg",

            caption:
            "Beauty that Shines ❤️"
        },

        {
            image:
            "assets/photos/little.jpeg",

            caption:
            "The Cute Little Love ✨"
        }

    ],


    /* ======================================================
       MUSIC
    ====================================================== */

    music:

        "assets/music/music.mp3",

    musicVolume: 0.45,

    autoplayAfterYes: true,


    /* ======================================================
       SOUND EFFECTS
    ====================================================== */

    sounds: {

        balloonPop:
            "assets/sounds/pop.mp3",

        buttonClick:
            "assets/sounds/click.mp3",

        success:
            "assets/sounds/success.mp3"

    },


    /* ======================================================
       EFFECTS
    ====================================================== */

    effects: {

        floatingHearts: true,

        sparkles: true,

        stars: true,

        petals: true,

        confetti: true,

        fireworks: true,

        cursorTrail: true

    },


    /* ======================================================
       ANIMATION SETTINGS
    ====================================================== */

    animation: {

        heartInterval: 700,

        sparkleInterval: 450,

        petalInterval: 900,

        starCount: 120,

        fireworksCount: 12,

	confettiCount: 100

    },


    /* ======================================================
       COLOURS
    ====================================================== */

    theme: {

        primary:
            "#FF4D88",

        secondary:
            "#8B5CF6",

        accent:
            "#FFD166"

    },


    /* ======================================================
       COUNTDOWN
    ====================================================== */

    countdownEnabled: true,


    /* ======================================================
       FINAL MESSAGE
    ====================================================== */

    endingTitle:
        "Happy Birthday! ❤️",

    endingMessage:
        "You are my most precious gift! I love you forever.",


    /* ======================================================
       DEVELOPER
    ====================================================== */

    version:
        "Forever v2.0"

};



/* ==========================================================
   AUTO GENERATED VALUES
   (Do NOT edit below unless you know JavaScript.)
========================================================== */

CONFIG.birthdayDigits =
CONFIG.birthday.replace(/-/g, "").split("");

CONFIG.totalBalloons =
CONFIG.birthdayDigits.length;

Object.freeze(CONFIG);