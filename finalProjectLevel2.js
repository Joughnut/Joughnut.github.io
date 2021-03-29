/*
Joseph Dayonot, Nicholas Smith, Adil Maalim, Alaukikdeep Boparai
This code is the javascript for level 2 that has all the questions for the quiz and the required score to move to the next level 
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
        question: 'A computer _______ is a malicious code which self-replicates by copying itself to other programs is called:', //1
        choice1: 'program',
        choice2: 'virus',
        choice3: 'worm',
        choice4: 'adware',
        answer: 2,
    },
    
    {
        question: 'The Answer is B. A computer virus is a malicious code which self-replicates by copying itself to other programs. The computer virus gets spread by itself into other executable code or documents. The intention of creating a virus is to infect vulnerable systems.', 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },



    {
        question: 'Which of these is NOT an ideal way for a computer virus to spread?', //2
        choice1: 'Infected Website',
        choice2: 'Official Antivirus CDs',
        choice3: 'Emails',
        choice4: 'USBs',
        answer: 2,
    },

    {
        question: 'The Answer is B. The ideal means of spreading computer virus are through emails, USB drives that are used portable and injected and ejected in different systems as well as from infected websites. Antivirus selling vendors do not place a virus in their CDs and DVDs', 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },

    {
        question: 'A hacker locks out users and encrypts their personal computer files and data, holding it hostage until they agree to pay to the attacker. What is this practice called?', //3
        choice1: 'Browser Hijacker',
        choice2: 'Ransomware',
        choice3: 'adware',
        choice4: 'None of the above',
        answer: 2,
    },

    {
        question: 'The Answer is B. Ransomware infects a computer when a user downloads or runs ransomware-infected files. Attackers hide such files in a seemingly beginning software, so it is advisable to practice safe computing habits.', 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },

    {
        question: 'On the evening news you heard the reporter talking about an Internet threat called a Botnet. What exactly is a Botnet?', //9
        choice1: 'It is a malicious program that attempts to hide itself, other files, or computer data so they cannot be found on a computer.',
        choice2: 'A new type of cyber virus spread from China causing havoc around the globe.',
        choice3: 'All of the above.',
        choice4: 'A group of computers running malicious programs that are remotely controlled by cybercriminals.',
        answer: 4,
    },

    {
        question: 'The answer is D, Attackers use botnets consisting of thousands or more of computers to perform a variety of malicious tasks, usually targeting systems that are not safeguarded with firewalls and/or anti-virus software.', //10
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', //11
        choice1: ' ',
        answer: 1,
    },
    {
        question: 'This type of attack is designed to hinder the normal operation of a website, or other network resource.', //9
        choice1: 'Denial of Service attack',
        choice2: 'Phishing',
        choice3: 'Planned Operating System attack',
        choice4: 'None of the above',
        answer: 1,
    },

    {
        question: 'The answer is A, If the requests come from multiple sources, it is a DDoS (Distributed-Denial-of-Service) attack. A Denial-of-service (DOS) attack is an attack meant to shut down a network or a machine so that it’s not accessible to intended users.', //10
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
    var nextLevelContainer = document.getElementById("nextLevelContainer");

    if (score >= 400) {
        monsterDeathAnimation();
        document.getElementById("modalTitleEnd").innerHTML = "Victory!";
        document.getElementById("questionEnd").innerHTML = "You have sucesfully completed the level!";
        nextLevelContainer.style.display = "block";
        
    } else {

        playerDeathAnimation()
        document.getElementById("modalTitleEnd").innerHTML = "Defeated!";
        document.getElementById("questionEnd").innerHTML = "You lost, but practice makes perfect! Hint: must have at least 400 score to win!";
        retryContainer.style.display = "block";
    
        
    }
    

    setTimeout(function(){ 
        document.getElementById("backMusic").pause();
        if (score >= 400) {
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
    var playerName = document.getElementById("playerName");

                    
    x.style.animationIterationCount = "1"
    x.classList.add("playerDeathPartTwo")
    x.style.animation = "moveSpriteSheetHurt 1s steps(5,start)";
    setTimeout(function(){ 
       
        playerName.style.display = "none";
        x.style.display = "none";}, 700);
    
     


}
function monsterAttackAnimation() {

    var x = document.getElementById("playerSprite2");
               
   /*
    //Level 1 Enemy Animations
    x.classList.add("attack");
    
    monsterAttackSound.play();
   

    
        
    setTimeout(function(){ 
    
        x.classList.remove("attack")
        x.style.animationIterationCount = "infinite"
    },  1000); */

     //Level 2 Enemy Animations

    
     x.classList.add("level2Attack");
     x.style.animation = "moveSpriteSheet 1.9s steps(10)"
     monsterAttackSound.play();

     
    
 
     
         
         setTimeout(function(){ 
            x.classList.remove("level2Attack");
            x.style.animation = "level2Idle 0.85s steps(4)";
            x.style.animationIterationCount = "infinite"
            
         

        },  1000);
}

function monsterHurtAnimation() {

    var x = document.getElementById("playerSprite2");

    /*
    //level 1 animations 

    x.classList.add("hurt");
    x.style.animation = "moveSpriteSheetHurt 1s steps(5,start)"
    
    
    monsterDamageSound.play();

    setTimeout(function(){ 
        x.classList.remove("hurt")
        x.style.animation = "moveSpriteSheet 1s steps(6)"
        x.style.animationIterationCount = "infinite"
    }, 750); */

    //level2 animations

    x.classList.add("level2Hurt");
     x.style.animation = "moveSpriteSheet 1.9s steps(10)"
     x.style.filter = "invert(70%)"
     monsterDamageSound.play();

         setTimeout(function(){ 
            x.style.filter = "none" 
            x.classList.remove("level2Hurt");
            x.style.animation = "level2Idle 0.85s steps(4)";
            x.style.animationIterationCount = "infinite"
            
         

        },  1700);


}
function monsterDeathAnimation() {

    playerDamageSound.play();
    var x = document.getElementById("playerSprite2");
    
    var playerName = document.getElementById("enemyName2");

    /*
    //level 1 animations                    
    x.style.animationIterationCount = "1"
    x.classList.add("playerDeathPartTwo")
    x.style.animation = "moveSpriteSheetHurt 1s steps(5,start)";
    setTimeout(function(){ 
       
        playerName.style.display = "none";
        x.style.display = "none";}, 700); */


    //level 2 animations
    x.style.animationIterationCount = "1"
    x.classList.add("level2Death")
    x.style.filter = "sepia(100%)"
    x.style.animation = "moveSpriteSheet 1.9s steps(10)";
    
    setTimeout(function(){ 
        x.style.filter = "sepia(0%)"
        playerName.style.display = "none";
        x.style.display = "none";}, 900); 


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