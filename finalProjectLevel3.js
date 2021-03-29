/*
Joseph Dayonot, Nicholas Smith, Adil Maalim, Alaukikdeep Boparai
This code is the javascript for level 3 that has all the questions for the quiz and the required score to move to the next level 
as well as the text in the popup for defeat or victory
*/


const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('modal.active')
    modals.forEach(modal => {
        closeModal(modal)
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
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    
}



const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));

const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let playerAnimateTrigger = false;


let questions = [
    {
        question: 'In order to protect company data, security experts often recommend a separate network for', //0
        choice1: 'laptops',
        choice2: 'mobile devices',
        choice3: 'different departments',
        choice4: 'Internet of Things',
        answer: 4,
    },
    
    {
        question: 'The answer is D, Internet of Things is a system of linked internet-connected objects that are able to collect and transfer data over a wireless network without any intervention.By keeping the internet of things on a separate network, any compromise on a smart device won’t grant an attacker direct access to the users primary devices where their data is stored.', //1
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', //2
        choice1: ' ',
        answer: 1,
    },



    {
        question: 'The major difference between HTTPS and HTTP is that with HTTPS data is always', //3
        choice1: 'Private',
        choice2: 'Virus-free',
        choice3: 'Translated',
        choice4: 'Encrypted',
        answer: 4,
    },

    {
        question: 'The answer D, HTTP is a protocol used to transfer data over web.It is used to define commands and services used for transmitting web page data.HyperText Transfer Protocol (HTTP) is not secured while HyperText Transfer Protocol Secure (HTTPS) is secured', //4
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', //5
        choice1: ' ',
        answer: 1,
    },

    {
        question: 'What happens during a denial of service attack?', //6
        choice1: 'A virus destroys data.',
        choice2: 'A website cannot handle all the requests.',
        choice3: 'It embeds code in programs to gain access later.',
        choice4: 'A user is able to obtain information from another computer.',
        answer: 2,
    },

    {
        question: 'The answer is B, A Denial-of-Service (DoS) attack is an attack meant to shut down a machine or network, making it inaccessible to its intended users.', //7
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', //8
        choice1: ' ',
        answer: 1,
    },

    {
        question: 'The type of attack in which the hacker pretends to be someone or something else (an executive, a bank or even a customer in order to gain access to passwords or financial information is known as', //9
        choice1: 'spoofing.',
        choice2: 'phishing.',
        choice3: 'click jacking',
        choice4: 'social engineering',
        answer: 4,
    },

    {
        question: 'The answer is D, Social engineering is an art of controlling people so that they give up confidential information.  Common examples of social engineering include phishing, malware, baiting, tailgating, etc', //10
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', //11
        choice1: ' ',
        answer: 1,
    },
    {
        question: 'An cyber attack where communication is sent from an unknown source pretending to be a known source is known as', //9
        choice1: 'Tampering',
        choice2: 'Direct-access',
        choice3: 'spoofing',
        choice4: 'Privilege escalation',
        answer: 3,
    },

    {
        question: 'The answer is C, Spoofing is defined as when someone or something pretends to be something else in an attempt to gain confidence, access to systems, steal data, money, etc.', //10
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', //11
        choice1: ' ',
        answer: 1,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = questions.length//10

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



startGame = () => {

    
    
    document.getElementById("backgroundContainer").style.width = (screen.width - 200) + "px";
    document.getElementById("backgroundContainer").style.height = (screen.height - 200) + "px";
    
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {

    //checks if reached end of question array
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        //localStorage.setItem('mostRecentScore', score)
        //return window.location.assign('end.html')

        closeModal(modal);
        document.getElementById("questionGenerate").style.opacity = "0.2";
        document.getElementById("questionGenerate").disabled = true;
        
        
        displayEndTransition();

        

        return;
    }
    console.log("question Counter = " + questionCounter);
    questionCounter++
    
    //progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    //progressBarFull.getElementsByClassName.wisth = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    var questionsIndex = 0 //Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {


   

    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

       
       

   

        if(classToApply === 'correct') {
            
            
            AnswerCorrect();
           
            
           
            
        } else {
            
            AnswerNotCorrect();
            incorrectSound.play();
            
        }
        
        
        

        selectedChoice.parentElement.classList.add(classToApply)
        
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
        
        
        /*
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000) */
    })
})

incrementScore = num => {

    document.getElementById("scoreNotify").style.display = "block";

    setTimeout(function(){ 
    
       document.getElementById("scoreNotify").style.display = "none";
    },  3000); 

    score +=num
    scoreText.innerText = "Score: "+ score
} 

//new classes

//for these functions, have to account for non-questions (i.e transition and answers)
function AnswerCorrect() {
    if (questionCounter % 3 == 1 && questionCounter != 0) {

        incrementScore(SCORE_POINTS);
        console.log(score);

        correctSound.play();
        
        playerAnimateTrigger = true;
        document.getElementById("modalTitle").innerHTML = "Your Answer is Correct! ";
        document.getElementById("divChoice2").style.display = "none";
        document.getElementById("divChoice3").style.display = "none";
        document.getElementById("divChoice4").style.display = "none";
        document.getElementById("modal").style.border = "15px solid green";
        //document.getElementById("closeAlt").addEventListener("click", playerAttackAnimation());
        
              
        
       
    } else {
        //relook at logic, to understand but add listener to play animation
        //closeModal(modal);
        if (playerAnimateTrigger) {

                playerAttackAnimation();
                monsterHurtAnimation();   
        
        } else {
                
                monsterAttackAnimation();
                playerDamageAnimation();
            
        
            
           
            
        }
        playerAnimateTrigger = false;
        menuClose.play();
        document.getElementById("modalTitle").innerHTML = "Transition";
        document.getElementById("modal").style.border = "2px solid whitesmoke";
        document.getElementById("divChoice2").style.display = "flex";
        document.getElementById("divChoice3").style.display = "flex";
        document.getElementById("divChoice4").style.display = "flex";
        getNewQuestion(); //skips blank transition "questions", next function call will get actual question
    }
    
}


function AnswerNotCorrect() {
    if (questionCounter % 3 == 1) {
        document.getElementById("modalTitle").innerHTML = "Sorry. Your Answer is Not Correct. ";
        document.getElementById("divChoice2").style.display = "none";
        document.getElementById("divChoice3").style.display = "none";
        document.getElementById("divChoice4").style.display = "none";
        document.getElementById("modal").style.border = "15px solid red";
        

       
        
       
    } else {
        //relook at logic, to understand but add listener to play animation

        //doesn't reach here?
        console.log("I am here");
        closeModal(modal);
        
        document.getElementById("modalTitle").innerHTML = "Transition";
        document.getElementById("modal").style.border = "none";
        document.getElementById("divChoice2").style.display = "flex";
        document.getElementById("divChoice3").style.display = "flex";
        document.getElementById("divChoice4").style.display = "flex";
        getNewQuestion();
        
    }
    
}





function displayEndTransition() {
    
    closeModal(modalEnd);

    var modalEnd = document.getElementById("modalEnd");
    var retryContainer = document.getElementById("retryContainer");
    //var nextLevelContainer = document.getElementById("nextLevelContainer");

    if (score >= 500) {
        monsterDeathAnimation();
        document.getElementById("modalTitleEnd").innerHTML = "Victory!";
        document.getElementById("questionEnd").innerHTML = "You have sucesfully completed the Game! You are a cybersecurity master!";
        //nextLevelContainer.style.display = "block";
        
    } else {

        playerDeathAnimation()
        document.getElementById("modalTitleEnd").innerHTML = "Defeated!";
        document.getElementById("questionEnd").innerHTML = "You lost, but practice makes perfect! Hint: must have at least 500 score to win!";
        retryContainer.style.display = "block";
    
        
    }
    

    setTimeout(function(){ 
        document.getElementById("backMusic").pause();
        if (score >= 500) {
            victoryFanfare.play();
        } else {
            losingFanfare.play();
        }


        openModal(modalEnd);
        }, 4000);

    


}

function playerAttackAnimation() {

    
    closeModal(modal);
    var x = document.getElementById("playerSprite");
               
    x.classList.add("attack");
    playerAttackSound.play();
    
    setTimeout(function(){ 
    
        x.classList.remove("attack")
        x.style.animationIterationCount = "infinite"
    },  1000); 
    
   

    
    // setTimeout(function(){ 
        
    //     x.classList.remove("attack")
    //     x.style.animationIterationCount = "infinite"
    // }, 1000); 
   
}


function playerDamageAnimation() {
    closeModal(modal);
    var x = document.getElementById("playerSprite");

                
    x.classList.add("hurt");
    x.style.animation = "moveSpriteSheetHurt 1s steps(5,start)"
    playerDamageSound.play();

    setTimeout(function(){ 
        x.classList.remove("hurt")
        x.style.animation = "moveSpriteSheet 1s steps(6)"
        x.style.animationIterationCount = "infinite"
    }, 750);
    
}

function playerDeathAnimation() {
    

    playerDamageSound.play();
    var x = document.getElementById("playerSprite");
    var playerName = document.getElementById("playerName3");

                    
    x.style.animationIterationCount = "1"
    x.classList.add("playerDeathPartTwo")
    x.style.animation = "moveSpriteSheetHurt 1s steps(5,start)";
    setTimeout(function(){ 
       
        playerName.style.display = "none";
        x.style.display = "none";}, 700);
    
     


}
function monsterAttackAnimation() {

    var x = document.getElementById("playerSprite2");
               
    
     x.classList.remove("level3Idle");
     x.classList.add("level3Attack");
     x.style.animation = "moveSpriteSheet 1.9s steps(9)"
     monsterAttackSound.play();

     
    
 
     
         
         setTimeout(function(){ 
            
            x.classList.remove("level3Attack");
            x.classList.add("level3Idle");
            x.style.animation = "level3Idle 0.9s steps(5)";
            x.style.animationIterationCount = "infinite"
            
         

        },  1900);
}

function monsterHurtAnimation() {


    var x = document.getElementById("playerSprite2");
               
    
     x.classList.remove("level3Idle");
     x.classList.add("level3Hurt");
     x.style.animation = "level3Hurt 0.7s steps(3)"
     x.style.filter = "sepia(100%)"
     monsterDamageSound.play();

     
    
 
     
         
         setTimeout(function(){ 
            x.style.filter = "none"
            x.classList.remove("level3Hurt");
            x.classList.add("level3Idle");
            x.style.animation = "level3Idle 0.9s steps(5)";
            x.style.animationIterationCount = "infinite"
            
         

        },  800);

}
function monsterDeathAnimation() {

    playerDamageSound.play();
    var x = document.getElementById("playerSprite2");
    
    var playerName = document.getElementById("enemyName3");

   
    x.style.animationIterationCount = "1"
    x.classList.add("level3Death")
    x.style.filter = "sepia(100%)"
    x.style.animation = "level3Death 1s steps(6)";
    
    setTimeout(function(){ 
        x.style.filter = "sepia(0%)"
        playerName.style.display = "none";
        x.style.display = "none";}, 800); 


}

function retryFunction() {
    location.reload();
}


startGame()

  /*
                //hides idle for one second, shows attack animation, then reappears
                atk.style.display = "block";
                x.style.display = "none";
                
                setTimeout(function(){ 
                    atk.style.display = "none";
                    x.style.display = "block"}, 1000);
        
    
                /*
                //hide and show animation
                if (x.style.display==="none") {
                    x.style.display = "block";
                    console.log("button pressed");
                    
                    
                } else {
                    x.style.display = "none";
                    console.log("button not pressed"); 
                } */