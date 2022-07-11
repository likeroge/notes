import { Box, Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

const App = () => {
	const navigate = useNavigate();
	const [path, setPath] = React.useState("");
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setPath(newValue);
		navigate(newValue);
	};

	return (
		<Box>
			<Tabs value={path} onChange={handleChange}>
				<Tab label="Создать запись" value={""} />
				<Tab label="Записи" value={"notes"} />
			</Tabs>
			<Divider sx={{ mb: 4 }} />
			<Routes>
				<Route index element={<NoteForm />} />
				<Route path="notes" element={<NotesList />} />
			</Routes>
		</Box>
	);
};

export default App;
