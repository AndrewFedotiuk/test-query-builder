import {
	NativeSelect,
	NativeSelectOption,
} from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { EQueryType } from "./_types";

const combinatorOptions = [
	{
		value: EQueryType.AND,
		label: "And",
	},
	{
		value: EQueryType.OR,
		label: "Or",
	},
];

export function CardHeader() {
	return (
		<header className="flex gap-3">
			<NativeSelect>
				{combinatorOptions.map((option) => (
					<NativeSelectOption key={option.value} value={option.value}>
						{option.label}
					</NativeSelectOption>
				))}
			</NativeSelect>

			<Button type="button" className="flex-1">+ Add Rule</Button>
			<Button type="button" className="flex-1">+ Add Group</Button>
		</header>
	)
};
