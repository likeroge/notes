import { Card, CardContent, Typography } from "@mui/material";
import React, { FC } from "react";
import { INote } from "../store/types";

const NoteItem: FC<{ note: INote; number: number }> = ({ note, number }) => {
	return (
		<Card sx={{ minHeight: "250px" }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{note.sign}
				</Typography>
				<Typography variant="h5" component="div">
					Запись №{number}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					{note.date}
				</Typography>
				<Typography variant="body2">{note.text}</Typography>
			</CardContent>
		</Card>
	);
};

export default NoteItem;
