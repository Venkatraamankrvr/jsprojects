// FETCHING THE DATA FROM THE TWO FOLDERS
import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App {
    // THIS IS CONSTRUCTOR FUNCTION
    constructor(root) {
        // INTIALY NOTES IS TO BE EMPTY
        this.notes = [];
        // INTIALLY THERE IS NO ACTIVE STATE OF NOTES
        this.activeNote = null;
        // CREATING A NEW CONSTRUCTOR FUNCTION NOTESVIEW 
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes()
        // FETCH LIST OF ALL NOTES FROM LOCAL STORAGW
        ;

        this._setNotes(notes);
// CHECK IF THERE IS ANY NOTES IN LOCAL STORAGE OR NOT
        if (notes.length > 0) {
            // DISPLAYING THE 1ST NOTE IN ACTIVE STATE
            this._setActiveNote(notes[0]);
        }
    }

    // TO SHOW ALL NOTES IN LOCAL STORAGE
    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }


// HERE THE note IS SINGLE NOTE i.e., FIRST NOTE
    _setActiveNote(note) {
        this.activeNote = note;
        // updateActiveNote is in Noteview file
        this.view.updateActiveNote(note);
    }

    _handlers() {
        return {
            // HANDLING THE KEY VALUE TI EXECUTE IT
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                // FIND THE SELECTED NOTE ID AND MAKE THE NOTE IN ACTIVE STATE
                this._setActiveNote(selectedNote);
            },
            // FOR ADDNOTE BUTTON
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                };
// GETTING A NEW NOTE FROM USER AND SAVE IT IN LOCAL STORAGE
                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    // STORING THE ID
                    id: this.activeNote.id,
                    title,
                    body
                });

                this._refreshNotes();
            },
            
            // DOUBLE CLICK ON A NOTE TO DELETE IT
            onNoteDelete: noteId => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };
    }
}
