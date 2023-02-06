import { toast, toastRegister } from "./toast.js"
import { getLocalStorage } from "./localStorage.js"

const baseUrl = "http://localhost:3333/"

const btnAcess = document.querySelector('.btn-login')
const inputPasswd = document.querySelector('#password')

async function login(body) {

    try {

        const request = await fetch(baseUrl + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {

            const response = await request.json()

            toast('Sucesso!', 'Login feito com sucesso')

            localStorage.setItem("user", JSON.stringify(response))

            setTimeout(() => {

                window.location.replace("../home/home.html")

            }, 3000)


        } else {
            toast('Erro!', "Usuário não foi encontrado")
            let pTexAlert = document.querySelector('.text-alert')
            pTexAlert.classList.remove('text-alert')
            pTexAlert.classList.add('text-alert-on')
            btnAcess.innerHTML = 'Acessar'
            inputPasswd.classList.add('input-incor')

        }

    } catch (err) {
        toast("Erro!", "Usuário não foi encontrado")
        btnAcess.innerHTML = 'Acessar'
    }


}

async function register(body) {

    const btnRegister = document.querySelector('.btn-register')

    try {
        const request = await fetch(baseUrl + "users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            toastRegister('Sua conta foi criada com sucesso!', 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:')

        } else {
            toastRegister('Erro!', "Usuário não cadastrado")

        }

    } catch {
        toastRegister('Erro!', "Usuário não cadastrado")
    }
}

async function getPost() {

    const localStorage = getLocalStorage()

    try {

        const request = await fetch(baseUrl + 'posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })

        const response = await request.json()

        return response

    } catch (err) {
        console.log(err)
    }
}

async function getUser() {

    const localStorage = getLocalStorage()

    try {
        const request = await fetch(baseUrl + 'users/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        const response = await request.json()

        return response
    } catch (err) {
        console.log(err)
    }
}

async function createPost(body) {
    const localStorage = getLocalStorage()

    try {

        const request = await fetch(`${baseUrl}posts/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.token}`,
            },

            body: JSON.stringify(body),
        })

        if (request.ok) {

            const response = await request.json()

            toast('Post criado com sucesso!', ' ')

            return response

        } else {
            return toast('Erro!', "Seu post não foi publicado")
        }

    } catch (erro){
        console.log(erro)
        return toast('Erro', 'Seu post não foi publicado.')
    }


}

async function updatePost(body, id) {
    const localStorage = getLocalStorage()

    try {

        const request = await fetch(`${baseUrl}posts/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            },
            body: JSON.stringify(body)
        });

        const response = await request.json()

        return response

    } catch (error) {
        console.log(error)
    }

}

async function deletePost(id) {
    const localStorage = getLocalStorage()

    try {
        const request = await fetch(`${baseUrl}posts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            }
        });

        if (request.ok) {
            toastRegister('Post deletado com sucesso!', 'O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed.')
            setTimeout(() => {

            }, 3000)
        }

    } catch (err) {
        toast("Erro!", "Post não deletado")
    }

}


export { login, register, getPost, getUser, createPost, updatePost, deletePost }