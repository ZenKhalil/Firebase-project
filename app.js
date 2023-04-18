"use strict";

window.addEventListener("load", () => {
    initApp();
});

async function initApp() {
    console.log("app.js is running 🎉");
    const posts = await getPosts();
    const users = await getUsers();
    displayData(posts);
    displayUsersData(users);
}

const endpoint = "https://new-project-fabad-default-rtdb.europe-west1.firebasedatabase.app";

async function getPosts() {
    const response = await fetch(`${endpoint}/posts.json`);
    const data = await response.json();
    const posts = preparePostData(data);
    console.log(posts);
    return posts;
}

async function getUsers() {
    const response = await fetch(`${endpoint}/users.json`);
    const data = await response.json();
    const users = prepareUsersData(data);
    console.log(users);
    return users;
}

function preparePostData(dataObject) {
    const postArray = [];
    for (const key in dataObject) {
        const post = dataObject[key];
        post.id = key;
        console.log(post);
        postArray.push({
            id: post.id,
            body: post.body,
            title: post.title,
            uid: post.uid,
            image: post.image
        });
    }
    console.log(postArray);
    return postArray;
}

function prepareUsersData(dataObject) {
    const userArray = [];
    for (const key in dataObject) {
        const user = dataObject[key];
        user.id = key;
        console.log(user);
        userArray.push({
            id: user.id,
            title: user.title,
            image: user.image,
            name: user.name,
            mail: user.mail,
            phone: user.phone
        });
    }
    console.log(userArray);
    return userArray;
}

async function displayData(posts) {
    const container = document.querySelector("#post-container");
    for (const post of posts) {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h2>${post.title.toUpperCase()}</h2>
            <h3>${post.body}</h3>
            <img src="${post.image}" alt="${post.title}">
            <h4>${post.uid}</h4>
        `;
        container.appendChild(postElement);
    }
}

async function displayUsersData(users) {
    const container = document.querySelector("#user-container");
    for (const user of users) {
        const userElement = document.createElement("div");
        userElement.classList.add("user");
        userElement.innerHTML = `
            <h2>${user.title.toUpperCase()}</h2>
            <h3>${user.mail}</h3>
            <h3>${user.name}</h3>
            <h4>${user.phone}</h4>
            <img src="${user.image}" alt="${user.title}">
        `;
        container.appendChild(userElement);
    }
}

// Create POST //
async function createPost(title, image) {
    const newPost = { title, image };
    const postAsJSON = JSON.stringify(newPost);

    const res = await fetch(`${endpoint}/posts.json`, {
        method: "POST",
        body: postAsJSON
    });

    const data = await res.json();
    console.log(data);
}

// Test for the function
  //createPost("First post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");


  // Put Data

  // === UPDATE (PUT) === //
async function updatePost(id, title, image) {
    const postToUpdate = { title, image };
    const postAsJson = JSON.stringify(postToUpdate);
		const url = `${endpoint}/posts/${id}.json`;

    const res = await fetch(url, { method: "PUT", body: postAsJson });
    const data = await res.json();
    console.log(data);
}

// test the function
updatePost("-NTJ3Y_3DFnf96Ob3Kuo", "My Second Post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");

 // Delete DATA //

 async function deletePost(id) {
    const url = `${endpoint}/posts/${id}.json`;
    const res = await fetch(url, { method: "DELETE"});
    console.log(res);
}

// Test for the function
//deletePost("-NTJ3Y_3DFnf96Ob3Kuo");

