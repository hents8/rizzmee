const MY_PHONE_NUMBER = "33600000000"; // Remplace par ton numéro
let selectedChoice = "";

// Redirige depuis n'importe quel avatar vers l'écran Hero
function selectProfile(profileType) {
  goToScreen('hero-screen');
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

document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const sound = document.getElementById("netflix-sound");

  if (sound) {
    sound.play().catch(() => console.log("Audio bloqué par le navigateur"));
  }

  setTimeout(() => {
    introScreen.classList.add("hidden");
  }, 3000);
});