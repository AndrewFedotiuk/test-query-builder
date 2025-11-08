import { ECurrency, EFieldName, EOperation, ETransactionState, TAmountValue, TRule } from "@/client/features/MainForm/_types.ts";
import { FIELDS } from "./_CONSTANTS";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select.tsx";
import { ValueInput } from "../ValueInput";
import { Button } from "@/components/ui/button";

type TCardFieldRule = {
	rule: TRule;
	onChange: (value: TRule) => void;
	onDelete: () => void;
}

export function CardFieldRule({
	rule,
	onChange,
	onDelete
}:TCardFieldRule) {
	const currentField = FIELDS.find(field => field.value === rule.fieldName);
	const operations = currentField?.operations || [];

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

	const renderValueInput = () => {
		const { fieldName } = rule;

		const handleChange = <T,>(value: T) => {
			onChange({
				...rule,
				fieldName,
				value,
			} as TRule);
		};

		switch (fieldName) {
			case EFieldName.AMOUNT:
				return (
					<ValueInput<TAmountValue>
						fieldValue={fieldName}
						value={rule.value as TAmountValue}
						onChange={handleChange<TAmountValue>}
					/>
				);
			case EFieldName.INSTALLMENTS:
				return (
					<ValueInput<number>
						fieldValue={fieldName}
						value={rule.value as number}
						onChange={handleChange<number>}
					/>
				);
			case EFieldName.TRANSACTION_STATE:
				return (
					<ValueInput<ETransactionState>
						fieldValue={fieldName}
						value={rule.value as ETransactionState}
						onChange={handleChange<ETransactionState>}
					/>
				);
			case EFieldName.NAME:
			case EFieldName.ID:
			case EFieldName.DEVICE_IP:
				return (
					<ValueInput<string>
						fieldValue={fieldName}
						value={rule.value as string}
						onChange={handleChange<string>}
					/>
				);
			default:
				return null;
		}
	};
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
				{operations.map((operation) => (
					<NativeSelectOption key={operation} value={operation}>
						{operation}
					</NativeSelectOption>
				))}
			</NativeSelect>

			{renderValueInput()}

			<Button
				onClick={onDelete}
				variant="destructive"
				size="icon"
			>-</Button>
		</div>
	)
}
