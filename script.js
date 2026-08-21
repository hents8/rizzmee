const MY_PHONE_NUMBER = "33600000000"; // Remplace par ton numéro
let selectedChoice = "";

function selectProfile(profileType) {
  const introScreen = document.getElementById("intro-screen");
  const sound = document.getElementById("netflix-sound");
  const heart = document.querySelector(".netflix-heart");

  // Relance l'animation CSS au clic
  if (heart) {
    heart.classList.remove("animate");
    void heart.offsetWidth; // Force le rafraîchissement
    heart.classList.add("animate");
  }

  // Affiche le splash screen
  if (introScreen) {
    introScreen.classList.remove("hidden");
  }

  // Joue le son
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Erreur audio :", e));
  }

  // Transition vers l'écran Hero
  setTimeout(() => {
    if (introScreen) {
      introScreen.classList.add("hidden");
    }
    goToScreen('hero-screen');
  }, 2300);
}

function goToScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
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