const form = document.getElementById('form')
const formWrapper = document.getElementById('noteFormWrapper')
const submitBtn = document.getElementById('submitBtn')
const addNoteBtn = document.getElementById('addNote')
let savedNotes = JSON.parse(localStorage.getItem('Notes')) || []
const noteBoard = document.getElementById('noteBoard')

let isVisible=false


submitBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    const formData = new FormData(form)

    const noteTitle = formData.get('Title')
    const noteText = formData.get('Note')

    if(!noteTitle || !noteText){
        window.alert("Complete the note")
    }

    const noteObject = {
        noteTitle : noteTitle,
        noteText : noteText
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

        note.classList= 'note'
        const title = document.createElement('h1')
        const content = document.createElement('h4')


        title.textContent = savedNotes[i].noteTitle
        content.textContent = savedNotes[i].noteText

        note.appendChild(title)
        note.appendChild(content)
        noteBoard.appendChild(note)
}
}

function createNote(noteObject){
        const newNote = document.createElement('div')
        newNote.classList = 'note'
        const title = document.createElement('h1')
        const content = document.createElement('h4')
        title.textContent = noteObject.noteTitle
        content.textContent = noteObject.noteText
        newNote.appendChild(title)
        newNote.appendChild(content)
        noteBoard.appendChild(newNote)
        localStorage.setItem('Notes', JSON.stringify(savedNotes))
}


displayNotes()

