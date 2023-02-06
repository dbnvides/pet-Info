const toast = (title, message) => {
    const body = document.querySelector("body")

    const container = document.createElement("div")
    container.classList.add("toast-container")

    const icon = document.createElement("img")
    icon.alt = `Mensagem de ${title}`
    icon.classList.add('img-type')

    const textContainer = document.createElement("div")

    const h3 = document.createElement("h3")
    h3.innerText = title

    const span = document.createElement("span")
    span.innerText = message

    if (title == 'Post criado com sucesso!') {
        container.classList.add("toast-container")
        h3.classList.add('h3-sucess')
        icon.src = "/pages/assests/checkin.svg"
    }

    else if (title == "Sucesso!") {
        container.classList.add("successToast")
        icon.src = "/pages/assests/checkin.svg"
    } else {
        container.classList.add("errorToast")
        console.log('caiu aqui')
        icon.src = "/pages/assests/error.png"
    }


    textContainer.append(h3, span)

    container.append(icon, textContainer)

    body.appendChild(container)

}

const toastRegister = (title, message) => {
    const body = document.querySelector("body")

    const container = document.createElement("div")
    container.classList.add("tost-register-sucess")

    const icon = document.createElement("img")
    icon.alt = `Mensagem de ${title}`
    icon.classList.add('img-type')

    const divTop = document.createElement('div')
    divTop.classList.add('div-top')

    const divBottom = document.createElement('div')
    divBottom.classList.add('div-bottom')

    const textContainer = document.createElement("div")

    const h3 = document.createElement("h3")
    h3.classList.add('text1')
    h3.innerText = title

    const span = document.createElement("span")
    span.classList.add('text1')
    span.innerText = message

    const a = document.createElement('a')
    a.innerText = 'Acessar página de login'


    if (title == 'Post deletado com sucesso!') {
        container.classList.add("successToast")
        h3.classList.add('h3-sucess')
        icon.src = '/pages/assests/checkin.svg'
        a.innerText = ''
    }

    else if (title == "Sua conta foi criada com sucesso!") {
        container.classList.add("successToast")
        h3.classList.add('h3-sucess')
        icon.src = "/pages/assests/checkin.svg"
        a.setAttribute('href', '../login/index.html')

    } else {
        container.classList = ("errorToast toast-container")
        icon.src = "/pages/assests/error.png"
        a.innerHTML = ''
        container.classList.add("toast-container")
    }


    divTop.append(icon, h3)
    divBottom.append(span, a)
    textContainer.append(divTop, divBottom)
    container.append(textContainer)
    body.appendChild(container)

}
export { toast, toastRegister }