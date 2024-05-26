import { useState, useEffect } from "react";
import NotesList from "./components/NotesList.js";
import { nanoid } from "nanoid";
import Search from "./components/search.js";
import Header from "./components/Header.js";

const App = () => {
  // Initialize state with notes from localStorage or default notes if none are found
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("react-notes-app-data");
    return savedNotes
      ? JSON.parse(savedNotes)
      : [
          {
            id: nanoid(),
            text: "This is my first note",
            date: "18/05/2024",
          },
          {
            id: nanoid(),
            text: "This is my second note",
            date: "20/05/2024",
          },
          {
            id: nanoid(),
            text: "This is my third note",
            date: "25/05/2024",
          },
        ];
  });

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Use useEffect to update localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
      // Use ISO date format
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter(
            (note) => note.text.toLowerCase().includes(searchText.toLowerCase()) // Fix search case-sensitivity
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
