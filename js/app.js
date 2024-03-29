const uzbekWords = ["kitob", "ruchka", "stol", "oyna", "telefon"];
const englishWords = ["book", "pen", "table", "mirror", "phone"];

const uzbekList = document.getElementById("uzbekList");
const englishList = document.getElementById("englishList");

let selectedUzbekItem = null;
let selectedEnglishItem = null;
let matchedCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateWords() {
  shuffle(uzbekWords);
  shuffle(englishWords);

  uzbekList.innerHTML = "";
  englishList.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const uzbekWord = uzbekWords[i];
    const englishWord = englishWords[i];

    const uzbekItem = document.createElement("li");
    uzbekItem.textContent = uzbekWord;
    uzbekItem.addEventListener("click", () => {
      if (
        selectedUzbekItem === uzbekItem ||
        uzbekItem.classList.contains("correct")
      )
        return;
      selectedUzbekItem = uzbekItem;
      uzbekItem.style.backgroundColor = "#00f";

      const music = new Audio("./music1.mp3"); 
      music.play();
    });

    const englishItem = document.createElement("li");
    englishItem.textContent = englishWord;
    englishItem.addEventListener("click", () => {
      if (!selectedUzbekItem || selectedUzbekItem.classList.contains("correct"))
        return;
      if (selectedUzbekItem.textContent === uzbekWord) {
        selectedUzbekItem.style.backgroundColor = "#0f0";
        englishItem.style.backgroundColor = "#0f0";
        selectedUzbekItem.classList.add("correct");
        englishItem.classList.add("correct");
        matchedCount++;
        if (matchedCount === 5) {
          setTimeout(() => {
            uzbekList.innerHTML = "";
            englishList.innerHTML = "";
            matchedCount = 0;
            generateWords();

            const music = new Audio("./music1.mp3"); 
            music.play();
          }, 2000);
        }
      } else {
        selectedUzbekItem.style.backgroundColor = "#f00";
        englishItem.style.backgroundColor = "#f00";
        const music = new Audio("./music1.mp3"); 
        music.play();
        setTimeout(() => {
          selectedUzbekItem.style.backgroundColor = "";
          englishItem.style.backgroundColor = "";

          const music = new Audio("./music1.mp3"); 
          music.play();
        }, 1000);
      }
      selectedUzbekItem = null;
    });

    uzbekList.appendChild(uzbekItem);
    englishList.appendChild(englishItem);
  }
}

generateWords();
