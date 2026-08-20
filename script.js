const MY_PHONE_NUMBER = "33600000000"; // Remplace par ton numéro
let selectedChoice = "";

function goToScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
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