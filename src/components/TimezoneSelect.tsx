import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Dispatch, FC, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { useTimezones } from "../hooks/useTimezone";
import { setTimezone } from "../store/slices/noteSlice";

const TimezoneSelect: FC<{
	setIsTzLoaded: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsTzLoaded }) => {
	const { timeZones } = useTimezones();
	if (timeZones.length > 0) {
		setIsTzLoaded(true);
	}
	const dispatch = useAppDispatch();
	const { tz } = useAppSelector((state) => state.note);
	return (
		<FormControl fullWidth>
			<InputLabel>Точное время по</InputLabel>
			<Select
				value={tz}
				label="Точное время по"
				id="demo-simple-select-helper"
				onChange={(e) => dispatch(setTimezone(e.target.value))}
			>
				{timeZones.map((tz: string, idx: number) => (
					<MenuItem key={idx} value={tz}>
						{tz}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default TimezoneSelect;
