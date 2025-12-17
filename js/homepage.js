const video = document.querySelector(".backgroundVideo");


gsap.set(".triangle", {
  opacity: 0,
});
gsap.set(".text-typing", {
  opacity: 0,
});
gsap.set(".backgroundVideo", {
  opacity: 0,
});
document.getElementById("playBtn").addEventListener("click", function (e) {
  // lancer la vidéo
  if (video) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.error("Erreur lecture vidéo :", err);
      });
    }
  }

  e.preventDefault();
  gsap.to(".start", {
    opacity: 0,
    duration: 1,
  });
  gsap.to(".background", {
    duration: 1,
    opacity: 0,
  });
  gsap.to(".backgroundVideo", {
    duration: 1,
    opacity: 1,
  });
  gsap.to(".text-typing", {
    opacity: 1,
    duration: 0.3,
  });
  gsap.to(".text-content", {
    duration: 2,
    delay: 1,
    text: "17:30 Mince ! Mon PC ! Je l’ai oublié à l’IUT. J’espère que Fatima est encore là, je vais aller voir...",
    ease: "none",
    onComplete: function () {
      // Une fois le texte fini, animer le triangle
      gsap.to(".triangle", {
        duration: 0.5,
        opacity: 1,
        y: 5,
        repeat: -1, // répète en boucle
        yoyo: true, // va-et-vient
        ease: "sine.inOut",
      });
    },
  });

  // Masquer au clic
  document.querySelector(".text-typing").addEventListener("click", function () {
    gsap.to(".text-typing", {
      duration: 1,
      opacity: 0,
      ease: "none",
      onComplete: function () {
        window.location.href = "index.html";
      },
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      gsap.to(".text-typing", {
        duration: 1,
        opacity: 0,
        ease: "none",
        onComplete: function () {
          window.location.href = "index.html";
        },
      });
    }
  });
});
