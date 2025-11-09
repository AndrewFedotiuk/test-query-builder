import { TRuleGroup, TSchema } from "../features/MainForm/_types";


export class SchemaConverterManager {
	static groupToSchema(group: TRuleGroup): TSchema {
		const conditions = group.rules.map(rule => (
			{
				fieldName: rule.fieldName,
				operation: rule.operation,
				value: rule.value
			}
		));

		const subConditions = group.subGroups.map(subGroup => this.groupToSchema(subGroup));

		return {
			combinator: group.combinator,
			...(conditions.length > 0 && { conditions }),
			...(subConditions.length > 0 && { subConditions })
		};
	}
}
