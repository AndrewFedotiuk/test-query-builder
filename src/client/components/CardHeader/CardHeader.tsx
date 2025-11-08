import {
	NativeSelect,
	NativeSelectOption,
} from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { ECombinator } from "@/client/features/MainForm/_types.ts";

const combinatorOptions = [
	{
		value: ECombinator.AND,
		label: "And",
	},
	{
		value: ECombinator.OR,
		label: "Or",
	},
];

type TCardHeaderProps = {
	combinator: ECombinator;
	onCombinatorChange: (combinator: ECombinator) => void;
	onAddGroupClick: ()=> void;
	onAddRuleClick: ()=> void;
	onDeleteClick?: () => void;
}

export function CardHeader({
	combinator,
	onCombinatorChange,

	onAddRuleClick,
	onAddGroupClick,
	onDeleteClick
}: TCardHeaderProps) {
	return (
		<header className="flex gap-3 justify-between flex-wrap">
			<NativeSelect
				value={combinator}
				onChange={(e) => onCombinatorChange(e.target.value as ECombinator)}
			>
				{combinatorOptions.map((option) => (
					<NativeSelectOption key={option.value} value={option.value}>
						{option.label}
					</NativeSelectOption>
				))}
			</NativeSelect>

			<div className="flex gap-3">
				<Button type="button" variant="ghost" onClick={onAddRuleClick}>+ Add Rule</Button>
				<Button type="button" variant="ghost" onClick={onAddGroupClick}>+ Add Group</Button>
				{
					onDeleteClick
						? (
							<Button onClick={onDeleteClick} type="button" variant="destructive" size="icon">-</Button>)
						: null
				}
			</div>
		</header>
	)
};
