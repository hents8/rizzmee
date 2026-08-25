const MY_PHONE_NUMBER = "33600000000"; // Remplace par ton numéro
let selectedChoice = "";

// Forcer l'écran de profil au démarrage
document.addEventListener("DOMContentLoaded", () => {
  goToScreen('profile-screen');
});

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

  // 2. Réinitialiser complètement le SVG du cœur pour relancer l'animation
  if (heart) {
    heart.style.animation = 'none'; // Stoppe l'animation précédente
    heart.offsetHeight; // Force le navigateur à rafraîchir le rendu
    heart.style.animation = ''; // Réactive l'animation du CSS
    heart.classList.remove("animate");
    void heart.offsetWidth; // Force le reflow
    heart.classList.add("animate");
  }

  // 3. Jouer le son
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Erreur audio :", e));
  }

  // 4. Masquer proprement après la fin de l'animation
  setTimeout(() => {
    if (introScreen) {
      introScreen.classList.add("hidden");
      introScreen.style.display = "none"; // Sécurité d'affichage
    }
    goToScreen('hero-screen');
  }, 2300);
}

function goToScreen(screenId) {
  // Masque tous les écrans
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Affiche uniquement l'écran ciblé
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }
}

function openChoiceModal() {
  document.getElementById("choice-modal").style.display = "flex";
}

function selectOption(optionText) {
  selectedChoice = optionText;
  document.getElementById("choice-modal").style.display = "none";
  document.getElementById("summary-text").innerText = `Option choisie : ${optionText}`;
  document.getElementById("final-screen").style.display = "flex";
}

function sendWhatsApp() {
  const message = `Match parfait ! Mon choix pour notre rdv : ${selectedChoice}. On s'organise quand ?`;
  window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}