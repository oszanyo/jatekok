// Keresd meg az összes címkét és cseppzónát
const labels = document.querySelectorAll('.label'); // Ezek a címkék, amiket húzni lehet
const dropZones = document.querySelectorAll('.drop-zone'); // Ezek a helyek, ahova a címkéket le lehet tenni
const initialContainer = document.getElementById('initial-container'); // Itt vannak a címkék, amikor nem mozgunk velük

// Minden címkénél, amikor elindítod a húzást
labels.forEach(label => {
    label.addEventListener('dragstart', dragStart); // Amikor elkezded húzni a címkét, hívd meg a dragStart funkciót
});

// Minden cseppzónánál, amikor ráhúzod a címkét
dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver); // Amikor a címkét fölé húzod, hívd meg a dragOver funkciót
    zone.addEventListener('drop', drop); // Amikor a címkét leteszed, hívd meg a drop funkciót
});

// Engedd meg, hogy az alap tároló is fogadjon címkéket
initialContainer.addEventListener('dragover', dragOver); // Amikor a címkét fölé húzod, hívd meg a dragOver funkciót
initialContainer.addEventListener('drop', dropToInitialContainer); // Amikor a címkét leteszed, hívd meg a dropToInitialContainer funkciót

// Amikor megnyomod a gombot, ellenőrizd a megoldást
document.getElementById('check-solution').addEventListener('click', checkSolution);

// Ez a funkció akkor indul, amikor elkezded húzni a címkét
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id); // Mond meg, hogy melyik címkét húzod
}

// Ez a funkció akkor indul, amikor a címkét a cseppzóna fölé húzod
function dragOver(e) {
    e.preventDefault(); // Engedd meg, hogy a címke lekerüljön
}

// Ez a funkció akkor indul, amikor leteszed a címkét a cseppzónába
function drop(e) {
    e.preventDefault(); // Ne frissítsd az oldalt

    // Nézd meg, hogy van-e már címke a cseppzónában
    if (e.target.firstChild) {
        return; // Ha van már címke, ne csinálj semmit
    }

    const labelId = e.dataTransfer.getData('text'); // Szerezd meg, melyik címkét húztad
    const label = document.getElementById(labelId); // Keresd meg a címkét

    // Tedd a húzott címkét a cseppzónába
    e.target.appendChild(label);

    // Állítsd vissza a helyettesítő szöveget semleges állapotra
    resetPlaceholder();
}

// Ez a funkció akkor indul, amikor leteszed a címkét az alap tárolóba
function dropToInitialContainer(e) {
    e.preventDefault(); // Ne frissítsd az oldalt
    const labelId = e.dataTransfer.getData('text'); // Szerezd meg, melyik címkét húztad
    const label = document.getElementById(labelId); // Keresd meg a címkét

    // Mozgasd a címkét vissza az alap tárolóba
    initialContainer.appendChild(label);

    // Állítsd vissza a helyettesítő szöveget semleges állapotra
    resetPlaceholder();
}

// Ez a funkció visszaállítja a helyettesítő szöveget
function resetPlaceholder() {
    const placeholder = document.getElementById('solution-placeholder'); // Keresd meg a helyettesítőt
    placeholder.textContent = ''; // Tedd üressé a szöveget
    placeholder.style.backgroundColor = 'rgba(255, 255, 0, 0.3)'; // Állítsd vissza a háttérszínt sárgára
}

// Ez a funkció ellenőrzi, hogy helyes-e a megoldás
function checkSolution() {
    let allCorrect = true; // Minden helyes változó, ami igaz

    dropZones.forEach(zone => {
        const expectedLabel = zone.getAttribute('data-label'); // Szerezd meg, melyik címkét várjuk
        const droppedLabel = zone.firstChild ? zone.firstChild.textContent : null; // Nézd meg, van-e címke a zónában

        if (droppedLabel !== expectedLabel) {
            allCorrect = false; // Ha nem egyezik, akkor nem minden helyes
        }
    });

    const placeholder = document.getElementById('solution-placeholder'); // Keresd meg a helyettesítőt
    
    if (allCorrect) {
        placeholder.textContent = 'Helyes megoldás :)'; // Ha minden helyes, írd ki, hogy helyes
        placeholder.style.backgroundColor = 'rgba(0, 255, 0, 0.3)'; // Állítsd a háttérszínt zöldre
    } else {
        placeholder.textContent = 'Helytelen megoldás'; // Ha nem helyes, írd ki, hogy helytelen
        placeholder.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // Állítsd a háttérszínt pirosra
    }
}

// Keresd meg a reset gombot
document.getElementById('reset-button').addEventListener('click', resetLabels);

// Ez a funkció visszaállítja a címkéket az alap tárolóba
function resetLabels() {
    const labels = document.querySelectorAll('.label'); // Keresd meg az összes címkét
    
    labels.forEach(label => {
        // Mozgasd vissza minden címkét az alap tárolóba
        initialContainer.appendChild(label);
    });

    // Állítsd vissza a helyettesítőt semleges állapotra
    resetPlaceholder();
}
