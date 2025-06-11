let userscore = 0;
let compscore = 0;
let isGameOver = false; // to prevent clicking during delay

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg"); 
const userpara = document.querySelector("#play");
const comppara = document.querySelector("#comp");

// generate comp choice
const gencompchoice = () => {
    let options = ["rock", "paper", "scissor"];
    const cmpchoice = Math.floor(Math.random() * 3);
    return options[cmpchoice];
}

// draw game handler
const drawgame = () => {
    msg.innerText = "Game was draw. Play again.";
    msg.style.backgroundColor = "#081b31";
}

// show winner logic
const showwinner = (userwin, userch, compch) => {
    if (userwin) {
        userscore++;
        userpara.innerText = userscore;

        if (userscore === 10) {
            msg.innerText = `You Win the Game! ${userch} beats ${compch}`;
            msg.style.backgroundColor = "green";
            isGameOver = true;

            setTimeout(() => {
                userscore = 0;
                compscore = 0;
                userpara.innerText = "0";
                comppara.innerText = "0";
                msg.innerText = "Start Again";
                msg.style.backgroundColor = "#081b31";
                isGameOver = false;
            }, 10000); // 10 seconds delay
        } 
        else {
            msg.innerText = `You Win! ${userch} beats ${compch}`;
            msg.style.backgroundColor = "green";
        }
    } 
    else {
        compscore++;
        comppara.innerText = compscore;

        if (compscore === 10) {
            msg.innerText = `You Lost the Game! ${compch} beats ${userch}`;
            msg.style.backgroundColor = "red";
            isGameOver = true;

            setTimeout(() => {
                userscore = 0;
                compscore = 0;
                userpara.innerText = "0";
                comppara.innerText = "0";
                msg.innerText = "Start Again";
                msg.style.backgroundColor = "#081b31";
                isGameOver = false;
            }, 10000); // 10 seconds delay
        } 
        else {
            msg.innerText = `You lost! ${compch} beats ${userch}`;
            msg.style.backgroundColor = "red";
        }
    }
}

// determine winner
const playgame = (userchoice) => {
    if (isGameOver) return; // block input during timeout

    const compchoice = gencompchoice();

    if (userchoice === compchoice) {
        drawgame();
    } 
    else {
        let userwin = false;
        if (
            (userchoice === "rock" && compchoice === "scissor") ||
            (userchoice === "paper" && compchoice === "rock") ||
            (userchoice === "scissor" && compchoice === "paper")
        ) {
            userwin = true;
        }
        showwinner(userwin, userchoice, compchoice);
    }
}

// event listener for choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoiceid = choice.getAttribute("id");
        playgame(userchoiceid);
    });
});
