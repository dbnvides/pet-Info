import { openModal } from "./modal.js";
import { getPost, getUser } from "./requests.js";
import { formViewer, formEdit, formDelete } from "./form.js";


async function renderPosts(user, list) {

    const ulList = document.querySelector('.list-posts')

    ulList.innerHTML = ''
    const posts = await list
    const userProfile = await user

    posts.forEach(element => {

        let li = document.createElement('li')

        let headerList = document.createElement('header')
        headerList.classList.add('header-list-post')

        let divPostHeader = document.createElement('div')
        divPostHeader.classList.add('post-header')

        let imgProfile = document.createElement('img')
        imgProfile.classList.add('img-profile')
        imgProfile.src = element.user.avatar
        imgProfile.alt = 'Profile image'

        let nameProfile = document.createElement('h3')
        nameProfile.innerText = element.user.username

        let datePost = document.createElement('span')
        datePost = `${new Date(element.createdAt).toLocaleDateString('default', { month: 'long' })} ${new Date(element.createdAt).getFullYear()} `

        let divBoxButtons = document.createElement('div')
        divBoxButtons.classList.add('box-buttons')

        let btnEdit = document.createElement('button')
        btnEdit.classList = 'btn-open-modal-edit btn-open-modal-not-user btn-modal-on btn-modal'
        btnEdit.innerText = 'Editar'


        let btnDelete = document.createElement('button')
        btnDelete.classList = 'btn-open-modal-not-user btn-modal'
        btnDelete.innerText = 'Excluir'

        if (userProfile.id == element.user.id) {

            btnDelete.classList.remove('btn-open-modal-not-user')
            btnEdit.classList.remove('btn-open-modal-not-user')


            btnDelete.addEventListener('click', () => {
                openModal(formDelete(id))
            })


            btnEdit.addEventListener('click', () => {
                renderEditModal(element)
            })

        }

        let mainPost = document.createElement('main')
        mainPost.classList.add('content-post')

        let titlePost = document.createElement('h2')
        titlePost.innerText = element.title

        let descPost = document.createElement('p')
        descPost.innerText = element.content


        let openModalPost = document.createElement('a')
        openModalPost.classList.add('btn-open-modal-post')
        openModalPost.innerText = 'Acessar publicação'

        let id = element.id

        openModalPost.addEventListener('click', () => {
            renderViwerModal(element.id, element.user, element)
        })

        divPostHeader.append(imgProfile, nameProfile, datePost)
        divBoxButtons.append(btnEdit, btnDelete)
        headerList.append(divPostHeader, divBoxButtons)
        mainPost.append(titlePost, descPost, openModalPost)
        li.append(headerList, mainPost)

        ulList.appendChild(li)
    });

}

async function renderProfile(user) {
    const img = document.querySelector('.img-profile')
    let userProfile = await user

    img.src = userProfile.avatar
}

async function renderViwerModal(id, user, element) {

    let viewerPost = await getPost()

    viewerPost.forEach((el) => {
        if (el.id == id) {
            openModal(formViewer(user, element))
        }
    })

}

async function renderEditModal(element) {
    let editPost = await getPost()

    editPost.forEach((el) => {
        if (el.id == element.id) {
            openModal(formEdit(element))
        }
    })

}


export { renderPosts, renderProfile }
