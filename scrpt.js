var codeInput = document.querySelector('#code-input');
var codeExplanation = document.querySelector('#code-result');
var okBtn = document.querySelector('#ok-btn');
var nyanCat = document.querySelector('#nyan-Cat');

codeInput.addEventListener('input', (e) => {
    codeInput.style.height = '100px';
    codeInput.style.height = e.target.scrollHeight + 'px';
});
codeExplanation.addEventListener('input', (e) => {
    codeExplanation.style.height = '100px';
    codeExplanation.style.height = e.target.scrollHeight + 'px';
});

// click and select all
codeInput.addEventListener('click', (e) => {
    e.target.select();
});

//set placeholder
codeInput.innerHTML = "if (sad() === true) {\n    sad().stop(); \n    beAwesome();\n}";
codeExplanation.innerHTML = "The code checks if the person is sad. If the person is sad, the code makes them stop being sad and become awesome instead.";

okBtn.addEventListener('click', (e) => {
    runAnimation();
});

async function runAnimation() {
    await runToRight();
    await rotateY();
    await runToLeft();
    await rotateY();
    await removeClass();
}

function runToRight() {
    return new Promise((resolve, reject) => {
        nyanCat.classList.add('horizTranslateToRight');
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

function rotateY() {
    return new Promise((resolve, reject) => {
        nyanCat.classList.add('rotateY');
        setTimeout(() => {
            resolve();
        }, 500);
    });
}

function runToLeft() {
    return new Promise((resolve, reject) => {
        nyanCat.classList.add('horizTranslateToLeft');
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

function removeClass() {
    return new Promise((resolve, reject) => {
        nyanCat.classList.remove('horizTranslateToRight');
        nyanCat.classList.remove('rotateY');
        nyanCat.classList.remove('horizTranslateToLeft');
        nyanCat.classList.add('rotateYY');
        setTimeout(() => {
            nyanCat.classList.remove('rotateYY');
            resolve();
        }, 500);
    });
}