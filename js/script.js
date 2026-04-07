const form = document.getElementById('form')
const formWrapper = document.getElementById('noteFormWrapper')
const submitBtn = document.getElementById('submitBtn')
const addNoteBtn = document.getElementById('addNote')
let savedNotes = JSON.parse(localStorage.getItem('Notes')) || []
const noteBoard = document.getElementById('noteBoard')

let isVisible=false


formWrapper.style.display = 'none'


submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    const formData = new FormData(form)

    const noteTitle = formData.get('Title')
    const noteText = formData.get('Note')
    const titleColor = formData.get('Title-color')
    const contentColor = formData.get('Content-color')
    const noteColor = formData.get('Note-color')

    if(!noteTitle || !noteText || !noteColor){
        window.alert("Complete the note")
        return
    }

    const noteObject = {
        noteTitle : noteTitle,
        noteText : noteText,
        noteColor: noteColor,
        titleColor:titleColor,
        contentColor:contentColor
    }


    //Reset the form
    form.reset()
    createNote(noteObject)
    

    //save the data in localStorage
    savedNotes.push(noteObject)
    localStorage.setItem('Notes', JSON.stringify(savedNotes))

    formWrapper.style.display = 'none'

    
})


addNoteBtn.addEventListener('click',()=>{
    isVisible = !isVisible
    formWrapper.style.display = isVisible ? 'block' : 'none';
})



function displayNotes(){
    for(let i=0; i<savedNotes.length; i++){
        const note = document.createElement('div')
        const deleteBtn = document.createElement('button')
        const deleteIcon = document.createElement('i')
        deleteIcon.classList = 'fa-solid fa-trash'
        deleteBtn.classList = 'delete-btn'
        
        deleteBtn.addEventListener('click', (e)=>{
            const index = savedNotes.findIndex(n=> n.noteTitle === savedNotes[i].noteTitle && n.noteText === savedNotes[i].noteText)
            savedNotes.splice(index,1)
            localStorage.setItem('Notes', JSON.stringify(savedNotes))
        })

        note.classList= 'note'
        note.style.backgroundColor = savedNotes[i].noteColor
        const title = document.createElement('h1')
        const content = document.createElement('p')
        title.textContent = savedNotes[i].noteTitle
        content.textContent = savedNotes[i].noteText

        title.style.color=savedNotes[i].titleColor
        content.style.color = savedNotes[i].contentColor


        note.appendChild(deleteBtn)
        note.appendChild(title)
        note.appendChild(content)
        deleteBtn.appendChild(deleteIcon)
        noteBoard.appendChild(note)
}
}

function createNote(noteObject){
        const newNote = document.createElement('div')
        newNote.classList = 'note'
        const title = document.createElement('h1')
        const content = document.createElement('p')

        newNote.style.backgroundColor = noteObject.noteColor
        title.textContent = noteObject.noteTitle
        content.textContent = noteObject.noteText

        title.style.color = noteObject.titleColor
        content.style.color = noteObject.contentColor

        const deleteBtn = document.createElement('button')
        const deleteIcon = document.createElement('i')
        deleteIcon.classList = 'fa-solid fa-trash'
        deleteBtn.classList = 'delete-btn'
        deleteBtn.addEventListener('click', (e)=>{
            e.target.closest('.note').remove()

            //Find the current clicked note's index
            const i = savedNotes.findIndex(note => note.noteTitle === noteObject.noteTitle && note.noteText === noteObject.noteText)
            savedNotes.splice(i,1)
            localStorage.setItem('Notes', JSON.stringify(savedNotes))
        })
        deleteBtn.appendChild(deleteIcon)

        newNote.appendChild(deleteBtn)

        newNote.appendChild(title)
        newNote.appendChild(content)
        noteBoard.appendChild(newNote)
        localStorage.setItem('Notes', JSON.stringify(savedNotes))
}


displayNotes()

