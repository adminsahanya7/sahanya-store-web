
/* =========================================================
   SAHANYA STORE - PROOF PAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.getElementById("menu-toggle");

    const nav =
        document.querySelector("nav");

    const navLinks =
        document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (menuToggle) {
                menuToggle.checked = false;
            }

        });

    });


    document.addEventListener("click", (e) => {

        const navbar =
            document.querySelector(".navbar");

        if (
            menuToggle &&
            navbar &&
            !navbar.contains(e.target)
        ) {
            menuToggle.checked = false;
        }

    });


    /* =====================================================
       ESCAPE - CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", (e) => {

        if (
            e.key === "Escape" &&
            menuToggle
        ) {
            menuToggle.checked = false;
        }

    });


    /* =====================================================
       PROOF CARD SCROLL ANIMATION
    ===================================================== */

    const cards =
        document.querySelectorAll(".proof-card");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

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

    } else {

        cards.forEach(card => {
            card.classList.add("visible");
        });

    }


    /* =====================================================
       CARD 3D HOVER
    ===================================================== */

    if (
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        cards.forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const rotateY =
                    ((x - rect.width / 2) /
                    (rect.width / 2)) * 2;

                const rotateX =
                    ((y - rect.height / 2) /
                    (rect.height / 2)) * -2;

                card.style.transform =
                    `translateY(-7px)
                     perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       PROOF IMAGE FULLSCREEN VIEWER
    ===================================================== */

    const proofImages =
        document.querySelectorAll(
            ".proof-image img"
        );


    if (!proofImages.length) {
        return;
    }


    let currentIndex = 0;


    /* =====================================================
       CREATE VIEWER
    ===================================================== */

    const viewer =
        document.createElement("div");

    viewer.id =
        "proofImageViewer";


    viewer.innerHTML = `

        <button
            class="proof-viewer-close"
            type="button"
            aria-label="Close"
        >
            &times;
        </button>


        <button
            class="proof-viewer-prev"
            type="button"
            aria-label="Previous image"
        >
            &#10094;
        </button>


        <img
            class="proof-viewer-image"
            src=""
            alt="Customer Proof"
        >


        <button
            class="proof-viewer-next"
            type="button"
            aria-label="Next image"
        >
            &#10095;
        </button>


        <div class="proof-viewer-counter"></div>

    `;


    document.body.appendChild(viewer);


    const fullscreenImage =
        viewer.querySelector(
            ".proof-viewer-image"
        );


    const closeButton =
        viewer.querySelector(
            ".proof-viewer-close"
        );


    const previousButton =
        viewer.querySelector(
            ".proof-viewer-prev"
        );


    const nextButton =
        viewer.querySelector(
            ".proof-viewer-next"
        );


    const counter =
        viewer.querySelector(
            ".proof-viewer-counter"
        );


    /* =====================================================
       VIEWER CSS
    ===================================================== */

    viewer.style.cssText = `
        position: fixed;
        inset: 0;

        width: 100vw;
        height: 100vh;

        background: rgba(0, 0, 0, 0.97);

        display: none;

        align-items: center;
        justify-content: center;

        z-index: 2147483647;

        padding: 20px;

        box-sizing: border-box;

        overflow: hidden;

        touch-action: none;
    `;


    fullscreenImage.style.cssText = `
        max-width: 92vw;
        max-height: 88vh;

        width: auto;
        height: auto;

        object-fit: contain;

        display: block;

        margin: auto;

        border-radius: 8px;

        user-select: none;

        -webkit-user-select: none;

        -webkit-user-drag: none;

        touch-action: pan-y;
    `;


    closeButton.style.cssText = `
        position: absolute;

        top: 18px;
        right: 20px;

        width: 52px;
        height: 52px;

        border: none;

        border-radius: 50%;

        background: rgba(255,255,255,0.15);

        color: white;

        font-size: 36px;

        cursor: pointer;

        z-index: 20;

        display: flex;

        align-items: center;

        justify-content: center;

        transition: 0.2s ease;
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

        transition: 0.2s ease;
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

        transition: 0.2s ease;
    `;


    counter.style.cssText = `
        position: absolute;

        bottom: 18px;

        left: 50%;

        transform: translateX(-50%);

        color: white;

        background: rgba(0,0,0,0.65);

        padding: 7px 14px;

        border-radius: 20px;

        font-family: Poppins, sans-serif;

        font-size: 14px;

        z-index: 20;
    `;


    /* =====================================================
       SHOW IMAGE
    ===================================================== */

    function showImage(index) {

        currentIndex = index;

        fullscreenImage.src =
            proofImages[currentIndex].src;

        fullscreenImage.alt =
            proofImages[currentIndex].alt ||
            "Customer Proof";

        counter.textContent =
            `${currentIndex + 1} / ${proofImages.length}`;

    }


    /* =====================================================
       OPEN VIEWER
    ===================================================== */

    function openViewer(index) {

        showImage(index);

        viewer.style.display =
            "flex";

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CLOSE VIEWER
    ===================================================== */

    function closeViewer() {

        viewer.style.display =
            "none";

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       IMAGE CLICK
    ===================================================== */

    proofImages.forEach((image, index) => {

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


    /* =====================================================
       NEXT IMAGE
    ===================================================== */

    nextButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            let nextIndex =
                currentIndex + 1;


            if (
                nextIndex >=
                proofImages.length
            ) {
                nextIndex = 0;
            }


            showImage(nextIndex);

        }
    );


    /* =====================================================
       PREVIOUS IMAGE
    ===================================================== */

    previousButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            let previousIndex =
                currentIndex - 1;


            if (previousIndex < 0) {

                previousIndex =
                    proofImages.length - 1;

            }


            showImage(previousIndex);

        }
    );


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    closeButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            closeViewer();

        }
    );


    /* =====================================================
       CLICK BACKGROUND TO CLOSE
    ===================================================== */

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


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

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


            if (
                event.key === "ArrowRight"
            ) {

                let nextIndex =
                    currentIndex + 1;


                if (
                    nextIndex >=
                    proofImages.length
                ) {
                    nextIndex = 0;
                }


                showImage(nextIndex);

            }


            if (
                event.key === "ArrowLeft"
            ) {

                let previousIndex =
                    currentIndex - 1;


                if (previousIndex < 0) {

                    previousIndex =
                        proofImages.length - 1;

                }


                showImage(previousIndex);

            }

        }
    );


    /* =====================================================
       MOBILE SWIPE
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    fullscreenImage.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    fullscreenImage.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;


            const distance =
                touchEndX - touchStartX;


            if (
                Math.abs(distance) < 50
            ) {
                return;
            }


            /* SWIPE LEFT */

            if (distance < 0) {

                let nextIndex =
                    currentIndex + 1;


                if (
                    nextIndex >=
                    proofImages.length
                ) {
                    nextIndex = 0;
                }


                showImage(nextIndex);

            }


            /* SWIPE RIGHT */

            else {

                let previousIndex =
                    currentIndex - 1;


                if (previousIndex < 0) {

                    previousIndex =
                        proofImages.length - 1;

                }


                showImage(previousIndex);

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       PREVENT IMAGE DRAGGING
    ===================================================== */

    proofImages.forEach(image => {

        image.addEventListener(
            "dragstart",
            event => {
                event.preventDefault();
            }
        );

    });


    /* =====================================================
       MOBILE VIEWER BUTTON SIZE
    ===================================================== */

    const mobileStyle =
        document.createElement("style");


    mobileStyle.textContent = `

        @media (max-width: 600px) {

            #proofImageViewer {
                padding: 10px !important;
            }

            #proofImageViewer
            .proof-viewer-image {

                max-width: 96vw !important;
                max-height: 82vh !important;

                border-radius: 6px !important;
            }

            #proofImageViewer
            .proof-viewer-close {

                top: 12px !important;
                right: 12px !important;

                width: 45px !important;
                height: 45px !important;

                font-size: 30px !important;
            }

            #proofImageViewer
            .proof-viewer-prev {

                left: 8px !important;

                width: 44px !important;
                height: 44px !important;

                font-size: 24px !important;
            }

            #proofImageViewer
            .proof-viewer-next {

                right: 8px !important;

                width: 44px !important;
                height: 44px !important;

                font-size: 24px !important;
            }

        }

    `;


    document.head.appendChild(
        mobileStyle
    );


});

