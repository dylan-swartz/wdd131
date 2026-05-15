const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(evt) {
    // check if click img
    // no -> return
    // yes -> open full img
        // get the src of full img
        // display it
    
    // if (tagName != "IMG") {
    //     return
    // }

    if (evt.target.tagName != "IMG"){
        return
    }

    const fullsrc = evt.target.src.replace("-sm", "-full");
    console.log(fullsrc);

    modalImage.src = fullsrc;
    modal.showModal();
}

// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
    modalImage.src = "";
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
        modalImage.src = "";    
    }
});
          