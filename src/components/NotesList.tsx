import { Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { INote } from "../store/types";
import NoteItem from "./NoteItem";

const NotesList = () => {
	const notesPerPage = 6;
	const [page, setPage] = useState(1);
	const [notes, setNotes] = useState([]);
	const [onePageNotes, setOnePageNotes] = useState([]);

	useEffect(() => {
		const notesList: INote[] = JSON.parse(localStorage.getItem("notes")) ?? [];
		setNotes(notesList);
	}, []);

	useMemo(() => {
		const lastNoteIndex = page * notesPerPage;
		const firstNoteIndex = lastNoteIndex - notesPerPage;
		const currentPages = notes.slice(firstNoteIndex, lastNoteIndex);
		setOnePageNotes(currentPages);
	}, [page, notes]);

	return (
		<>
			<Grid container spacing={2} mb={2}>
				{onePageNotes.map((note, idx) => (
					<Grid item xs={12} sm={6} key={idx}>
						<NoteItem note={note} number={note.noteId} />
					</Grid>
				))}
			</Grid>
			{onePageNotes.length > 0 ? (
				<Pagination
					onChange={(e, value) => setPage(value)}
					size="large"
					count={Math.ceil(notes.length / notesPerPage)}
					variant="outlined"
				/>
			) : (
				<Typography variant="h6">Нет записей...</Typography>
			)}
		</>
	);
};

export default NotesList;
