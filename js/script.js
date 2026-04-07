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
        noteID : Date.now(),
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

    isVisible = false
    formWrapper.style.display = 'none'

    
})


addNoteBtn.addEventListener('click',()=>{
    isVisible = !isVisible
    formWrapper.style.display = isVisible ? 'block' : 'none';
})



function buildNoteElement(noteObject){
    const note = document.createElement('div')
    note.classList= 'note'
    const deleteBtn = document.createElement('button')
    const deleteIcon = document.createElement('i')
    deleteIcon.classList = 'fa-solid fa-trash'
    deleteBtn.classList = 'delete-btn'
        
    deleteBtn.addEventListener('click', (e)=>{
        const index = savedNotes.findIndex(n=> n.noteID === noteObject.noteID)
        note.remove()
        savedNotes.splice(index,1)
        localStorage.setItem('Notes', JSON.stringify(savedNotes))
    })

        note.style.backgroundColor = noteObject.noteColor
        const title = document.createElement('h1')
        const content = document.createElement('p')
        title.textContent = noteObject.noteTitle
        content.textContent = noteObject.noteText

        title.style.color= noteObject.titleColor
        content.style.color = noteObject.contentColor


        note.appendChild(deleteBtn)
        note.appendChild(title)
        note.appendChild(content)
        deleteBtn.appendChild(deleteIcon)
        return note

}

function displayNotes(){
    savedNotes.forEach(note=> noteBoard.appendChild(buildNoteElement(note)))
}

function createNote(noteObject){
    savedNotes.push(noteObject)
    localStorage.setItem('Notes',JSON.stringify(savedNotes))
    noteBoard.appendChild(buildNoteElement(noteObject))
}

displayNotes()