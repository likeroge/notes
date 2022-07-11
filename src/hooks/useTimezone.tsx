import axios from "axios";
import { useEffect, useState } from "react";

export const useTimezones = () => {
	const [timeZones, setTimeZones] = useState<string[]>([]);
	useEffect(() => {
		async function fetchTimzones() {
			const { data } = await axios.get<string[]>(
				"https://worldtimeapi.org/api/timezone"
			);
			setTimeZones(data);
		}
		fetchTimzones();
	}, []);
	return { timeZones };
};
