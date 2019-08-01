const recomendation = document.querySelector(".recomendation")
const aboutMe = document.querySelector(".about-me")
const guestbook = document.querySelector(".guestbook")
const buttonRecomendation = document.querySelector("#recomendation")
const buttonAboutMe = document.querySelector("#about-me")
const buttonSendRecomendation = document.querySelector("#send-recomendation")
const buttonGuestbook = document.querySelector("#guestbook")

buttonRecomendation.addEventListener("click", bringRecomendations)
buttonAboutMe.addEventListener("click", bringAboutMe)
buttonGuestbook.addEventListener("click", bringGuestbook)

function bringRecomendations() {
    aboutMe.classList.remove("open")
    guestbook.classList.remove("open")
    recomendation.classList.toggle("open")
}

function bringAboutMe() {
    recomendation.classList.remove("open")
    guestbook.classList.remove("open")
    aboutMe.classList.toggle("open")
}

function bringGuestbook() {
    aboutMe.classList.remove("open")
    recomendation.classList.remove("open")
    guestbook.classList.toggle("open")
}