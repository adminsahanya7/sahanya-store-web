/* =========================================================
   SAHANYA STORE
   FREE FIRE ACCOUNT STORE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ACCOUNT CARDS
    ===================================================== */

    const cards =
        document.querySelectorAll(".account-card");


    /* =====================================================
       IMAGE FULLSCREEN VIEWER
    ===================================================== */

    const images =
        document.querySelectorAll(".account-image img");


    if (images.length > 0) {

        const viewer =
            document.createElement("div");

        viewer.className =
            "sahanya-image-viewer";

        viewer.innerHTML = `

            <button
                class="sahanya-image-close"
                type="button"
            >
                &times;
            </button>

            <button
                class="sahanya-image-prev"
                type="button"
            >
                &#10094;
            </button>

            <img
                class="sahanya-fullscreen-image"
                src=""
                alt="Account Image"
            >

            <button
                class="sahanya-image-next"
                type="button"
            >
                &#10095;
            </button>

            <div class="sahanya-image-counter">
                1 / ${images.length}
            </div>

        `;

        document.body.appendChild(viewer);


        const fullscreenImage =
            viewer.querySelector(
                ".sahanya-fullscreen-image"
            );

        const closeButton =
            viewer.querySelector(
                ".sahanya-image-close"
            );

        const previousButton =
            viewer.querySelector(
                ".sahanya-image-prev"
            );

        const nextButton =
            viewer.querySelector(
                ".sahanya-image-next"
            );

        const counter =
            viewer.querySelector(
                ".sahanya-image-counter"
            );


        /* =================================================
           VIEWER CSS
        ================================================= */

        viewer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            width: 100vw;
            height: 100vh;

            background: rgba(0, 0, 0, 0.97);

            display: none;

            align-items: center;
            justify-content: center;

            z-index: 999999999;

            overflow: hidden;

            padding: 20px;

            box-sizing: border-box;
        `;


        fullscreenImage.style.cssText = `
            display: block;

            max-width: 90vw;
            max-height: 88vh;

            width: auto;
            height: auto;

            object-fit: contain;

            margin: auto;

            border-radius: 8px;

            user-select: none;

            -webkit-user-select: none;

            -webkit-user-drag: none;

            touch-action: pan-y;
        `;


        closeButton.style.cssText = `
            position: absolute;

            top: 20px;
            right: 20px;

            width: 52px;
            height: 52px;

            border: none;

            border-radius: 50%;

            background: rgba(255,255,255,0.15);

            color: white;

            font-size: 36px;

            line-height: 1;

            cursor: pointer;

            z-index: 20;
        `;


        previousButton.style.cssText = `
            position: absolute;

            left: 20px;

            top: 50%;

            transform: translateY(-50%);

            width: 55px;
            height: 55px;

            border: none;

            border-radius: 50%;

            background: rgba(255,255,255,0.15);

            color: white;

            font-size: 30px;

            cursor: pointer;

            z-index: 20;
        `;


        nextButton.style.cssText = `
            position: absolute;

            right: 20px;

            top: 50%;

            transform: translateY(-50%);

            width: 55px;
            height: 55px;

            border: none;

            border-radius: 50%;

            background: rgba(255,255,255,0.15);

            color: white;

            font-size: 30px;

            cursor: pointer;

            z-index: 20;
        `;


        counter.style.cssText = `
            position: absolute;

            bottom: 20px;

            left: 50%;

            transform: translateX(-50%);

            color: white;

            background: rgba(0,0,0,0.6);

            padding: 7px 14px;

            border-radius: 20px;

            font-family: Poppins, sans-serif;

            font-size: 14px;

            z-index: 20;
        `;


        /* =================================================
           CURRENT IMAGE
        ================================================= */

        let currentIndex = 0;


        function showImage(index) {

            currentIndex = index;

            fullscreenImage.src =
                images[currentIndex].src;

            fullscreenImage.alt =
                images[currentIndex].alt ||
                "Free Fire Account";

            counter.textContent =
                `${currentIndex + 1} / ${images.length}`;

        }


        /* =================================================
           OPEN VIEWER
        ================================================= */

        function openViewer(index) {

            showImage(index);

            viewer.style.display =
                "flex";

            document.body.style.overflow =
                "hidden";

        }


        /* =================================================
           CLOSE VIEWER
        ================================================= */

        function closeViewer() {

            viewer.style.display =
                "none";

            document.body.style.overflow =
                "";

        }


        /* =================================================
           IMAGE CLICK
        ================================================= */

        images.forEach((image, index) => {

            image.style.cursor =
                "zoom-in";

            image.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                    event.stopPropagation();

                    openViewer(index);

                }
            );

        });


        /* =================================================
           NEXT
        ================================================= */

        nextButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                let next =
                    currentIndex + 1;

                if (next >= images.length) {
                    next = 0;
                }

                showImage(next);

            }
        );


        /* =================================================
           PREVIOUS
        ================================================= */

        previousButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                let previous =
                    currentIndex - 1;

                if (previous < 0) {
                    previous =
                        images.length - 1;
                }

                showImage(previous);

            }
        );


        /* =================================================
           CLOSE BUTTON
        ================================================= */

        closeButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                closeViewer();

            }
        );


        /* =================================================
           CLICK BLACK BACKGROUND
        ================================================= */

        viewer.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === viewer
                ) {

                    closeViewer();

                }

            }
        );


        /* =================================================
           KEYBOARD
        ================================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    viewer.style.display !== "flex"
                ) {
                    return;
                }

                if (event.key === "Escape") {

                    closeViewer();

                }

                if (event.key === "ArrowRight") {

                    nextButton.click();

                }

                if (event.key === "ArrowLeft") {

                    previousButton.click();

                }

            }
        );


        /* =================================================
           MOBILE SWIPE
        ================================================= */

        let touchStartX = 0;

        let touchEndX = 0;


        fullscreenImage.addEventListener(
            "touchstart",
            (event) => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            {
                passive: true
            }
        );


        fullscreenImage.addEventListener(
            "touchend",
            (event) => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const distance =
                    touchEndX - touchStartX;


                if (Math.abs(distance) < 50) {
                    return;
                }


                if (distance < 0) {

                    nextButton.click();

                } else {

                    previousButton.click();

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       ACCOUNT CARD BUTTONS
    ===================================================== */

    cards.forEach((card) => {

        const button =
            card.querySelector(".view-button");

        const accountId =
            card.dataset.account;

        if (!button || !accountId) {
            return;
        }


        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                const account =
                    accounts[accountId];

                if (!account) {
                    return;
                }

                console.log(
                    "Selected:",
                    account.name,
                    account.price
                );

            }
        );

    });


    /* =====================================================
       CARD IMAGE SHOULD NOT TRIGGER CARD BUTTON
    ===================================================== */

    images.forEach((image) => {

        image.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

            }
        );

    });


});
