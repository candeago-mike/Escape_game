// setup 3D
gsap.set("#book", { perspective: 1000 });
gsap.set(".page", { transformStyle: "preserve-3d" });
gsap.set(".back", { rotationY: -180 });
gsap.set([".back", ".front"], { backfaceVisibility: "hidden" });

const pages = document.querySelectorAll(".page");

// click sur le recto (front) → tourner la page
pages.forEach((pageEl) => {
  const front = pageEl.querySelector(".front");
  const back = pageEl.querySelector(".back");

  if (front) {
    front.addEventListener("click", () => {
      // remettre les autres pages derrière
      gsap.set(".page", { zIndex: 0 });
      gsap.set(pageEl, { zIndex: 2 });

      gsap.to(pageEl, {
        duration: 0.6,
        rotationY: -180,
        transformOrigin: "0% 100%",
        ease: "power2.out",
      });
    });
  }

  if (back) {
    back.addEventListener("click", () => {
      gsap.set(".page", { zIndex: 0 });
      gsap.set(pageEl, { zIndex: 2 });

      gsap.to(pageEl, {
        duration: 0.6,
        rotationY: 0,
        transformOrigin: "0% 100%",
        ease: "power2.out",
      });
    });
  }
});

const journal = document.querySelector(".journal");
const bookContainer = document.querySelector(".book-container");
const book = document.getElementById("book");

// ouvrir au clic sur le journal
journal.addEventListener("click", (e) => {
  e.stopPropagation(); // ne pas déclencher le handler global
  bookContainer.style.display = "flex";
});

// ne pas fermer quand on clique dans le livre
book.addEventListener("click", (e) => {
  e.stopPropagation();
});

// fermer quand on clique ailleurs
document.addEventListener("click", () => {
  bookContainer.style.display = "none";
});
