var codeInput = document.querySelector('#code-input');
var codeExplanation = document.querySelector('#code-result');
var okBtn = document.querySelector('#ok-btn');

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
    console.log("hi");
});