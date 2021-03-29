/*
Joseph Dayonot, Nicholas Smith, Adil Maalim, Alaukikdeep Boparai
This code is the javascript for level 1 that has all the questions for the quiz and the required score to move to the next level 
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

//question
//answer
//transition

let questions = [
    {
        question: 'Im online and I meet someone my age in a chat room. Is it OK to give him or her my address or phone number so we can get together? YES or NO', //1
        choice1: 'YES',
        choice2: 'NO',
        choice3: '',
        choice4: '',
        answer: 2,
    },
    
    {
        question: 'The Answer is NO. You should NEVER give out your name or address to anyone you meet online. If you really want to have an offline conversation. Check with this person. check with your parents first', 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },



    {
        question: 'Im visiting a site from a company or organization that Ive heard of. They want my name and phone number so I can enter a contest. Is it OK to enter. YES or NO?', //2
        choice1: 'NO',
        choice2: 'YES',
        choice3: '',
        choice4: '',
        answer: 1,
    },

    {
        question: 'The Answer is NO. If a legitimate company wants to collect information from children -- even to enter you in a contest -- they must first get your parents permission. This not only protects your safety, but your privacy too. Ask your parents about the importance of protecting your privacy.', 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },

    {
        question: 'Im in the middle of a chat session and someone says something really mean. Should I:', //3
        choice1: 'Ask them to Apologize.',
        choice2: 'Insult them back, they deserve it.',
        choice3: 'Get my friends to insult them back.',
        choice4: 'Dont respond. Report it and tell an adult if it bothers me.',
        answer: 4,
    },

    {
        question: 'The Answer is D. You should never respond to any messages that are mean or in any way makes you feel uncomfortable. It is not your fault if you get a message like that.  If you get a message like this,  tell your parents right away. ', 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },

    {
        question: 'My parents and I have established rules as to what I can do on the Internet when Im home, but Im at a friends house. Should I go by my parents rules or do whatever my friend does? ', //4
        choice1: 'Go by your parents or organization rules.',
        choice2: 'Do whatever your friend does.',
        choice3: 'Screw my friend and their parents. Its my computer time!',
        choice4: 'Rules? what is that?',
        answer: 1,
    },

    {
        question: 'The Answer is A. Wherever you are, you should go by the parents or organizational rules to avoid getting in trouble.', 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },

    {
        question: 'Im online and I get a message from my Internet service provider asking for my password. They say they need it to fix my account. Should I give it to them? YES or NO? ', //5
        choice1: ' YES',
        choice2: 'No',
        choice3: '',
        choice4: '',
        answer: 2,
    },

    {
        question: 'The Answer is NO. You should never give out your Internet password to anyone (even your best friends) other than your parents. Internet service providers will never ask you for a password and sometimes people will pretend that they work for the Internet service provider to get  your password'
        , 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },

    {
        question: ' I met someone in a chat room who wants to get together. They live nearby. Can I arrange a meeting? YES or NO? ', //6
        choice1: ' NO',
        choice2: ' YUP',
        choice3:'',
        choice4:'',
        answer: 1,
    },

    {
        question: 'The Answer is NO. Never meet with strangers you met online unless checking in with a parent or guardian. If you do, make sure to bring a parent or guardian with you and meet in a public place. ', 
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', 
        choice1: ' ',
        answer: 1,
    },

    {
        question: ' Sara needs a new password. Which one is the strongest? ', //7
        choice1: ' Zuky123',
        choice2: ' ZukytheRobot',
        choice3:'Z*u%ANDsar%71',
        choice4:'Tacoma Washington',
        answer: 3,
    },

    {
        question: 'The Answer is C. More complex passwords have a higher chance of preventing unauthorized access to your electronic accounts and devices. Best practice is to have a mix of letters, symbols, and numbers so that it is harder for a person to guess passwords.', //11
        choice1: 'Close Button',
        answer: 1,
    },

    {
        question: ' ', //11
        choice1: ' ',
        answer: 1,
    },

    {
        question: ' You get a new email. It reads: Hi, you won a million dollars. Click here to claim it! Should you click it? ', //8
        choice1: ' Yes, free money!',
        choice2: 'No, never trust links from unverified sources',
        choice3:'Yes, why not? Whats the worst that could happen?',
        choice4:'No, but I dont want to give you the right answer',
        answer: 2,
    },

    {
        question: 'The Answer is B. Such emails are mostly fake and are an example of phishing. Clicking on links in these emails might take you to an infected webpage or drop a malware on your computer.', 
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

    if (score >= 600) {
        monsterDeathAnimation();
        document.getElementById("modalTitleEnd").innerHTML = "Victory!";
        document.getElementById("questionEnd").innerHTML = "You have sucesfully completed the level!";
        nextLevelContainer.style.display = "block";
        
    } else {

        playerDeathAnimation()
        document.getElementById("modalTitleEnd").innerHTML = "Defeated!";
        document.getElementById("questionEnd").innerHTML = "You lost, but practice makes perfect! Hint: must have at least 600 points to win!";
        retryContainer.style.display = "block";
    
        
    }
    

    setTimeout(function(){ 
        document.getElementById("backMusic").pause();
        if (score >= 600) {
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
               
   
    //Level 1 Enemy Animations
    x.classList.add("attack");
    
    monsterAttackSound.play();
   

    
        
    setTimeout(function(){ 
    
        x.classList.remove("attack")
        x.style.animationIterationCount = "infinite"
    },  1000); 

  
}

function monsterHurtAnimation() {

    var x = document.getElementById("playerSprite2");

    
    //level 1 animations 

    x.classList.add("hurt");
    x.style.animation = "moveSpriteSheetHurt 1s steps(5,start)"
    
    
    monsterDamageSound.play();

    setTimeout(function(){ 
        x.classList.remove("hurt")
        x.style.animation = "moveSpriteSheet 1s steps(6)"
        x.style.animationIterationCount = "infinite"
    }, 750); 

    

}
function monsterDeathAnimation() {

    playerDamageSound.play();
    var x = document.getElementById("playerSprite2");
    
    var playerName = document.getElementById("enemyName");

    
    //level 1 animations                    
    x.style.animationIterationCount = "1"
    x.classList.add("playerDeathPartTwo")
    x.style.animation = "moveSpriteSheetHurt 1s steps(5,start)";
    setTimeout(function(){ 
       
        playerName.style.display = "none";
        x.style.display = "none";}, 700); 


    


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