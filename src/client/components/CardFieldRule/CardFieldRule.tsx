import { ECurrency, EFieldName, EOperation, ETransactionState, TRule } from "@/client/features/MainForm/_types.ts";
import { FIELDS } from "./_CONSTANTS";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { Button } from "@/components/ui/button";
import { GetFieldType } from "../ValueInput/_types";
import { ValueInput } from "../ValueInput";

type TCardFieldRule = {
	rule: TRule;
	onChange: (value: TRule) => void;
	onDelete: (() => void) | null;
}

export function CardFieldRule({
	rule,
	onChange,
	onDelete
}:TCardFieldRule) {
	const getInitialValue = (fieldName: EFieldName) => {
		switch (fieldName) {
			case EFieldName.AMOUNT:
				return { amount: 0, currency: ECurrency.USD };
			case EFieldName.INSTALLMENTS:
				return 0;
			case EFieldName.TRANSACTION_STATE:
				return Object.values(ETransactionState)[0];
			case EFieldName.NAME:
			case EFieldName.ID:
			case EFieldName.DEVICE_IP:
			default:
				return "";
		}
	};

	const getOperationsOptions = (fieldName: EFieldName) => {
		switch (fieldName) {
			case EFieldName.AMOUNT:
			case EFieldName.INSTALLMENTS:
				return [
					EOperation.EQUAL,
					EOperation.NOT_EQUAL,
					EOperation.GREATER_THAN,
					EOperation.LESS_THAN,
				]
			default:
				return [
					EOperation.EQUAL,
					EOperation.NOT_EQUAL,
				];
		}
	}

	return (
		<div className="flex gap-3 p-3 bg-lime-100 rounded-lg">
			<NativeSelect
				value={rule.fieldName}

				onChange={(e) => {
					const newFieldName = e.target.value as EFieldName;
					onChange({
						...rule,
						fieldName: newFieldName,
						value: getInitialValue(newFieldName),
						operation: EOperation.EQUAL
					} as TRule);
				}}
			>
				{FIELDS.map((field) => (
					<NativeSelectOption key={field.value} value={field.value}>
						{field.label}
					</NativeSelectOption>
				))}
			</NativeSelect>

			<NativeSelect
				value={rule.operation}
				onChange={(e) => onChange({
					...rule,
					operation: e.target.value as EOperation,
				})}
			>
				{getOperationsOptions(rule.fieldName).map((operation) => (
					<NativeSelectOption key={operation} value={operation}>
						{operation}
					</NativeSelectOption>
				))}
			</NativeSelect>

			<ValueInput
				fieldName={rule.fieldName}
				value={rule.value as GetFieldType<typeof rule.fieldName>}
				onChange={(value) => onChange({ ...rule, value } as TRule)}
			/>

			{onDelete && (
				<Button
					onClick={onDelete}
					variant="destructive"
					size="icon"
					aria-label="combinator-remove-rule"
				>-</Button>
			)}
		</div>
	)
}
