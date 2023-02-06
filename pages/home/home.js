import {getLocalStorage} from '../../scripts/localStorage.js'
import { getPost } from '../../scripts/requests.js'
import { getUser } from '../../scripts/requests.js'
import { renderPosts, renderProfile } from '../../scripts/render.js'
import {openModal} from '../../scripts/modal.js'
import { createNewPost} from '../../scripts/form.js'

const verifyPermission = () => {
    const user = getLocalStorage()
    
    if(user == ''){
        window.location.replace('../login/index.html')
    }
}

const menuDropDow = async () =>{

    const nameProfile = await getUser()

    const nameUser = document.querySelector('.name-user-profile')
    nameUser.innerText = `@${nameProfile.username}`
}

const eventNewPost = ()=> {
    const btnCreate = document.getElementById('create-new-modal')
    
    btnCreate.addEventListener('click', async () => {
        const formCreate = createNewPost()
        openModal(formCreate)
    });
};

const eventLogOut = () =>{
    const logout = document.querySelector('.box-out-account')
    
    logout.addEventListener('click', () => {
        let out = ''
        localStorage.setItem('user',JSON.stringify(out))
        verifyPermission()
    })
}

eventLogOut()
menuDropDow()
eventNewPost();
verifyPermission()
renderPosts(getUser(),getPost())
renderProfile(getUser())