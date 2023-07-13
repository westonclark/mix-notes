import type { NextPage } from "next";
import { type RouterOutputs, api } from "~/utils/api";
import { useState } from "react";

import { LoadingSpinner } from "~/components/loading";
type Note = RouterOutputs["notes"]["getNotes"][number];

// Note List
const NotesList: NextPage<{ id: string }> = ({ id }) => {
  const [noteInput, setNoteInput] = useState("");
  const { data, isLoading } = api.notes.getNotes.useQuery(id);

  const ctx = api.useContext();

  const { mutate } = api.notes.createNote.useMutation({
    onSuccess: () => {
      setNoteInput("");
      void ctx.notes.getNotes.invalidate();
    },
  });

  const handleSubmit = (name: string, songId: string) => {
    mutate({ name, songId });
  };

  if (isLoading)
    return (
      <div className="pt-2">
        <LoadingSpinner />
      </div>
    );

  if (!data)
    return (
      <div className="flex justify-center pt-32">Something went wrong</div>
    );

  return (
    <div>
      {data?.map((note) => (
        <Note {...note} key={note.name} />
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(noteInput, id);
        }}
        className=" flex gap-2 pt-1"
      >
        <input
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          type="text"
          className="w-auto rounded border border-scampi-600 bg-neutral-900 px-2 text-scampi-50 outline-none focus:border-scampi-500"
        ></input>
        <button className="rounded border border-scampi-300 bg-scampi-950 px-2">
          Add
        </button>
      </form>
    </div>
  );
};

// Note
const Note: NextPage<Note> = (note: Note) => {
  const ctx = api.useContext();

  const { mutate } = api.notes.setComplete.useMutation({
    onSuccess: () => {
      void ctx.notes.getNotes.invalidate();
    },
  });

  const handleCheck = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    mutate({ id: note.id, newValue: target.checked });
  };

  return (
    <div
      className={`flex items-baseline gap-2 ${
        note.completed ? " text-scampi-300" : ""
      }`}
    >
      <input
        id={`${note.id}`}
        type="checkbox"
        defaultChecked={note.completed}
        onClick={(e) => handleCheck(e)}
      ></input>
      <label htmlFor={`${note.id}`}>{note.name}</label>
    </div>
  );
};

export default NotesList;
