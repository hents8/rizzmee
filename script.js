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

  // 1. Rendre le conteneur immédiatement visible
  if (introScreen) {
    introScreen.classList.remove("hidden");
    introScreen.style.display = "flex";
    introScreen.style.opacity = "1";
    introScreen.style.visibility = "visible";
  }

  // 2. Relancer l'animation du cœur
  if (heart) {
    heart.style.animation = 'none';
    heart.offsetHeight; // Force le reflow
    heart.style.animation = '';
    heart.classList.remove("animate");
    void heart.offsetWidth;
    heart.classList.add("animate");
  }

  // 3. Jouer le son
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Erreur audio :", e));
  }

  // 4. Redirection vers la bannière principale
  setTimeout(() => {
    if (introScreen) {
      introScreen.classList.add("hidden");
      introScreen.style.display = "none";
    }
    goToScreen('hero-screen');
  }, 2300);
}

// Gestion de la navigation entre écrans
function goToScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }
}

// Ouverture de la modale d'options
function openChoiceModal() {
  const modal = document.getElementById("choice-modal");
  if (modal) modal.style.display = "flex";
}

// Sélection d'une option et passage à l'écran final
function selectOption(optionKey) {
  selectedChoice = optionKey;

  // Ferme la modale des choix
  const choiceModal = document.getElementById("choice-modal");
  if (choiceModal) choiceModal.style.display = "none";

  // Récupère l'accroche associée
  const data = optionDetails[optionKey] || {
    headline: "Un rendez-vous d'exception...",
    text: "Le programme est prêt, il ne manque plus que toi."
  };

  // Injecte les accroches personnalisées
  const headlineEl = document.getElementById("summary-headline");
  const textEl = document.getElementById("summary-text");

  if (headlineEl) headlineEl.innerText = data.headline;
  if (textEl) textEl.innerText = data.text;

  // Affiche l'écran de confirmation
  const finalScreen = document.getElementById("final-screen");
  if (finalScreen) finalScreen.style.display = "flex";
}

// Ouvre la discussion WhatsApp vide directement
function sendWhatsApp() {
  window.open(`https://wa.me/${MY_PHONE_NUMBER}`, '_blank');
}

// Contrôle manuel du carrousel
function moveCarousel(direction) {
  const container = document.getElementById('thumbnailRow');
  if (!container) return;

  const cardWidth = container.clientWidth;
  container.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

// Auto-scroll pour mobile
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