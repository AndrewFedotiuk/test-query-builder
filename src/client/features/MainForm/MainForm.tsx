// import axios from "axios";
import { Button } from "@/components/ui/button";
import { CardFieldGroup } from "@/client/components/CardFieldGroup";
import { ECombinator, EFieldName, EOperation, TRuleGroup } from "@/client/features/MainForm/_types.ts";
import { useState } from "react";

export function MainForm() {
	const [rootGroup, setRootGroup] = useState<TRuleGroup>({
		id: "root",
		combinator: ECombinator.AND,
		rules: [
			{
				id: "rule-1",
				fieldName: EFieldName.NAME,
				operation: EOperation.EQUAL,
				value: ""
			}
		],
		subGroups: []
	});

	const handleGroupChange = (group:TRuleGroup)=>{
		setRootGroup(group);
	}

	const handleClick = async () => {

		try {
			// await axios.post("/api/save-rules", {});
			alert("Submitted");
		} catch {
			alert("Error");
		}
	};

	return (
		<form
			className="flex w-full flex-col gap-3 px-3 py-6 rounded-md border group"
			onSubmit={handleClick}
		>
			<CardFieldGroup group={rootGroup} groupChange ={handleGroupChange} />

			<hr className="my-3" />

			<div className="flex justify-center gap-2">
				<Button className="group-invalid:opacity-50" type="submit" variant="positive">
					Submit
				</Button>

				<Button
					className="group-invalid:opacity-50"
					type="button"
					variant="outline"
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
