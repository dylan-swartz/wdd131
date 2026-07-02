const monster = {
    name: "Pixel Snortleblat",
    class: "Swamp Beast Diplomat",
    imgSrc: "../src/pixel_snortleblat.png",
    level: 5,
    health: 100,
    hasShownKO: false,

    takeDamage() {
        const prevHealth = this.health;
        this.health = Math.max(0, this.health-20);

        if (prevHealth > 0 && this.health === 0 && !this.hasShownKO) {
            this.hasShownKO = true;
            alert(`${this.name} has been defeated...!!`);
        }
    },
    levelUp() {
        this.level += 1;
    },
    levelDown() {
        this.level -= 1;
    },
    eatFruit() {
        this.level += 1;
        this.health += 10;

        if (this.health > 0 ) this.hasShownKO = false;
    },
    updateName() {
        if (this.level >= 15){
            this.name = "Mega Snortleblat";
            this.imgSrc = "https://andejuli.github.io/wdd131/character_card/snortleblat.webp";
        } else{
            this.name = "Pixel Snortleblat";
            this.imgSrc = "../src/pixel_snortleblat.png";
        }
    }
};

function renderMonster() {
    monster.updateName();

    document.getElementById("monsterName").textContent = monster.name;
    document.getElementById("monsterClass").textContent = `Class: ${monster.class}`;
    document.getElementById("monsterLevel").textContent = `Level: ${monster.level}`;
    document.getElementById("monsterHealth").textContent = `Health Points: ${monster.health}`;
    
    const monsterImg = document.querySelector(".image");
    monsterImg.src = monster.imgSrc;
    monsterImg.alt = `${monster.name} image`;
}

const attackedBtn = document.getElementById("attacked");
const eatFruitBtn = document.getElementById("eatFruit");
const levelUpBtn = document.getElementById("levelUp");
const levelDownBtn = document.getElementById("levelDown");


attackedBtn.addEventListener("click", () => {
     monster.takeDamage();
     renderMonster();
});

levelUpBtn.addEventListener("click", () => {
    monster.levelUp();
    renderMonster();
});

levelDownBtn.addEventListener("click", () => {
    monster.levelDown();
    renderMonster();
});

eatFruitBtn.addEventListener("click", () => {
    monster.eatFruit();
    renderMonster();
});

renderMonster();
