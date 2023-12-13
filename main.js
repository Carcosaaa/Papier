const historiqueList = document.getElementById("historique-list");
const historique = JSON.parse(localStorage.getItem("historique")) || [];

function addToHistorique(joueur, robot, resultat) {
  historique.push({ joueur, robot, resultat });
  localStorage.setItem("historique", JSON.stringify(historique));
}

function updateHistorique() {
  historiqueList.innerHTML = "";
  historique.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `Partie ${index + 1}: Joueur(${item.joueur}) vs. Robot(${item.robot}) - Résultat: ${item.resultat}`;
    historiqueList.appendChild(li);
  });
}

updateHistorique(); // Appel initial pour afficher l'historique existant

const buttons = document.querySelectorAll("button");
const resultatBox = document.querySelector(".resultat");

const choices = ["Papier", "Caillou", "Ciseaux"];

function getRobotChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const joueur = button.innerHTML;
      const robot = getRobotChoice();
      let resultat = "";
  
      if (joueur === robot) {
        resultat = "Égalité";
      } else if (
        (joueur === "Papier" && robot === "Ciseaux") ||
        (joueur === "Caillou" && robot === "Papier") ||
        (joueur === "Ciseaux" && robot === "Caillou")
      ) {
        resultat = "Gagné";
      } else {
        resultat = "Perdu";
      }
  
      document.querySelector(".resultat").innerHTML = `
        Joueur : ${joueur} <br>
        Robot : ${robot} <br>
        Résultat : ${resultat}
      `;
  
      addToHistorique(joueur, robot, resultat); // Ajouter la partie à l'historique
      updateHistorique(); // Mettre à jour l'affichage de l'historique
    });
  });  