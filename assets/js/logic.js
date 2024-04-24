const modeBtn = document.querySelector('#mode-btn');
const modeText = document.querySelector('.mode-text');
const rootEl = document.querySelector(':root');
const modeIcon = document.querySelector('#mode-icon');
const brand = document.querySelector('#brand');
let prefMode = '';

// The following func will save the "color-scheme" preference of the user in the local storage, and it'll be called every time the user changes mode.
const saveMode = () => {
    localStorage.setItem('color-scheme', prefMode);
};

// This function will set an initial "color-scheme" depending on the preferences of the user. It will be triggered both by an event that listens to a change in the user's preferences or when the page is first loading.
const detectMode = () => {
    // If the user preferences are already set, it will stop the execution to prevent code from running without use.
    if (localStorage.getItem('color-scheme') && localStorage.getItem('color-scheme') === getComputedStyle(rootEl).getPropertyValue('color-scheme')) return

    // If the function is triggered by the event that listens for a change in the user's preferences it will change the color-scheme.
    // The following lines will check if the user saved a preference into the local storage or if there's a request for a specific color-scheme.
    if (localStorage.getItem('color-scheme')) rootEl.style.colorScheme = localStorage.getItem('color-scheme');
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) rootEl.style.colorScheme = 'dark';
    else rootEl.style.colorScheme = 'light';

    setMode();
};

// To set dark-mode's values by changing the CSS root variables.
const darkMode = () => {
    rootEl.style.setProperty('--body-bg', 'rgb(23, 23, 23)');
    rootEl.style.setProperty('--hover-btn-bg', 'rgb(255, 255, 255, 0.3)');
    rootEl.style.setProperty('--main-font-color', 'rgb(208, 208, 208)');
    rootEl.style.setProperty('--highlight-font-color', 'rgb(255, 255, 255)');
    rootEl.style.setProperty('--btn-color-hover', 'rgb(255, 97, 124)');
    rootEl.style.setProperty('--btn-color-sec', 'rgb(178, 178, 178)');
    rootEl.style.setProperty('--btn-color-sec-hover', 'rgb(150, 150, 150)');
    rootEl.style.setProperty('--font-color-inverted', 'rgb(60, 60, 60)');
    modeIcon.classList.add('fa-light');
    modeIcon.classList.remove('fa-solid');
    modeText.innerText = 'dark mode';
    modeText.classList.remove('hidden');
    
    // A timeout so that the user notice the change in the button. 
    setTimeout(() => modeText.classList.add('hidden'), 1000);
};

// To set dark-mode's values by changing the CSS root variables.
const lightMode = () => {
    rootEl.style.setProperty('--body-bg', 'white');
    rootEl.style.setProperty('--hover-btn-bg', 'rgb(0, 0, 0, 0.3)');
    rootEl.style.setProperty('--main-font-color', 'rgb(46, 46, 46)');
    rootEl.style.setProperty('--highlight-font-color', 'rgb(0, 0, 0)');
    rootEl.style.setProperty('--btn-color-hover', 'rgb(210, 24, 55)');
    rootEl.style.setProperty('--btn-color-sec', 'rgb(116, 116, 116)');
    rootEl.style.setProperty('--btn-color-sec-hover', 'rgb(129, 129, 129)');
    rootEl.style.setProperty('--font-color-inverted', 'rgb(227, 227, 227)');
    modeIcon.classList.add('fa-solid');
    modeIcon.classList.remove('fa-light');
    modeText.innerText = 'light mode';
    modeText.classList.remove('hidden');

    // A timeout so that the user notice the change in the button. 
    setTimeout(() => modeText.classList.add('hidden'), 1000);
};

// This function will be called after a change in preferences, on load, or a change event.
const setMode = () => {
    const mode = getComputedStyle(rootEl).getPropertyValue('color-scheme');
    
    if (mode === 'dark') {
        darkMode();
    } else {
        lightMode();
    }
};

// This function will be called when clicking the color mode button.
const changeMode = () => {
    const mode = getComputedStyle(rootEl).getPropertyValue('color-scheme');
    
    if (mode === 'dark') {
        rootEl.style.colorScheme = 'light';
        prefMode = 'light';
        lightMode();
        saveMode();
    } else {
        rootEl.style.colorScheme = 'dark';
        prefMode = 'dark';
        darkMode();
        saveMode();
    }

    // A couple of lines to prevent double clicking that activates the button again after half a second.
    modeBtn.removeEventListener('click', changeMode);
    setTimeout(() => modeBtn.addEventListener('click', changeMode), 500);
};

const readyFunc = () => {
    modeBtn.addEventListener('click', changeMode);
    brand.addEventListener('click', () => window.location.href = 'index.html');
    detectMode();

    // An event that listens for changes in the user's preferences.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectMode);
};

window.onload = readyFunc();