/*
Joseph Dayonot, Nicholas Smith, Adil Maalim, Alaukikdeep Boparai
This code is the javascript for the title screen that direct the user to level 1
*/

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');



openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})



closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})


function openModal(modal) {
    if (modal == null) return

    menuOpen.play(); //menuOpen sound added

    modal.classList.add('active')
    
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    
    
}


//sound var added 2/24
//source w3schools
//404 error in console, doesnt effect game but need to trace
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

//sounds
var correctSound = new sound("Sounds/UI pack 1/Message-B_Accept.wav");
var incorrectSound = new sound("Sounds/UI pack 1/ALERT_Error.wav");
var menuOpen = new sound("Sounds/UI pack 1/MENU_Pick.wav");
var menuClose = new sound("Sounds/UI pack 1/MENU B_Back.wav");
var battleMusic = new sound("Sounds/Music/The Last Encounter (Original Version).mp3");
var playerAttackSound = new sound("Sounds/Attack sound effects/mixkit-fast-sword-whoosh-2792.wav");
var playerDamageSound = new sound("Sounds/Attack sound effects/mixkit-sword-slashes-in-battle-2763.wav");
var monsterAttackSound = new sound("Sounds/Attack sound effects/mixkit-dagger-woosh-1487.wav");
var monsterDamageSound = new sound("Sounds/Attack sound effects/mixkit-heavy-sword-hit-2794.wav");
var victoryFanfare = new sound("Sounds/Music/05 - Sketchy Logic - Victory and Respite.mp3");
var losingFanfare = new sound("Sounds/Music/LOSE.ogg");

 window.onload = function() {

     document.getElementById("backMusic").play();


 }



















