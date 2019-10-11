let btn = document.getElementById("start")
let hide = document.getElementById("hideContent")
let show = document.getElementById("showContent")

btn.addEventListener("click", () => {
    hide.style.display = "none"
    show.style.display = "block"
})