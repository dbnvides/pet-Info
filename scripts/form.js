import { openModal } from "./modal.js"
import { renderPosts } from "./render.js"
import { createPost, getUser, getPost, updatePost, deletePost } from "./requests.js"

function createNewPost() {
    let form = document.createElement('form')

    let header = document.createElement('header')
    header.classList.add('header-list-post')

    let titleForm = document.createElement('h2')
    titleForm.classList.add('title2')
    titleForm.innerText = 'Criando um novo post'

    let boxForm1 = document.createElement('div')
    boxForm1.classList.add('box-form')

    let titleContent = document.createElement('label')
    titleContent.setAttribute('for', 'title')
    titleContent.innerText = 'Titulo do post'

    let inputTitle = document.createElement('input')
    inputTitle.classList.add('input-default')
    inputTitle.id = 'title-post'
    inputTitle.setAttribute('name', 'title')
    inputTitle.setAttribute('placeholder', 'Digite o titulo aqui...')

    let boxForm2 = document.createElement('div')
    boxForm2.classList.add('box-form')

    let descPost = document.createElement('label')
    descPost.setAttribute('for', 'content')
    descPost.innerText = 'Conteúdo do post'

    let inputDesc = document.createElement('textarea')
    inputDesc.classList.add('input-default')
    inputDesc.id = 'content-post'
    inputDesc.setAttribute('name', 'content')
    inputDesc.setAttribute('placeholder', 'Desenvolva o conteúdo do post aqui...')

    let boxButtons = document.createElement('div')
    boxButtons.classList.add('box-modal-buttons')

    let buttonCancel = document.createElement('button')
    buttonCancel.classList = 'btn-default btn-post-default btn-cancel'
    buttonCancel.innerText = 'Cancelar'

    let buttonPublic = document.createElement('button')
    buttonPublic.classList = 'btn-default btn-post-default btn-post-public'
    buttonPublic.innerText = 'Publicar'
    buttonPublic.setAttribute('type', 'submit')

    buttonPublic.addEventListener('click', async () => {
        formPublic(form)
    })

    header.appendChild(titleForm)
    boxForm1.append(titleContent, inputTitle)
    boxForm2.append(descPost, inputDesc)
    boxButtons.append(buttonCancel, buttonPublic)
    form.append(header, boxForm1, boxForm2, boxButtons)

    return form
}

function formPublic(form) {

    form.addEventListener('submit', async (event) => {
        event.preventDefault()


        const inputs = [...event.target]

        const newPost = {}

        inputs.forEach(({ name, value }) => {
            if (name && value !== '') {
                newPost[name] = value
            }
        })

        await createPost(newPost)
        await renderPosts(getUser(), getPost())
    })

    return form
}

function formViewer(user, element) {

    let form = document.createElement('form')

    let header = document.createElement('header')
    header.classList.add('header-list-post')

    let divPostHeader = document.createElement('div')
    divPostHeader.classList.add('post-header')

    let imgProfile = document.createElement('img')
    imgProfile.classList.add('img-profile')
    imgProfile.alt = 'Profile image'
    imgProfile.src = user.avatar

    let nameUser = document.createElement('h3')
    nameUser.innerText = user.username

    let datePost = document.createElement('span')
    datePost = ` ${new Date(element.createdAt).toLocaleDateString('default', { month: 'long' })} ${new Date(element.createdAt).getFullYear()} `

    let mainContentPost = document.createElement('main')
    mainContentPost.classList = 'content-post modal-content'

    let titlePost = document.createElement('h2')
    titlePost.innerText = element.title

    let descPost = document.createElement('p')
    descPost.innerText = element.content

    divPostHeader.append(imgProfile, nameUser, datePost)
    header.appendChild(divPostHeader)
    mainContentPost.append(titlePost, descPost)
    form.append(header, mainContentPost)

    return form

}


function formEdit({ title, content, id }) {
    let form = document.createElement('form')

    let header = document.createElement('header')
    header.classList.add('header-list-post')

    let titleForm = document.createElement('h2')
    titleForm.classList.add('title2')
    titleForm.innerText = 'Editar post'

    let boxForm1 = document.createElement('div')
    boxForm1.classList.add('box-form')

    let titleContent = document.createElement('label')
    titleContent.setAttribute('for', 'title')
    titleContent.innerText = 'Titulo do post'

    let inputTitle = document.createElement('input')
    inputTitle.classList.add('input-default')
    inputTitle.id = 'title-post'
    inputTitle.setAttribute('name', 'title')
    inputTitle.value = title

    let boxForm2 = document.createElement('div')
    boxForm2.classList.add('box-form')

    let descPost = document.createElement('label')
    descPost.setAttribute('for', 'content')
    descPost.innerText = 'Conteúdo do post'

    let inputDesc = document.createElement('input')
    inputDesc.classList.add('input-default')
    inputDesc.id = 'content-post'
    inputDesc.setAttribute('name', 'content')
    inputDesc.value = content

    let boxButtons = document.createElement('div')
    boxButtons.classList.add('box-modal-buttons')

    let buttonCancel = document.createElement('button')
    buttonCancel.classList = 'btn-default btn-post-default btn-cancel'
    buttonCancel.innerText = 'Cancelar'

    let buttonEdit = document.createElement('button')
    buttonEdit.classList = 'btn-default btn-post-default btn-post-public'
    buttonEdit.innerText = 'Salvar alterações'
    buttonEdit.setAttribute('type', 'submit')

    buttonEdit.addEventListener('click', async () => {
        eventUpdate(form, id)
    })

    header.appendChild(titleForm)
    boxForm1.append(titleContent, inputTitle)
    boxForm2.append(descPost, inputDesc)
    boxButtons.append(buttonCancel, buttonEdit)
    form.append(header, boxForm1, boxForm2, boxButtons)

    return form
}

function eventUpdate(form, idPost) {

    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const inputs = [...event.target]

        const editPost = {}

        inputs.forEach(({ name, value }) => {
            if (name && value !== '') {
                editPost[name] = value
            }
        })

        await updatePost(editPost, idPost)
        await renderPosts(getUser(), getPost())
    })

    return form
}

function formDelete(id) {
    let form = document.createElement('form')

    let header = document.createElement('header')
    header.classList.add('header-list-post')

    let titleForm = document.createElement('h2')
    titleForm.classList.add('title2')
    titleForm.innerText = 'Confirmação de exclusão'

    let contentForm = document.createElement('div')
    contentForm.classList.add('box-content')

    let textConf = document.createElement('h2')
    textConf.classList.add('title2')
    textConf.innerText = 'Tem certeza que deseja excluir este post?'

    let textAlert = document.createElement('p')
    textAlert.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir'

    let buttonCancel = document.createElement('button')
    buttonCancel.classList = 'btn-default btn-post-default btn-cancel'
    buttonCancel.innerText = 'Cancelar'

    let buttonDelete = document.createElement('button')
    buttonDelete.classList = 'btn-default btn-post-default btn-post-delete'
    buttonDelete.innerText = 'Sim, excluir este post'
    buttonDelete.setAttribute('type', 'submit')

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        await deletePost(id)
        renderPosts(getUser(),getPost())
    })

    header.appendChild(titleForm)
    contentForm.append(textConf, textAlert)
    form.append(header, contentForm, buttonCancel, buttonDelete)

    return form
}

export { createNewPost, formViewer, formEdit, formDelete }


