import { register } from "../../scripts/requests.js";

const eventRegister = () => {
    
    const form = document.querySelector('form')
    const elements = [...form.elements]
    const buttonRegister = document.querySelector('.button-register')
    
    validatioButton()

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        buttonRegister.innerHTML = ''

        buttonRegister.classList.add('btn-user-spinner')

        let img = document.createElement('img')
        img.src = '../assests/spinner.png'

        buttonRegister.append(img)

        const body = {}

        elements.forEach((el) => {

            if (el.tagName == 'INPUT' && el.value !== '') {
                body[el.id] = el.value
            }
        })

        await register(body)

        setTimeout(() => {
                buttonRegister.innerHTML = 'Cadastrar'
        }, 3000)

    })
    buttonRegister.innerHTML = ''
    buttonRegister.innerHTML = 'Cadastrar'
}

function validatioButton() {
    const inputUserID = document.querySelector('#username')
    const inputEmail = document.querySelector('#email')
    const inputLink = document.querySelector('#avatar')
    const inputPasswd = document.querySelector('#password')
    const buttonRegister = document.querySelector('.button-register')
    const form = document.querySelector('form')
    
    buttonRegister.disabled = true

    form.addEventListener('input', async (e) => {
        e.preventDefault()
       
        if (inputUserID.value !== '' && inputEmail.value !== '' && inputLink.value !== '' &&inputPasswd.value !== '') {
            buttonRegister.disabled = false
            buttonRegister.classList.remove('button-desable')
        }else{
            buttonRegister.disabled = true
            buttonRegister.classList.add('button-desable')
        }

    })

}

eventRegister()