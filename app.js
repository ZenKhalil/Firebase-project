"use strict";

window.addEventListener("load", initApp);

function initApp() {
    console.log("app.js is running 🎉");
    getPosts();
}

const endpoint = "https://new-project-fabad-default-rtdb.europe-west1.firebasedatabase.app";

async function getPosts() {
	const response = await fetch(`${endpoint}/posts.json`); // Posts.json is the data ressource
	const data = await response.json();
    const posts = preparePostData(data);
	console.log(posts);
    return posts;
}

function preparePostData(dataObject) {
const postArray = [];
for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    console.log(post);
    postArray.push(post);
}
console.log(postArray);
return postArray;
}