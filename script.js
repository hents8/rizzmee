const MY_PHONE_NUMBER = "261326602543"; 
let selectedChoice = "";
let isManagingProfiles = false;
let autoScrollTimer = null;

// Dictionnaire d'accroches romantiques pour l'écran final
const optionDetails = {
  'Cocktails & sunset 🍹': {
    headline: "Prépare-toi à un moment hors du temps...",
    text: "Un cocktail frais à la main, le coucher de soleil et notre plus belle complicité. J'ai déjà hâte de t'écouter rire."
  },
  'Bowling & Arcade 🎳': {
    headline: "L'esprit joueur et beaucoup de complicité...",
    text: "Une touche de compétition, des souvenirs d'arcade et une ambiance sur-mesure. Promis, si tu me bats, c'est toi qui choisis le dessert !"
  },
  'Balade & Glace 🍦': {
    headline: "La douceur d'une parenthèse gourmande...",
    text: "Flâner sous les lumières nocturnes, une glace délicieuse et des heures de discussion sans voir le temps passer. La recette de la soirée parfaite."
  }
};

// Initialisation au démarrage
document.addEventListener("DOMContentLoaded", () => {
  goToScreen('profile-screen');
  startAutoScroll();
});

// Bascule du mode "Gérer les profils"
function toggleManageProfiles() {
  isManagingProfiles = !isManagingProfiles;
  const profileScreen = document.getElementById("profile-screen");
  const manageBtn = document.getElementById("btn-manage-profiles");
  const title = document.getElementById("profile-title");

  if (isManagingProfiles) {
    profileScreen.classList.add("manage-mode");
    manageBtn.innerText = "Terminé";
    manageBtn.style.borderColor = "#ffffff";
    manageBtn.style.color = "#ffffff";
    title.innerText = "Gérer les profils :";
  } else {
    profileScreen.classList.remove("manage-mode");
    manageBtn.innerText = "Gérer les profils";
    manageBtn.style.borderColor = "#808080";
    manageBtn.style.color = "#808080";
    title.innerText = "Qui est-ce ?";
  }
}

// Sélection de profil & Animation Ta-Dum
function selectProfile(profileType) {
  const introScreen = document.getElementById("intro-screen");
  const sound = document.getElementById("netflix-sound");
  const heart = document.querySelector(".netflix-heart");

  if (introScreen) {
    introScreen.classList.remove("hidden");
    introScreen.style.display = "flex";
    introScreen.style.opacity = "1";
    introScreen.style.visibility = "visible";
  }

  if (heart) {
    heart.style.animation = 'none';
    heart.offsetHeight; // Force reflow
    heart.style.animation = '';
    heart.classList.remove("animate");
    void heart.offsetWidth;
    heart.classList.add("animate");
  }

  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Erreur audio :", e));
  }

  setTimeout(() => {
    if (introScreen) {
      introScreen.classList.add("hidden");
      introScreen.style.display = "none";
    }
    goToScreen('hero-screen');
  }, 2300);
}

// Changement d'écran
function goToScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    
    if (screenId === 'reasons-screen') {
      document.querySelectorAll('#reasons-screen video').forEach(video => {
        video.muted = true;
        video.play().catch(e => console.log("Autoplay mobile bloqué :", e));
      });
    }
  }
}

// Ouverture de la modale des choix
function openChoiceModal() {
  const modal = document.getElementById("choice-modal");
  if (modal) modal.style.display = "flex";
}

// 1. Déclaration du son de sélection (à mettre au début du script.js)
const optionSound = new Audio('./audio/wow.mp3'); 
optionSound.volume = 0.5; // Ajuste le volume (entre 0.0 et 1.0)

function selectOption(optionKey) {
  // 2. Joue le son au moment exact du clic
  if (optionSound) {
    optionSound.currentTime = 0; // Réinitialise si la personne clique rapidement
    optionSound.play().catch(e => console.log("Erreur audio option :", e));
  }

  selectedChoice = optionKey;

  // 3. Ferme la modale de choix
  const choiceModal = document.getElementById("choice-modal");
  if (choiceModal) choiceModal.style.display = "none";

  // 4. Prépare les textes de l'écran final
  const data = optionDetails[optionKey] || {
    headline: "Un rendez-vous d'exception...",
    text: "Le programme est prêt, il ne manque plus que toi."
  };

  const headlineEl = document.getElementById("summary-headline");
  const textEl = document.getElementById("summary-text");

  if (headlineEl) headlineEl.innerText = data.headline;
  if (textEl) textEl.innerText = data.text;

  // 5. Affiche l'écran final
  const finalScreen = document.getElementById("final-screen");
  if (finalScreen) finalScreen.style.display = "flex";

  // 6. Déclenche la pluie d'émojis
  setTimeout(() => {
    lancerConfettis();
  }, 100);
}

function lancerConfettis() {
  const elements = ['💐', '🌹', '❤️', '💖', '✨', '🌸'];
  const totalCount = 60; // Nombre idéal pour ne pas surcharger l'écran

  for (let i = 0; i < totalCount; i++) {
    // 1. Création de l'élément HTML natif (Netteté vectorielle garantie)
    const item = document.createElement('div');
    item.innerText = elements[Math.floor(Math.random() * elements.length)];

    // 2. Position initiale (Départ en bas de l'écran avec dispersion)
    const startX = Math.random() * 80 + 10; // Entre 10% et 90% de la largeur
    const size = Math.random() * 1.2 + 1.8; // Taille variable entre 1.8rem et 3rem (très lisible)
    const duration = Math.random() * 1.5 + 2.5; // Durée du vol (2.5s à 4s pour un effet doux)
    const delay = Math.random() * 0.4; // Léger décalage entre chaque apparition

    // 3. Application des styles d'animation natifs
    Object.assign(item.style, {
      position: 'fixed',
      left: `${startX}vw`,
      bottom: '-50px',
      fontSize: `${size}rem`,
      zIndex: '999999',
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: '0',
      filter: 'drop-shadow(0 4px 10px rgba(229, 9, 20, 0.3))',
      transition: `transform ${duration}s cubic-bezier(0.12, 0.8, 0.32, 1), opacity 0.6s ease`
    });

    document.body.appendChild(item);

    // 4. Déclenchement du mouvement (Montée féérique avec balancement naturel)
    setTimeout(() => {
      const moveX = (Math.random() - 0.5) * 160; // Mouvement de dérive latérale
      const moveY = -(window.innerHeight * 0.85 + Math.random() * 100); // Hauteur d'envol
      const rotation = (Math.random() - 0.5) * 90; // Rotation douce (pas de vrille rapide)

      item.style.opacity = '1';
      item.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
    }, delay * 1000);

    // 5. Fondu de disparition élégant en fin de course
    setTimeout(() => {
      item.style.opacity = '0';
    }, (duration + delay - 0.8) * 1000);

    // 6. Nettoyage du DOM
    setTimeout(() => {
      item.remove();
    }, (duration + delay + 0.2) * 1000);
  }
}

// Ouverture de WhatsApp
function sendWhatsApp() {
  window.open(`https://wa.me/${MY_PHONE_NUMBER}`, '_blank');
}

// Contrôle manuel carrousel
function moveCarousel(direction) {
  const container = document.getElementById('thumbnailRow');
  if (!container) return;

  const cardWidth = container.clientWidth;
  container.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

// Défilement automatique mobile
function startAutoScroll() {
  if (autoScrollTimer) clearInterval(autoScrollTimer);
  autoScrollTimer = setInterval(() => {
    const container = document.getElementById('thumbnailRow');
    if (container && window.innerWidth <= 768) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
      }
    }
  }, 5500);
}