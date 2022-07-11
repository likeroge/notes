import { createSlice } from "@reduxjs/toolkit";
import { INote } from "../types";

const lastNote: INote = JSON.parse(localStorage.getItem("lastNote")) ?? "";

const initialState: INote = {
	text: "",
	sign: lastNote.sign || "",
	date: lastNote.date || "",
	tz: lastNote.tz || "",
	noteId: lastNote.noteId || 0,
};

export const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {
		setText(state: INote, action) {
			state.text = action.payload;
		},
		setTimezone(state: INote, action) {
			state.tz = action.payload;
		},
		setSign(state: INote, action) {
			state.sign = action.payload;
		},
		setNoteId(state: INote, action) {
			state.noteId = action.payload;
		},
	},
});

export const { setText, setTimezone, setSign, setNoteId } = noteSlice.actions;

export default noteSlice.reducer;
