import axios from "axios";
import { Button } from "@/components/ui/button";
import { CardFieldGroup } from "@/client/components/CardFieldGroup";
import { ECombinator, EFieldName, EOperation, TRuleGroup, TSchema } from "@/client/features/MainForm/_types.ts";
import { useState } from "react";
import { SchemaConverterManager } from "@/client/managers/SchemaManager";
import { JSONOutput } from "@/client/components/JsonOutput/JsonOutput";

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

	const [schema, setSchema] = useState<TSchema>()
		

	const handleGroupChange = (group:TRuleGroup)=>{
		setRootGroup(group);
	}

	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const schema = SchemaConverterManager.groupToSchema(rootGroup);
			await axios.post("/api/save-rules", schema);

			setSchema(schema);
		} catch {
			alert("Error");
		}
	};

	return (
		<form
			className="flex w-full flex-col gap-3 px-3 py-6 rounded-md border group"
			onSubmit={handleSubmit}
		>
			<CardFieldGroup group={rootGroup} groupChange ={handleGroupChange} />

			<hr className="my-3" />

			<div className="flex justify-center gap-2">
				<Button className="group-invalid:opacity-50" type="submit" variant="positive">
					Submit
				</Button>
			</div>

			<hr className="my-3" />

			{
				schema
					? <JSONOutput data={schema} />
					: null
			}
		</form>
	)
}
