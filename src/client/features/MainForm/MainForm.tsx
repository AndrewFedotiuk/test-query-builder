import axios from "axios";
import { Button } from "@/components/ui/button";
import { CardFieldGroup } from "@/client/components/CardFieldGroup";
import {ECombinator, TRuleGroup} from "@/client/features/MainForm/_types.ts";
import {useState} from "react";


export function MainForm() {
	const [rootGroup, setRootGroup] = useState<TRuleGroup>({
		id: "root",
		combinator: ECombinator.AND,
		rules: [],
		subGroups: []
	});

	const handleGroupChange = (group:TRuleGroup)=>{
		setRootGroup(group);
	}

	const handleClick = async () => {
		try {
			await axios.post("/api/save-rules", {});
			alert("Submitted");
		} catch {
			alert("Error");
		}
	};

	return (
		<form className="flex w-full flex-col gap-3 px-3 py-6 rounded-md border">
			<CardFieldGroup group={rootGroup} groupChange ={handleGroupChange} />

			<hr className="my-3" />

			<div className="flex justify-center gap-2">
				<Button type="button" variant="positive" onClick={handleClick}>
					Submit
				</Button>

				<Button type="button" variant="outline" onClick={handleClick}>
					Cancel
				</Button>
			</div>
		</form>
	)
}
