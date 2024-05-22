/*
Transform-nak a fajtái 
3 főbb dolgott tudunk ezzel csinálni, fontos, hogy mindegyiknál van olyan, hogy x-tengely, y-tengely, z-tengely 
1. translate 
-> 
ezzel tudunk egy elemet elmozdítani a helyéről 
->
- translate(valamennyi px, valamennyi px) 
    Elmozdítjuk az elemet az x és az y-tengelyen, annyi px-vel, amennyit beírtunk (fontos a sorrend elöször x utána y)

- translateX(valamennyi px)
    Elmozdítjuk az elemet valamennyi px-vel az x-tengelyen tehát horizontálisan 

- translateY(valamennyi px)
    Elmozdítjuk az elemet valamennyi px-vel az y-tengelyen tehát vertikálisan

- translateZ(valamennyi px)
    Ugyanez a z-tengelyen 

- translate3d(valamennyi px, valamennyi px, valamennyi px)
    Ez meg az összes tengelyen elmozdítja az elemet 

2. rotate
    Elfordítjuk az elemet valamennyi fokkal -> deg!! lehet ez - is!!!!!!!!!!!!!!!! ha azt akarjuk, hogy vissza fordítsa 
-> 
- rotate(deg) 
    Elfordítja az elemet egy bizonyos fokkal az x és az y-tengelyen 

- rotateX(deg)
    Elfordítja az elemet az x-tengelyen egy bizonyos fokkal 

- rotateY(deg)
    Elfordítja az elemet az y-tengelyen 

- rotateZ(deg)
    Z-tengelyen fordítja 

- rotate3d(deg, deg, deg)?
    Mindegyik tengelyén elfordítja az elemet

3. Scale 
    Ezzel tudjuk megváltoztatni az elem nagyságát, ilyen értéket kaphat, hogy 2, 1.5 vagy 0.5(ha kicsinyíteni akarunk)
-> 
- scale(2,3) 
    - Megnagobbítja vagy lekicsinyíti az elemet az x tengelyen 2-szeresére az y tengelyen meg 3-szorosára 

- scaleX()
    Megnagyobbítja vagy lekicsinyíti az elemet az x-tengelyen 

- scaleY()
    Megnagyobbítja vagy lekicsinyíti az elemet az y-tengelyen 

- scale3d() 
    Mindegyik tengelyen lehet nagyítani meg kicsinyíteni is 

pl. .element {
    transform: translate(50px, 100px) rotate(45deg) scale(1.5)
}

Nagyon fontos, hogy ennek lehet egy olyat adni, hogy transition, hogyan menjen végbe a folyamat 
*/


