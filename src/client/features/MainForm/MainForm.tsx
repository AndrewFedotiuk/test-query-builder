import axios from "axios";
import { Button } from "@/components/ui/button";
import { CardFieldGroup } from "@/client/components/CardFieldGroup";


export function MainForm() {
	const handleClick = async () => {
		try {
			await axios.post("/api/save-rules", {});
			alert("Submitted");
		} catch {
			alert("Error");
		}
	};

	return (
		<form className="flex flex-col gap-3 p-3 rounded-md border">
			<CardFieldGroup />

			<Button type="button" onClick={handleClick}>
				Submit
			</Button>

			<Button type="button" onClick={handleClick}>
				Cancel
			</Button>
		</form>
	)
};
