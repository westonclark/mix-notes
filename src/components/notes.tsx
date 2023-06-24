import { NextPage } from "next";
import { RouterOutputs, api } from "~/utils/api";
import { LoadingSpinner } from "~/components/loading";
import { useState } from "react";

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

  if (isLoading) return <LoadingSpinner />;

  if (!data)
    return (
      <div className="flex justify-center pt-40">Something went wrong</div>
    );

  if (!data.length)
    return <div className="flex justify-center">No Notes to Display</div>;

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
          className="rounded border border-scampi-600 bg-neutral-900 text-scampi-50 outline-none focus:border-scampi-500"
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
