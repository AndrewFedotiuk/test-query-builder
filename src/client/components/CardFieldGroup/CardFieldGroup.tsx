import { EFieldName, EOperation } from "./_type";
import { CardHeader } from "../CardHeader";
import {ECombinator, TRule, TRuleGroup} from "@/client/features/MainForm/_types.ts";

const fieldOptions = [
	{
		value: EFieldName.AMOUNT,
		label: "Amount",
	},
	{
		value: EFieldName.NAME,
		label: "Name",
	},
	{
		value: EFieldName.ID,
		label: "Id",
	},
	{
		value: EFieldName.TRANSACTION_STATE,
		label: "Transaction State",
	},
	{
		value: EFieldName.DEVICE_IP,
		label: "Device IP",
	},
	{
		value: EFieldName.INSTALLMENTS,
		label: "Installments",
	},
];

const operationOptions = [
	{
		value: EOperation.EQUAL,
		label: "is",
	},
	{
		value: EOperation.NOT_EQUAL,
		label: "is not",
	}
];

type TCardFieldGroupProps = {
	group: TRuleGroup;
	groupChange: (group: TRuleGroup)=> void
}

export function CardFieldGroup({
	group,
	groupChange
}:TCardFieldGroupProps) {
	const updateCombinator = (combinator: ECombinator) => {
		groupChange({ ...group, combinator });
	};

	const addRule = () => {
		const newRule: TRule = {
			id: `rule-${Date.now()}-${Math.random()}`,
			fieldName: "",
			operation: EOperation.EQUAL,
			value: ""
		};
		groupChange({...group, rules: [...group.rules, newRule]});
	};

	const addGroup = () => {
		const newGroup: TRuleGroup = {
			id: `group-${Date.now()}-${Math.random()}`,
			combinator: ECombinator.AND,
			rules: [],
			subGroups: []
		};
		groupChange({...group, subGroups: [...group.subGroups, newGroup]});
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

			{/*{*/}
			{/*	group.rules.map((rule, idx) => (*/}
			{/*		<RuleComponent*/}
			{/*			key={rule.id}*/}
			{/*			rule={rule}*/}
			{/*			onChange={(r) => updateRule(idx, r)}*/}
			{/*			onDelete={() => deleteRule(idx)}*/}
			{/*			error={errors[rule.id]}*/}
			{/*		/>*/}
			{/*	))}*/}

			{
				group.subGroups.map((subGroup, idx) => (
					<CardFieldGroup
						key={subGroup.id}
						group={subGroup}
						groupChange={(groupd: TRuleGroup) => updateSubGroup(idx, groupd)}
					/>
				))}
		</div>
	)
};
