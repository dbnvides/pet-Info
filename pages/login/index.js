import { login } from "../../scripts/requests.js";

const btnGoRegister = document.querySelector('#btn-go-register')

btnGoRegister.addEventListener('click', () =>{
    window.location.replace('../register/register.html')
})

const eventLogin = () => {

    const form = document.querySelector('form')
    const elements = [...form.elements]
    const btnAcess = document.querySelector('.btn-login')
    
    validatioButton()

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        btnAcess.innerHTML = ''

        btnAcess.classList.add('btn-user-spinner')

        let img = document.createElement('img')
        img.src = '../assests/spinner.png'

        btnAcess.append(img)

        const body = {}

        elements.forEach((el) => {

            if (el.tagName == 'INPUT' && el.value !== '') {
                body[el.id] = el.value
            }
        })

        await login(body)
    })

}

function validatioButton() {
    const InputEmail = document.querySelector('#email')
    const InputPasswd = document.querySelector('#password')
    const buttonAcess = document.querySelector('.btn-login')
    const form = document.querySelector('form')

    buttonAcess.disabled = true

    form.addEventListener('input', async (e) => {
        e.preventDefault()

        if (InputEmail.value !== '' && InputPasswd.value !== '') {
            buttonAcess.disabled = false
            buttonAcess.classList.remove('button-desable')
        }else{
            buttonAcess.disabled = true
            buttonAcess.classList.add('button-desable')
        }

    })

}

eventLogin()