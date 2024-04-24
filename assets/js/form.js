const brandEL = document.querySelector('.brand');
const newPostBtn = document.querySelector('#new-post-btn');
const landingDiv = document.querySelector('.landing');
const newPostForm = document.querySelector('.new-post-form');
const inputs = document.querySelectorAll('.post-input');
const postBtn = document.querySelector('#post-btn');
const returnBtn = document.querySelector('#return-btn');
const gotoBtn = document.querySelector('#goto-btn');
const userInput = document.querySelector('#user-input');
const titleInput = document.querySelector('#title-input');
const contInput = document.querySelector('#content-input');

let posts = [];

const getData = () => {
    if (localStorage.getItem('posts')) posts = JSON.parse(localStorage.getItem('posts'));
};

const storeData = () => {
    localStorage.setItem('savedPosts', JSON.stringify(posts));
};


const newPostFunc = () => {
    brandEL.classList.remove('hidden');
    landingDiv.classList.remove('flex');
    landingDiv.classList.add('hide');
    newPostForm.classList.remove('hide');
    newPostForm.classList.add('grid');
};

const postFunc = (e) => {
    e.preventDefault();
    let post = { user: '', title: '', content: '',};

    post.user = userInput.value;
    post.title = titleInput.value;
    post.content = contInput.value;
    
    userInput.value = '';
    titleInput.value = '';
    contInput.value = '';
    
    posts.push(post);
    storeData();

    setTimeout(() => window.location.href = 'blog.js', 1000);
};

const gotoFunc = () => window.location.href = 'blog.js';

const returnFunc = (e) => {
    e.preventDefault();

    brandEL.classList.add('hidden');
    landingDiv.classList.add('flex');
    landingDiv.classList.remove('hide');
    newPostForm.classList.add('hide');
    newPostForm.classList.remove('grid');
};
    
const readyLandFunc = () => {
    newPostBtn.addEventListener('click', newPostFunc);
    postBtn.addEventListener('click', postFunc);
    returnBtn.addEventListener('click', returnFunc);
    gotoBtn.addEventListener('click', gotoFunc);
    getData();

};

window.onload = readyLandFunc();