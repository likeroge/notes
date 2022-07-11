import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
	Alert,
	Button,
	Collapse,
	Grid,
	IconButton,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { setSign, setText } from "../store/slices/noteSlice";
import { INote } from "../store/types";
import TimezoneSelect from "./TimezoneSelect";

const NoteForm = () => {
	const dispatch = useAppDispatch();
	const note = useAppSelector((state) => state.note);
	const [openAlert, setOpenAlert] = useState(true);
	const [success, setSuccess] = useState(false);
	const [isTzLoaded, setIsTzLoaded] = useState(false);
	const [fetchDateError, setFetchDateError] = useState(undefined);
	const [valid, setValid] = useState(true);
	const [sending, setSending] = useState(false);

	const addNote = async (tz: string) => {
		setOpenAlert(true);
		setSuccess(false);
		setValid(true);
		if (note.text === "" || note.sign === "" || note.tz === "") {
			setValid(false);
			return;
		}
		try {
			setSending(true);
			const actualTime = (
				await axios.get(`https://worldtimeapi.org/api/timezone/${tz}`)
			).data;
			const notes: INote[] = JSON.parse(localStorage.getItem("notes")) ?? [];
			const newNoteId = notes.length + 1;
			const newNote = {
				...note,
				noteId: newNoteId,
				date: actualTime.datetime,
			};
			notes.push(newNote);
			localStorage.setItem("lastNote", JSON.stringify(newNote));
			localStorage.setItem("notes", JSON.stringify(notes));
			setSending(false);
			dispatch(setText(""));
			setSuccess(true);
		} catch (error) {
			setFetchDateError(error.message);
			setSending(false);
		}
	};

	return (
		<>
			{fetchDateError && (
				<Collapse in={openAlert}>
					<Alert
						action={
							<IconButton
								color="inherit"
								size="small"
								onClick={() => {
									setOpenAlert(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						severity="error"
					>
						Произошла ошибка при загрузке даты
					</Alert>
				</Collapse>
			)}
			{!valid && (
				<Collapse in={openAlert}>
					<Alert
						action={
							<IconButton
								color="inherit"
								size="small"
								onClick={() => {
									setOpenAlert(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						severity="info"
					>
						Заполните все поля формы
					</Alert>
				</Collapse>
			)}
			{success && (
				<Collapse in={openAlert}>
					<Alert
						action={
							<IconButton
								color="inherit"
								size="small"
								onClick={() => {
									setOpenAlert(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						severity="success"
					>
						Запись добавлена
					</Alert>
				</Collapse>
			)}
			<Grid container spacing={2} mb={2}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Запись"
						value={note.text}
						multiline
						rows={6}
						onChange={(e) => dispatch(setText(e.target.value))}
					/>
				</Grid>
				<Grid item xs={6} sm={8}>
					<TextField
						fullWidth
						label="Подпись *"
						defaultValue={note.sign}
						error={note.sign.length > 100}
						onChange={(e) => dispatch(setSign(e.target.value))}
					/>
				</Grid>
				<Grid item xs={6} sm={4}>
					<TimezoneSelect setIsTzLoaded={setIsTzLoaded} />
				</Grid>
			</Grid>
			<Box display={"flex"} justifyContent={"flex-end"}>
				<Button
					variant="contained"
					disabled={sending || !isTzLoaded}
					endIcon={<SendIcon />}
					onClick={() => addNote(note.tz)}
				>
					СОЗДАТЬ
				</Button>
			</Box>
		</>
	);
};

export default NoteForm;
