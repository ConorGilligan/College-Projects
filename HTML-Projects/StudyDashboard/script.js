const myName = "Conor";
const welcomeMessage = document.getElementById("welcomeMessage");         /*welcome message*/
welcomeMessage.textContent = `Welcome, ${myName}!`;


let count = 0;

const sessionText = document.getElementById("sessionText");
const addSessionBtn = document.getElementById("addSessionBtn");
const resetBtn = document.getElementById("resetBtn");
function updateCounter() {
  sessionText.textContent = `Study sessions today: ${count}`;
}
updateCounter();
addSessionBtn.addEventListener("click", () => {
  count++;
  updateCounter();
});
resetBtn.addEventListener("click", () => {
  count = 0;
  updateCounter();
});
const goals = ["Read notes", "Finish lab", "Practice JavaScript"];
for (let i = 0; i < goals.length; i++) {               /* Print goals */
  console.log(goals[i]);
}

const showGoalsBtn = document.getElementById("showGoalsBtn");
const goalsOutput = document.getElementById("goalsOutput");
showGoalsBtn.addEventListener("click",() =>{
  goalsOutput.innerHTML = "";                                 /*clears old results */

  for (let i = 0; i < goals.length; i++) {
    const li = document.createElement("li");
    li.textContent = goals[i];
    goalsOutput.appendChild(li);
  }
});

const hoursStudied = 3;
if (hoursStudied >= 3) {
  console.log("Good progress");
} else {
  console.log("You should study more");
}