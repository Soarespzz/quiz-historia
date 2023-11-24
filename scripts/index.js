const btnVoltar = document.getElementById("voltar-inicio")

function scrollInicio () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function buttonVisibility() {
    if(window.scrollY > window.innerHeight) {
        btnVoltar.style.display = 'block'
    } else {
        btnVoltar.style.display = 'none'
    }
}

window.addEventListener("scroll", buttonVisibility)

btnVoltar.addEventListener("click", () => {
    scrollInicio()
})