const baseColors = ["color-1", "color-2", "color-3", "color-4", "color-5"];

const body = document.body;
const btnPlay = document.querySelector(".btn-play");
const scoreHtml = document.querySelector('.score-display');
const lifesHtml = document.querySelector('.lifes-display');
const topScoreHtml = document.querySelector(".top-score-display");

let currentBgColor = "color-1";//Initialisation du premier BgColor
let currentBtnColor = "color-2";//Initialisation du premier BtnColor
let score = 0;
let lifes = 3;
let topScore = 0;
let vitesse = 1000;
let partieCommencee = false;

let intervalChangementDeCouleur;

//Changement de couleur du Body
function changementDeCouleur(){
    let randomNumber = Math.random(); //Génère un nombre aléatoire entre 0 et 0.99
    let randomIndex = Math.floor(randomNumber * baseColors.length); //Descends le nombre généré à l'inférieur
    let couleurAleatoire = baseColors[randomIndex]; //Défini la couleur choisie (index dans tableau)

    while(couleurAleatoire === currentBgColor){//Évite que le BgColor soit le même que le précédent
        randomNumber = Math.random();
        randomIndex = Math.floor(randomNumber * baseColors.length);
        couleurAleatoire = baseColors[randomIndex];
    }

    body.classList.remove(currentBgColor); //Retire la classe courante au body
    body.classList.add(couleurAleatoire); //Ajoute la classe de la nouvelle couleur

    currentBgColor = couleurAleatoire; //MAJ du bg color
}

//Changement de couleur du Bouton
function changementDeCouleurBtn(){
    let randomNumberBtn = Math.random();
    let randomIndexBtn = Math.floor(randomNumberBtn * baseColors.length);
    let couleurAleatoireBtn = baseColors[randomIndexBtn]; 

    while(couleurAleatoireBtn === currentBtnColor || couleurAleatoireBtn === currentBgColor){
        randomNumberBtn = Math.random();
        randomIndexBtn = Math.floor(randomNumberBtn * baseColors.length);
        couleurAleatoireBtn = baseColors[randomIndexBtn];
    }

    btnPlay.classList.remove(currentBtnColor);
    btnPlay.classList.add(couleurAleatoireBtn);

    currentBtnColor = couleurAleatoireBtn;
}

function comparerCouleur(){
    if(currentBgColor === currentBtnColor){
        score++;
        scoreHtml.textContent = "Score :" + score;
    
    if (score > topScore){ //MAJ du meilleur score
        topScore = score;
        topScoreHtml.textContent = "Meilleur score : " + topScore;
    }
    
    if (vitesse > 600){
            accelerationChangementCouleur();
    }} else {
        lifes--;
        lifesHtml.textContent = "Vies :" + lifes;

        if (lifes === 0){ //Défaite et arrêt immédiat du bg du body
            clearInterval(intervalChangementDeCouleur);
            btnPlay.textContent = "Score: " + score;
            btnPlay.classList.add("endgame");
        }
    }

    if(lifes === 1){
        lifesHtml.classList.add("red");
    }

    if (lifes > 0){ // Vérifie les vies pour défilement bg bouton
        changementDeCouleurBtn();
    }
}

function accelerationChangementCouleur(){
    vitesse -= 50;
    redemarrerIntervalle();
}

function recommencerPartie(){
    score = 0;
    lifes = 3;
    vitesse = 1000;

    // Réinitialisation des affichages
    scoreHtml.textContent = "Score : " + score;
    lifesHtml.textContent = "Vies : " + lifes;
    btnPlay.textContent = "Jouer";

    // Retire le style de fin de partie
    btnPlay.classList.remove("endgame");

    // Réinitialise les couleurs
    body.classList.remove(currentBgColor);
    body.classList.add("color-1");
    currentBgColor = "color-1";

    btnPlay.classList.remove(currentBtnColor);
    btnPlay.classList.add("color-2");
    currentBtnColor = "color-2";

    redemarrerIntervalle();
}

function redemarrerIntervalle(){
    clearInterval(intervalChangementDeCouleur);
    intervalChangementDeCouleur = setInterval(changementDeCouleur, vitesse);
}

btnPlay.addEventListener("click", function(){ //Détermine la bonne fonction selon nb de vie
    if (lifes === 0){
        recommencerPartie();
    } else if (partieCommencee === false){
        partieCommencee = true;
        btnPlay.textContent = "Jouer";
        redemarrerIntervalle();
    } else {
        comparerCouleur();
    }
});

//Affichage dans le bouton au survol pour recommencer
btnPlay.addEventListener("mouseenter", function(){
    if (lifes === 0){
        btnPlay.textContent = "Recommencer";
    }
});

//Affichage sans survol pour le score
btnPlay.addEventListener("mouseleave", function(){
    if (lifes === 0){
        btnPlay.textContent = "Score: " + score;
    }
});

//FONCTIONNALITÉ SUPPLÉMENTAIRE -> Jouer avec la barre espace
document.addEventListener("keydown", function(event){
    if (event.code === "Space"){
        event.preventDefault(); //Empêche le comportement(scroll) habituel de la barre espace
        btnPlay.click(); //Déclanche le click du bouton
    }
});