const body = document.querySelector('body')

function openModal(children) {

    const modalWrapper = document.createElement('div')
    modalWrapper.classList.add('modal-wrapper')

    const modal = document.createElement('div')
    modal.classList.add('modal')

    const buttonClose = document.createElement('button')
    buttonClose.classList.add('modal-close')

    buttonClose.innerText = 'X'

    buttonClose.addEventListener('click', () => {
        modalWrapper.remove()
    })

    modal.appendChild(buttonClose)
    modal.append(children)
    modalWrapper.appendChild(modal)
    body.appendChild(modalWrapper)

    const buttonCancel = document.querySelector('.btn-cancel')
    if(buttonCancel !== null){
        buttonCancel.addEventListener('click', () => {
            modalWrapper.remove()
        })
    }

}

export {openModal}



