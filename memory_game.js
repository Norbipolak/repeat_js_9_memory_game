/*
<body>
    <div class="container">
        <h1>Memory Game</h1>
        <div id="points-holder">
            <div class="box">
                <h3>Errors <span id="errors">0</span></h3>
            </div>
            <div class="box">
                <h3>Points <span id="points">0</span></h3>
            </div>
        </div>
        <div id="memory-game"></div>
        <button id="new-game"></button>
    </div>

Ez a html szerkezet
Van egy container, amiben vannak a points-holder, amiben megjelenítjük a pontokat meg a hibákat 
fontos itt, hogy ez jobb, hogy van egy h3-as tag és abban van egy span, amit majd id alapján lementjünk, mert 
így csak a span-nak a tartalmát fogjuk frissíteni és az csak annyi, hogy változnak a pontok és azt, hogy errors meg points azt nem 

Csináltunk egy div-et amiit itt lementünk id alapján és megcsináljuk bele a dolgokat 
a legvégén meg van egy button, ami arra kell, hogy majd new game legyen és letörlünk, mindent ami eddig volt és lennulázzuk a pontokat meg a hibát 

.rotate {
    transition: all 0.5s linear;
    transform: rotateY(0deg);
}

itt meg kell adni 3 paramétert 
1. melyikre vonatkozzon -> all az hogy mindegyikre 
de azt is mondhatnánk, hogy rotate és akkor csak arra fog vonatkozni!! 

2. mennyi idő alatt menjen végbe a folyamat 1s 0.5s stb. 

3. hogyan menjen végbe pl. a linear, hogy mindig ugyanugy, de van ease mikor az eleje lassú utána lgyorsabb és megint lassabb  stb.
de van még 
ease-out -> lassan fog befejeződni 
ease-in -> lasson fog kezdődni 
ease-in-out -> lassan kezdődik és lassan is fejeződik be 
*/

class MemoryGame {
    memoryGameDiv;
    images;
    selectedCards;
    points;
    errors;
    pointsSpan;
    errorsSpan;
    newGameBtn;

    constructor() {
        this.memoryGameDiv = document.querySelector("#memory-game");
        this.pointsSpan = document.querySelector("#points");
        this.errorsSpan = document.querySelector("#errors");
        this.newGameBtn = document.querySelector("#new-game");

        /*
        Lementettük, amire szükségünk van, fontos, hogy a errors-ra meg a points-ra kell majd külön egy points meg errors is 
        ami majd nulláról fog kedődni és megjelenítjük a spans-ban innerText-vel 
        */

        this.images = ["car.png", "cargo-ship.png", "cheese.png", "flower.png", "phone.png", "plane.png", "plane.png", "tree.png", "ux.png"];
        /*
        nagyon fontos, hogy legyen ez a tömb, mert ide gyüjtjük a képeket a nevük szerint, végigmegyünk rajt és minden körben csinálunk 
        egy img-t elemet, aminek az src-je körönként az lesz, ami ebbe a tömbben van 
        első körben a car.png csinálunk még egy img annak az src-je az lesz, hogy cargo-ship és így tovább, ameddig megy a for a 
        this.images.length-ig!!!!
        */

        this.selectedCards = [];
        //ebben fogjuk tárolni a kártyákat, amiket majd kiválasztunk 
        this.points = 0;
        this.errors = 0;

        //függvények meghívása 
        this.shufflingCards();
        this.handCards();
        this.newGame();
    }

    /*
    Kell egy függvény, amivel megkeverjük a kártyákat 
    - van a this.images tömb és kell csinálni kettő random számot a this.images.length-ig, mert ezek lesznek majd az indexei 
    mondjuk az első random szám 2 -> this.images[2] 
    második random szám 5 -> this.images[5]

    és ha ez meg van azt szeretnénk, hogy cserejélje ki 40-szer így, hogy a 2-es berakja az 5-ös helyére és még 39-szer 
    generálunk véletlen számot és akkor azt cserélje ki 

    fontos 
    - while ciklus legyen, mert ha megadjuk hogy randIndex !== randIndex2-vel és megtörténik a csere akkor majd csak utána adunk hozzá egyet 
    counter-hoz (kell egy let counter = 0) az if-en kivül ehhez 
    */

    shufflingCards() {
        this.images = this.images.concat(this.images);
        /*
        a concat-val tudjuk elérni, hogy azok az elemek ami benne vannak a tömbbe ugyanazok kétszer szerepeljen, concat-oljuk a két tömböt 
        this.images = és akkor ez lesz az új this.images tömb, amiben már kétszer szerepelnek a ugyanazok az elemek 
        */

        let counter = 0;

        while (counter < 40) { //azért mert nulláról kezdünk és az counter = 1-nél már a második kör fog menni, így lesz összesen 40 kör 
            const randIndex = Math.floor(Math.random() * this.images.length);
            const randIndex2 = Math.floor(Math.random() * this.images.length);
            /*
            fontos, hogy mindig egyel több legyen, mert a Math.random() 0-1 között csinál egy számot beszorozzuk length-vel 
            és az majd le lesz mindig kerekítve a floor-val!! 
            */

            if (randIndex !== randIndex2) {
                //csak akkor jó ha nem ugyanolyan a két random szám, mert akkor nem lesz keverés 
                let tempImg = this.images[randIndex];
                //egy képet elmentünk ebbe a változóba 
                this.images[randIndex] = this.images[randIndex2];
                //randIndex-es kép ki lesz cserélve a randIndex2-es képpel 
                this.images[randIndex2] = tempImg;
                //randIndex2-nek értékét megadjuk a tempImg-nek 

                counter++;
            }
        }
    }

    /*
    handCards-ba fogjuk megjeleníteni a képeket!! 
    */
    handCards() {
        for (const fileName of this.images) {
            const div = document.createElement("div");
            div.classList.add("card");
            //ebbe a div-be lesznek a képek és css-ben csináltunk egy card class-t neki amit most megadunk 

            const img = document.createElement("img");
            img.src = `kepek/${fileName}`;
            /*itt adjuk meg az elérési útvonalat, nagyon fontos, hogy itt kepek/${fileName} legyen és ne csak fileName, mert az nem fog semmit 
            megjeleníteni, az csak egy tömb, amit itt csináltunk, az arra kellett, hogy végigmenjünk rajt és minden körben más fileName-t adjunk
            meg az img.src-jének 
            */
            img.classList.add("hide"); // ne létszódjanak a képek!! opacity: 0;

            //appendChild-olás 
            div.appendChild(img);
            this.memoryGameDiv.appendChild(div);
        }
    }

    turnCard(img, card) {
        /*
        be kér tőlünk egy img-t meg egy card-ot, card-ot csak azért, hogy rotate-eljük az img-t meg azért, hogy tudjunk remove-olni 
        meg add-olni meg arra kell megnézni, hogy van egy olyan class, hogy show meg ezt tesszük bele a selectedCards tömbbe is 

        */

        img.addEventListener("click", ()=> {
            const contains = img.classList.contains("show");
            /*  
            itt ha a selectedCards-nak a length-je nagyobb, mint egy, tehát 2 akkor return 
            mert az szeretnénk, hogy egyszerre csak két kártyát tudjunk megnézni
            */
           if(this.selectedCards.length > 1 && !contains) 
                return;

           /*
           ha egy olyanra kattintunk rá, ami show-val rendelkezik, tehát fel van fordítva, akkor azt hide-oljuk 
           findIndex meg úgy müködik, hogy végigmegy a tömbön és visszaadja az indexét annak amit megadunk feltételnek 
           itt annak az index-ét keressük amire rákattintunk, tehát az img-nek  
           [car.png, cargo-ship.png] -> rákattintunk megint a car.png-re és akkor ezt visszaadja a findIndex, hogy 0 
           és így már a splice-val ki tudjuk venni ezt az elemet a tömbből az index-től indulva 1-et szedjen ki
           tehát magát az index-en álló elemet 
           Fontos, hogyha van splice és egy hosszú elem, akkor meg kell találni, hogy melyik index-en van 
           ezt a findIndex metódussal kell, amit lementünk egy változóba és majd azt adjuk meg a splice-nak, hogy 
           attól egy elemet töröljön 

           */

            if(contains) {
                img.classList.remove("show");
                img.classList.add("hide");
                const index = this.selectedCards.findIndex(i=> i===img);

                this.selectedCards.splice(index, 1);
            } else {
                card.classList.add("rotate");
                //hogy az egész card rotate-eljen ne csak a kép, ami benne van 
                setTimeout(()=> {
                    img.classList.remove("hide");
                    img.classList.add("show");
                });

                this.selectedCards.push(img);
                /*
                else ha meg nincs benne akkor rakja bele, tehát ha nem tartalmazza a contains, akkor push a tömbbe 
                */
            }

            //itt már benne van a kiválasztott két kép a tömbbe és meg kell vizsgálni, hogy ezeknek a src-éi megegyeznek-e 
            //getAttribute!! 
            if(this.selectedCards.length === 2) {
                const src1 = this.selectedCards[0].getAtrtibute("src");
                const src2 = this.selectedCards[1].getAttribute("src");

                /*
                Lementjük a változókba a két elemnek az src-jét a getAttribute-val megszerezzük az értékét 
                és ha ugyanaz pl. [car.png, car.png] akkor növeljük a pontokat és kiürítjük a selectedCards tömböt 
                */

                if(src1 === src2) {
                    this.points++;
                    this.selectedCards = [];
                } else {
                    console.log("Nem egyforma!");

                    this.errors++;
                    //majd ezeket a végén kiírjuk a lementett points meg errorsSpan-ba 
                    
                    const img1 = this.selectedCards[0];
                    const img2 = this.selectedCards[1];
                    this.selectedCards = []; 
                    //ha nem ugyanaz volt a kettő, akkor is kiűrítjük, hogy újra lehessen választani képeket 
                    //img1 meg az img2 azért kellett, hogy majd vissza tudjuk őket fordítani a turnbBack-vel, ha meg ugyanaz, akkor nem kell 

                    setTimeout(()=> {
                        this.turnBack(img1);
                        this.turnBack(img2);
                    }, 1000);

                    this.pointsSpan.innerText = this.points,
                    this.errorsSpan.innerText = this.errors;
                }
            }
        });
    }

    turnBack(img) {
        img.parentNode.classList.remove("rotate"); //mert ez arra a div-re raktuk rá, amiben van a kép parentNode!!!!!!!!!
        img.parentNode.classList.add("rotate-back");

        setTimeout(()=> {
            img.classList.add("hide");
            img.classList.remove("show");
        }, 250);

        setTimeout(()=> {
            img.parentNode.classList("rotate-back");
            img.parentNode.classList("rotate-back");
        }, 500)
    }

    newGame() {
        this.newGameBtn.addEventListener("click", ()=> {
            //pontok lenullázása
            this.points = 0;
            this.errors = 0;

            const cards = document.querySelectorAll(".cards");
            //lementjük sz összes div-et, amiben vannak a képek és mivel ha vége a játéknak akkor az összes fel van fordítva -> lefordítás 

            for(const card of cards) {
                card.children.classList.remove("show");
                card.children.classList.add("hide");
            }

            this.selectedCards = [];
            this.shufflingCards(); // fontos, hogy ezt meg kell hívni minden játék végén
            this.pointsSpan.innerText = 0;
            this.errorsSpan.innerText = 0;
        });
    }
}

new MemoryGame();

// const asdf = [1,2,3,4,5,6,7,8,9,10];
// console.log(asdf.slice(0, 5));
// console.log(asdf.slice(5));

/*
nagyon fontos
- slice visszaad egy új tömböt!!!!! 
ha két érték van megadva, mint itt, akkor a kezdést és befejezést adjuk meg (start, end) 
ugye ezek az értékek amiket megadunk az index-eket fogják jelenteni 
console.log(asdf.slice(0, 5));
itt a nulladik index-től az 5-ig, de az fontos, hogy már nem lesz benne és az új tömb 5 elemet fog tartalmazni nem 6-ot 
-> 
[ 1, 2, 3, 4, 5 ]

console.log(asdf.slice(5));
lehet úgy is, hogy nem adunk meg end index-et csak start-ot és akkor attól kezdve csinálja az új tömböt 
->
[ 6, 7, 8, 9, 10 ]
*/