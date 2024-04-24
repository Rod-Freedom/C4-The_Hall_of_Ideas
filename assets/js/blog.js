const returnBtn = document.querySelector('#return-btn');
const postsSection = document.querySelector('.posts');
const errorDiv = document.querySelector('.error-div');


let posts = [];

const getData = () => {
    if (localStorage.getItem('savedPosts')) {
        posts = JSON.parse(localStorage.getItem('savedPosts'));
        posts.forEach(renderPosts);
    }
    else return noPostsFunc()
};

const noPostsFunc = () => {
    errorDiv.classList.add('flex');
    errorDiv.classList.remove('hide');
}

const renderPosts = (post) => {
    const postEl = document.createElement('article');
    const postHeadEl = document.createElement('h3');
    const postMainEl = document.createElement('p');
    const postFootEl = document.createElement('p');

    postHeadEl.innerText = post.title;
    postMainEl.innerText = post.content;
    postFootEl.innerText = `by ${post.user}`

    postEl.classList.add('post');
    postHeadEl.classList.add('post-header');
    postMainEl.classList.add('post-main');
    postFootEl.classList.add('post-footer');
    postEl.classList.add('flex');
    postHeadEl.classList.add('flex');
    postMainEl.classList.add('flex');
    postFootEl.classList.add('flex');

    postsSection.appendChild(postEl);
    postEl.appendChild(postHeadEl);
    postEl.appendChild(postMainEl);
    postEl.appendChild(postFootEl);
}

const returnFunc = () => window.location.href = 'index.html';

const readyBlogFunc = () => {
    getData();
    returnBtn.addEventListener('click', returnFunc);
    console.log(posts);
};

window.onload = readyBlogFunc();