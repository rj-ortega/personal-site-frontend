const spinner = []

const name = document.querySelector(".title")
const whatsmyname = document.querySelector(".whats-my-name")
const subtitle = document.querySelector(".subtitle")
const modal = document.querySelector(".modal")
const ul = document.querySelector("#ul")
const aboutMe = document.querySelector(".about-me")
const guestbook = document.querySelector(".guestbook")
const form = document.querySelector("form")
const usersUrl = "http://localhost:3000/users"
const entriesUrl = "http://localhost:3000/entries"

const buttonAboutMe = document.querySelector("#about-me")
const buttonGuestbook = document.querySelector("#guestbook")
const buttonHobbies = document.querySelector("#hobbies")
const buttonPlayground = document.querySelector("#playground")


buttonAboutMe.addEventListener("click", bringAboutMe)
buttonGuestbook.addEventListener("click", bringGuestbook)
buttonHobbies.addEventListener("click", bringHobbies)
buttonPlayground.addEventListener("click", bringPlayground)
name.addEventListener("click", spin)
modal.addEventListener("click", toggleModal)
ul.addEventListener("click", deleteComment)

function deleteComment(event) {
    if (event.target.id != "deleteButton") return;
    else if (window.confirm("Are you sure about this?")) {

        const message = event.target.parentNode.parentNode.firstChild.dataset.entryId

        fetch(`${entriesUrl}/${message}`, {
                method: "delete"
            })
            .then(res => res.json())
        event.target.parentNode.parentNode.remove()
    }
}


function bringAboutMe() {
    guestbook.classList.remove("open")
    hobbies.classList.remove("open")
    playground.classList.remove("open")
    aboutMe.classList.toggle("open")
}

function bringGuestbook() {
    aboutMe.classList.remove("open")
    hobbies.classList.remove("open")
    playground.classList.remove("open")
    guestbook.classList.toggle("open")
}

function bringHobbies() {
    modal.classList.add("open-modal")
}

function bringPlayground() {
    modal.classList.add("open-modal")
}

function spin() {
    name.style.transform && name.style.transform != "none" ? stahp() : spinIt()
}

function spinIt() {
    spinner.push(setInterval(changeIt, 8))

    let number = 0
    let styleNumber = 0

    function changeIt() {
        if (number < 361) {
            number += 1
            styleNumber += 1 / 360
        } else {
            setTimeout(() => number = 0, 1000)
            setTimeout(() => styleNumber = 0, 1000)
        }
        subtitle.style.color = `hsl(${number}, 100%, 50%)`
        whatsmyname.style.transform = `rotate3d(20, 1, -1, ${number}deg)`
        subtitle.style.transform = `rotate3d(0, 15, 0, ${number}deg)`
        name.style.transform = `scale(${styleNumber})`
    }
}

function stahp() {
    spinner.forEach(repeat => clearInterval(repeat))
    whatsmyname.style.color = `rgba(255, 255, 255, 0.8)`
    subtitle.style.color = `rgba(220, 220, 220, 0.9)`
    whatsmyname.style.transform = `none`
    subtitle.style.transform = `none`
    name.style.transform = `none`
}

function toggleModal(event) {
    event.target.classList.remove("open-modal")
}

fetch(entriesUrl)
    .then(res => res.json())
    .then(getInfo)

function getInfo(entries) {
    entries.data.forEach(entry => {
        let user = {
            name: entry.attributes.user_name,
            id: entry.relationships.user.data.id
        }
        let message = {
            text: entry.attributes.message,
            id: entry.id
        }
        displayInfo(user, message)
    })
}

function displayInfo(user, message) {
    const li = document.createElement("li")
    li.classList.add("entries")
    li.innerHTML = `<p data-entry-id="${message.id}" class="entry-message">${message.text}</p><p data-user-id="${user.id}" class="entry-user">- ${user.name} <i id="deleteButton" class="fas fa-times-circle"></i></p>`
    ul.prepend(li)
}

form.addEventListener("submit", postIt)

function postIt(event) {
    event.preventDefault()
    let userName = document.getElementById("name").value
    let messageText = document.getElementById("message").value
    let entryBody = {
        name: userName
    }
    fetch(usersUrl, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryBody)
        })
        .then(res => res.json())
        .then(data => {
            let userBody = {
                message: messageText,
                user_id: data.id
            }
            return fetch("http://localhost:3000/entries/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userBody)
            })

        })
        .then(res => res.json())
        .then(entry => {
            let user = {
                name: entry.data.attributes.user_name,
                id: entry.data.relationships.user.data.id
            }
            let message = {
                text: entry.data.attributes.message,
                id: entry.data.id
            }
            displayInfo(user, message)
        })
    event.target.reset()
}