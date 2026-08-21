
/* =========================================================
   SAHANYA STORE
   DIAMOND STORE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       WHATSAPP NUMBER
       Replace this with your real WhatsApp number
       
       Sri Lanka format:
       947XXXXXXXX
    ===================================================== */

    const whatsappNumber = "94726571391";


    /* =====================================================
       BUY BUTTONS
    ===================================================== */

    const buyButtons =
        document.querySelectorAll(".buy-button");


    /* =====================================================
       BUTTON CLICK
    ===================================================== */

    buyButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const item =
                button.dataset.item || "Package";

            const price =
                button.dataset.price || "Price unavailable";


            /* =============================================
               WHATSAPP MESSAGE
            ============================================= */

            const message =
                `Hello Sahanya Store 👋\n\n` +
                `I want to purchase:\n\n` +
                `📦 Package: ${item}\n` +
                `💰 Price: ${price}\n\n` +
                `Please send me the payment details.`;


            /* =============================================
               WHATSAPP URL
            ============================================= */

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=` +
                encodeURIComponent(message);


            /* =============================================
               OPEN WHATSAPP
            ============================================= */

            window.open(
                whatsappURL,
                "_blank"
            );

        });

    });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const navLinks =
        document.querySelectorAll("nav a");


    if (menuToggle) {

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuToggle.checked = false;

            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!menuToggle) {
            return;
        }

        const navbar =
            document.querySelector(".navbar");

        if (!navbar) {
            return;
        }


        if (
            !navbar.contains(event.target) &&
            menuToggle.checked
        ) {

            menuToggle.checked = false;

        }

    });


    /* =====================================================
       ESC KEY CLOSE MENU
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            menuToggle
        ) {

            menuToggle.checked = false;

        }

    });


    /* =====================================================
       BUTTON PRESS EFFECT
    ===================================================== */

    buyButtons.forEach((button) => {

        button.addEventListener(
            "mousedown",
            () => {

                button.style.transform =
                    "scale(0.96)";

            }
        );


        button.addEventListener(
            "mouseup",
            () => {

                button.style.transform =
                    "";

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

});

