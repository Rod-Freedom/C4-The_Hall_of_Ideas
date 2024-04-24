const brandEL = document.querySelector('.brand');
const newPostBtn = document.querySelector('#new-post-btn');
const landingDiv = document.querySelector('.landing');
const newPostForm = document.querySelector('.new-post-form');
const errorMsg = document.querySelector('.error-form');
const inputs = document.querySelectorAll('.post-input');
const postBtn = document.querySelector('#post-btn');
const returnBtn = document.querySelector('#return-btn');
const gotoBtn = document.querySelector('#goto-btn');
const userInput = document.querySelector('#user-input');
const titleInput = document.querySelector('#title-input');
const contInput = document.querySelector('#content-input');
// This variable declares a new array to store each post as an object. 
let posts = [];

// A function to look for data in the local storage.
const getData = () => {
    if (localStorage.getItem('savedPosts')) posts = JSON.parse(localStorage.getItem('savedPosts'));
};

// A function to save data in the local storage.
const storeData = () => {
    localStorage.setItem('savedPosts', JSON.stringify(posts));
};

// This function is triggered by an event that listens for a click in the "New post" button.
const newPostFunc = () => {
    // When the banner is hidden, the brand shows in the header. First, it disappears gradually within a second, and then it's completely hidden from display.
    brandEL.classList.remove('hide');
    brandEL.classList.add('flex');
    brandEL.classList.add('pointer');
    // These lines will hide the main landing display to show the form.
    landingDiv.classList.remove('flex');
    landingDiv.classList.add('hide');
    newPostForm.classList.remove('hide');
    newPostForm.classList.add('grid');
    // A little break to prevent the brand from showing suddenly.
    setTimeout(() => brandEL.classList.remove('hidden'), 100);
};

// The following function will display an error message and it's executed after a user clicks on "post now" without having filled the form properly. 
const errorAlert = () => {
    // The "post now" button will deactivate to prevent consecutive clicking from breaking the execution.
    postBtn.removeEventListener('click', postFunc);

    errorMsg.classList.remove('hide');
    errorMsg.classList.add('flex');
    // These timeouts help create the effect of fading out.
    // After all the transitions, the event listener will activate again.
    setTimeout(() => {
        errorMsg.classList.add('hidden');
        setTimeout(() => {
            errorMsg.classList.add('hide');
            errorMsg.classList.remove('flex');
            errorMsg.classList.remove('hidden');
            postBtn.addEventListener('click', postFunc);
        }, 1000)
    }, 1000);
};

// This func. is called by an event that listens on the "post now" button, and it will store the new post in the array and then in the local storage.
const postFunc = (e) => {
    e.preventDefault();

    // If any of the input fields are empty, this next line will stop the execution and display an alert.
    if (userInput.value === '' || titleInput.value === '' || contInput.value === '') return errorAlert()

    let post = { user: '', title: '', content: '',};

    post.user = userInput.value;
    post.title = titleInput.value;
    post.content = contInput.value;
    
    // To clear the inputs after posting.
    userInput.value = '';
    titleInput.value = '';
    contInput.value = '';
    
    // After pushing the new object into the array, the local storage will be updated.
    posts.push(post);
    storeData();
    
    // To give a feeling that you posted, the site doesn't redirect after a second.
    setTimeout(() => window.location.href = 'blog.html', 1000);
};

// To change location when clicking on the "Go to feed" button.
const gotoFunc = () => window.location.href = 'blog.html';

// This returns to the landing page after clicking "return".
const returnFunc = (e) => {
    e.preventDefault();
    
    brandEL.classList.add('hidden');
    landingDiv.classList.add('flex');
    landingDiv.classList.remove('hide');
    newPostForm.classList.add('hide');
    newPostForm.classList.remove('grid');
    // This pause will give the transition time to act before disappearing the object.
    setTimeout(() => {
        brandEL.classList.add('hide');
        brandEL.classList.remove('flex');
    }, 1000);
    
    // These lines are to reset the form.
    userInput.value = '';
    titleInput.value = '';
    contInput.value = '';
};
    
// A func. on load, to activate all the event listeners and retrieve the data from the local storage.
const readyLandFunc = () => {
    newPostBtn.addEventListener('click', newPostFunc);
    postBtn.addEventListener('click', postFunc);
    returnBtn.addEventListener('click', returnFunc);
    gotoBtn.addEventListener('click', gotoFunc);
    getData();
};

window.onload = readyLandFunc();