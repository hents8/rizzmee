const MY_PHONE_NUMBER = "261326602543"; 
let selectedChoice = "";
let isManagingProfiles = false;
let autoScrollTimer = null;

// Audio pour la sélection d'options
const optionSound = new Audio('./audio/wow.mp3'); 
optionSound.volume = 0.5;

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

// Sélection d'une option
function selectOption(optionKey) {
  if (optionSound) {
    optionSound.currentTime = 0;
    optionSound.play().catch(e => console.log("Erreur audio option :", e));
  }

  selectedChoice = optionKey;

  const choiceModal = document.getElementById("choice-modal");
  if (choiceModal) choiceModal.style.display = "none";

  const data = optionDetails[optionKey] || {
    headline: "Un rendez-vous d'exception...",
    text: "Le programme est prêt, il ne manque plus que toi."
  };

  const headlineEl = document.getElementById("summary-headline");
  const textEl = document.getElementById("summary-text");

  if (headlineEl) headlineEl.innerText = data.headline;
  if (textEl) textEl.innerText = data.text;

  const finalScreen = document.getElementById("final-screen");
  if (finalScreen) finalScreen.style.display = "flex";

  setTimeout(() => {
    lancerConfettis();
  }, 100);
}

// Animation de Confettis Émojis
function lancerConfettis() {
  const elements = ['💐', '🌹', '❤️', '💖', '✨', '🌸', '🌺', '💕'];
  const totalCount = 80;

  for (let i = 0; i < totalCount; i++) {
    const item = document.createElement('div');
    item.innerText = elements[Math.floor(Math.random() * elements.length)];

    const startX = Math.random() * 96 + 2; 
    const size = Math.random() * 1.4 + 1.6;
    const duration = Math.random() * 2.0 + 2.5; 
    const delay = Math.random() * 1.0; 

    Object.assign(item.style, {
      position: 'fixed',
      left: `${startX}vw`,
      bottom: '-60px',
      fontSize: `${size}rem`,
      zIndex: '999999',
      pointerEvents: 'none',
      userSelect: 'none',
      opacity: '0',
      filter: 'drop-shadow(0 4px 12px rgba(229, 9, 20, 0.4))',
      transition: `transform ${duration}s cubic-bezier(0.12, 0.8, 0.32, 1), opacity 0.6s ease`
    });

    document.body.appendChild(item);

    setTimeout(() => {
      const moveX = (Math.random() - 0.5) * 200;
      const moveY = -(window.innerHeight * 0.9 + Math.random() * 80);
      const rotation = (Math.random() - 0.5) * 80;

      item.style.opacity = '1';
      item.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`;
    }, delay * 1000);

    setTimeout(() => {
      item.style.opacity = '0';
    }, (duration + delay - 0.7) * 1000);

    setTimeout(() => {
      item.remove();
    }, (duration + delay + 0.3) * 1000);
  }
}

// Ouverture de WhatsApp
function sendWhatsApp() {
  window.open(`https://wa.me/${MY_PHONE_NUMBER}`, '_blank');
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

// 1. Désactiver le menu du clic droit
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// 2. Bloquer les raccourcis clavier de l'inspecteur et du code source
document.addEventListener('keydown', (e) => {
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
    e.preventDefault();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
    e.preventDefault();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
    e.preventDefault();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
    e.preventDefault();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
    return false;
  }
});