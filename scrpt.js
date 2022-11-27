var container = document.querySelector('#container');
var codeInput = document.querySelector('#code-input');
var codeExplanation = document.querySelector('#code-result');
var qicon = document.querySelector('#q-icon');
var shareIcon = document.querySelector('#share-icon');
var okBtn = document.querySelector('#ok-btn');
var cpBtn = document.querySelector('#cp-btn');
var nyanCat = document.querySelector('#nyan-Cat');

codeInput.addEventListener('input', (e) => {
    codeInput.style.height = '100px';
    codeInput.style.height = e.target.scrollHeight + 'px';
    scrollToBottom();
});
codeExplanation.addEventListener('input', (e) => {
    codeExplanation.style.height = '100px';
    codeExplanation.style.height = e.target.scrollHeight + 'px';
    scrollToBottom();
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
    postData();
});

// disenble cpBtn

cpBtn.addEventListener('click', (e) => {
    // copy to clipboard
    var copyText = document.querySelector('#code-result').value;
    copyContent(copyText);
    jump();
});

async function copyContent(text) {
    try {
        await navigator.clipboard.writeText(text);
        //console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

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
        }, 1500);
    });
}

function rotateY() {
    return new Promise((resolve, reject) => {
        nyanCat.classList.add('rotateY');
        setTimeout(() => {
            resolve();
        }, 300);
    });
}

function runToLeft() {
    return new Promise((resolve, reject) => {
        nyanCat.classList.add('horizTranslateToLeft');
        setTimeout(() => {
            resolve();
        }, 1500);
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
        }, 300);
    });
}

async function jump() {
    //console.log("jump");
    await jumpToTop();
    await jumpToBottom();
    nyanCat.classList.remove('vertTranslateToTop');
    nyanCat.classList.remove('vertTranslateToDown');
}

function jumpToTop() {
    return new Promise((resolve, reject) => {
        nyanCat.classList.add('vertTranslateToTop');
        setTimeout(() => {
            resolve();
        }, 300);
    });
}

function jumpToBottom() {
    return new Promise((resolve, reject) => {
        nyanCat.classList.add('vertTranslateToDown');
        setTimeout(() => {
            resolve();
        }, 100);
    });
}



async function postData() {
    switchCopyStatus(false);
    let update = {
        "sentences": codeInput.value,
    };

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(update),
    };

    console.log("data", update);
    fetch('http://101.43.138.40:83/response', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data.json();
        }).then(update => {
            //console.log(update);
            codeExplanation.innerHTML = update.response;
            switchCopyStatus(true);
            scrollToBottom();
        }).catch(e => {
            console.log(e);
        });
}


function switchCopyStatus(avtive) {
    if (avtive === true) {
        cpBtn.classList.add('cp-btn-active');
    } else {
        cpBtn.classList.remove('cp-btn-active');
    }
}

function heightToTop(ele) {
    let root = document.body;
    let height = 0;
    do {
        height += ele.offsetTop;
        ele = ele.offsetParent;
    } while (ele !== root)
    return height;
}


function scrollToBottom() {
    let bottom = document.getElementById("cp-btn");
    window.scrollTo(0, heightToTop(bottom));
}

qicon.addEventListener('click', (e) => {
    // open in new tab
    window.open('https://github.com/yuenci/What-does-this-code-mean', '_blank');
});


shareIcon.addEventListener('click', (e) => {
    // sent text to clipboard
    let text = "What does this code mean? https://yuenci.github.io/What-does-this-code-mean/";
    copyContent(text);
    alert("Link copied to clipboard");
});