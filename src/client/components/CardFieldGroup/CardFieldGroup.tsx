import { EFieldName, EOperation } from "@/client/features/MainForm/_types";
import { CardHeader } from "../CardHeader";
import { ECombinator, TRule, TRuleGroup } from "@/client/features/MainForm/_types.ts";
import { CardFieldRule } from "../CardFieldRule/CardFieldRule";

type TCardFieldGroupProps = {
	group: TRuleGroup;
	groupChange: (group: TRuleGroup)=> void
	onDelete?: () => void
}

export function CardFieldGroup({
	group,
	groupChange,
}:TCardFieldGroupProps) {
	const updateCombinator = (combinator: ECombinator) => {
		groupChange({ ...group, combinator });
	};

	const addRule = () => {
		const newRule: TRule = {
			id: `rule-${Date.now()}-${Math.random()}`,
			fieldName: EFieldName.NAME,
			operation: EOperation.EQUAL,
			value: ""
		};
		groupChange({ ...group, rules: [...group.rules, newRule] });
	};

	const addGroup = () => {
		const newGroup: TRuleGroup = {
			id: `group-${Date.now()}-${Math.random()}`,
			combinator: ECombinator.AND,
			rules: [],
			subGroups: []
		};
		groupChange({ ...group, subGroups: [...group.subGroups, newGroup] });
	};

	const updateRule = (index: number, rule: TRule) => {
		const newRules = [...group.rules];
		newRules[index] = rule;
		groupChange({ ...group, rules: newRules });
	};

	const deleteRule = (index: number) => {
		groupChange({ ...group, rules: group.rules.filter((_, i) => i !== index) });
	};

	const updateSubGroup = (index: number, subGroup: TRuleGroup) => {
		const newSubGroups = [...group.subGroups];
		newSubGroups[index] = subGroup;
		groupChange({ ...group, subGroups: newSubGroups });
	};

	const deleteSubGroup = (index: number) => {
		groupChange({ ...group, subGroups: group.subGroups.filter((_, i) => i !== index) });
	};


	return (
		<div className="grid gap-3 p-3 rounded-md border">
			<CardHeader
				combinator={group.combinator}
				onCombinatorChange={updateCombinator}
				onAddRuleClick={addRule}
				onAddGroupClick={addGroup}
			/>
			
			{
				group.rules.map((rule, idx) => (
					<CardFieldRule
						key={rule.id}
						rule={rule}
						onChange={(newRule) => updateRule(idx, newRule)}
						onDelete={group.rules.length === 1
							? null
							: () => deleteRule(idx)}
					/>
				))
			}

			{
				group.subGroups.map((subGroup, idx) => (
					<CardFieldGroup
						key={subGroup.id}
						group={subGroup}
						groupChange={(groupd: TRuleGroup) => updateSubGroup(idx, groupd)}
						onDelete={() => deleteSubGroup(idx)}
					/>
				))}
		</div>
	)
};
