document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       MOBILE NAVIGATION
    ================================= */

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (menuToggle) {
                menuToggle.checked = false;
            }
        });
    });

    document.addEventListener("click", (event) => {

        const navbar = document.querySelector(".navbar");

        if (
            navbar &&
            menuToggle &&
            !navbar.contains(event.target)
        ) {
            menuToggle.checked = false;
        }

    });


    /* ================================
       ESCAPE KEY
    ================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape" && menuToggle) {
            menuToggle.checked = false;
        }

    });


    /* ================================
       PAYMENT CARD ANIMATION
    ================================= */

    const cards =
        document.querySelectorAll(".payment-card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        cards.forEach(card => {
            observer.observe(card);
        });

    }


    /* ================================
       COPY BANK DETAILS
    ================================= */

    const detailRows =
        document.querySelectorAll(".detail-row");

    detailRows.forEach(row => {

        const value =
            row.querySelector("strong");

        if (!value) return;

        value.style.cursor = "pointer";

        value.addEventListener("click", async () => {

            const text =
                value.textContent.trim();

            if (
                !text ||
                text.includes("XXXX") ||
                text.includes("YOUR") ||
                text.includes("07X")
            ) {
                return;
            }

            try {

                await navigator.clipboard.writeText(text);

                const oldText = value.textContent;

                value.textContent = "COPIED ✓";

                value.style.color = "#ffd21f";

                setTimeout(() => {

                    value.textContent = oldText;

                    value.style.color = "";

                }, 1200);

            } catch (error) {

                console.log(
                    "Copy failed:",
                    error
                );

            }

        });

    });


    /* ================================
       WHATSAPP BUTTON
    ================================= */

    const whatsappButtons =
        document.querySelectorAll(
            ".whatsapp, .cta-button"
        );

    whatsappButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (
                button.href &&
                button.href.includes("XXXXXXXX")
            ) {

                alert(
                    "Please add your WhatsApp number."
                );

            }

        });

    });


    /* ================================
       CURRENT YEAR
    ================================= */

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });

});