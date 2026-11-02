document.addEventListener("DOMContentLoaded", function() {

    // FILTROS DO PORTFÓLIO

    const filterButtons = document.querySelectorAll(".filters button");
    const items = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            filterButtons.forEach(function(btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            items.forEach(function(item) {

                if (filter === "all" || item.classList.contains(filter)) {

                    item.style.display = "block";

                    setTimeout(function() {
                        item.classList.add("show");
                    }, 50);

                } else {

                    item.style.display = "none";
                    item.classList.remove("show");

                }

            });

        });

    });


    // LIGHTBOX

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("close-lightbox");

    document.querySelectorAll(".gallery-item img").forEach(function(img) {

        img.addEventListener("click", function() {

            lightboxImg.src = img.src;

            lightbox.classList.add("show");

        });

    });


    if (closeBtn) {

        closeBtn.addEventListener("click", function() {

            lightbox.classList.remove("show");

        });

    }


    if (lightbox) {

        lightbox.addEventListener("click", function(event) {

            if (event.target === lightbox) {

                lightbox.classList.remove("show");

            }

        });

    }


    // FECHAR LIGHTBOX COM ESC

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {

            lightbox.classList.remove("show");

        }

    });


    // SCROLL REVEAL

    function scrollReveal() {

        const elements = document.querySelectorAll(".scroll-reveal");

        elements.forEach(function(element) {

            const position = element.getBoundingClientRect().top;

            if (position < window.innerHeight - 100) {

                element.classList.add("show");

            }

        });

    }

    window.addEventListener("scroll", scrollReveal);

    scrollReveal();


    // MENU

    document.querySelectorAll(".menu a").forEach(function(anchor) {

        anchor.addEventListener("click", function(event) {

            const targetId = anchor.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // DESTAQUE DO MENU

    function highlightMenu() {

        const scrollPosition = window.scrollY + 100;

        document.querySelectorAll("section[id]").forEach(function(section) {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                document.querySelectorAll(".menu a").forEach(function(link) {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") === "#" + section.id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    }

    window.addEventListener("scroll", highlightMenu);

    highlightMenu();


    // CARROSSÉIS

    document.querySelectorAll(".carrossel-container").forEach(function(container) {

        const track = container.querySelector(".carrossel-track");
        const images = container.querySelectorAll(".carrossel-track img");

        const btnAnterior = container.querySelector(".anterior");
        const btnProximo = container.querySelector(".proximo");

        let currentIndex = 0;


        function updateCarrossel() {

            const itemWidth = container.querySelector(".carrossel-galeria").clientWidth;

            track.style.transform =
                "translateX(-" + (currentIndex * itemWidth) + "px)";

            checkButtons();

        }


        function checkButtons() {

            if (btnAnterior) {

                btnAnterior.style.opacity =
                    currentIndex === 0 ? "0.5" : "1";

                btnAnterior.disabled =
                    currentIndex === 0;

            }


            if (btnProximo) {

                btnProximo.style.opacity =
                    currentIndex === images.length - 1 ? "0.5" : "1";

                btnProximo.disabled =
                    currentIndex === images.length - 1;

            }

        }


        if (btnProximo) {

            btnProximo.addEventListener("click", function() {

                if (currentIndex < images.length - 1) {

                    currentIndex++;

                    updateCarrossel();

                }

            });

        }


        if (btnAnterior) {

            btnAnterior.addEventListener("click", function() {

                if (currentIndex > 0) {

                    currentIndex--;

                    updateCarrossel();

                }

            });

        }


        window.addEventListener("resize", function() {

            updateCarrossel();

        });


        checkButtons();

    });

});