const spinner = []

const name = document.querySelector(".title")
const whatsmyname = document.querySelector(".whats-my-name")
const subtitle = document.querySelector(".subtitle")
const modal = document.querySelector(".modal")

const aboutMe = document.querySelector(".about-me")
const guestbook = document.querySelector(".guestbook")

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