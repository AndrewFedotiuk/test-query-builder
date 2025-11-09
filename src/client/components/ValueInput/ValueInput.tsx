import { EFieldName } from "@/client/features/MainForm/_types";
import { Input } from "@/components/ui/input";
import { ETransactionState, TAmountValue } from "@/client/features/MainForm/_types";
import { ECurrency } from "@/client/features/MainForm/_types";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { GetFieldType } from "./_types";

type TValueInput<T> = {
	fieldValue: EFieldName;
	value: T;
	onChange: (value: T) => void;
}

function ValueInputField<T>({ 
	fieldValue,
	value,
	onChange
}:TValueInput<T>) {
	switch (fieldValue) {
		case EFieldName.AMOUNT: {
			const amountVal = value as TAmountValue || { amount: 0, currency: ECurrency.USD };

			return (
				<div className="flex gap-2">
					<Input
						value={amountVal.amount}
						type="number"
						max={1_000_000}
						min={1}
						onChange={(e) => onChange({
							...amountVal,
							amount: Number(e.target.value)
						} as T)}
					/>
					<NativeSelect
						className="min-w-24"
						value={amountVal.currency}
						onChange={(e) => onChange({
							...amountVal,
							currency: e.target.value as ECurrency
						} as T)}
					>
						{Object.values(ECurrency).map((currency) => (
							<NativeSelectOption key={currency} value={currency}>
								{currency}
							</NativeSelectOption>
						))}
					</NativeSelect>
				</div>
			);
		}

		case EFieldName.TRANSACTION_STATE:
			return (
				<NativeSelect 
					value={value as ETransactionState} 
					onChange={(e) => onChange(e.target.value as T)}
				>
					{Object.values(ETransactionState).map((state) => (
						<NativeSelectOption key={state} value={state}>
							{state}
						</NativeSelectOption>
					))}
				</NativeSelect>
			);

		case EFieldName.INSTALLMENTS:
			return (
				<Input 
					value={value as number}
					type="number" 
					min={1}
					max={1_000_000}
					onChange={(e) => onChange(Number(e.target.value) as T)} 
				/>
			);

		case EFieldName.ID:
			return (
				<Input
					value={value as string}
					minLength={2}
					maxLength={1000}
					required
					type="text"
					placeholder="ID"
					onChange={(e) => onChange(e.target.value as T)}
				/>
			);
		case EFieldName.NAME:
			return (
				<Input
					value={value as string}
					minLength={2}
					maxLength={100}
					required
					type="text"
					placeholder="Name"
					onChange={(e) => onChange(e.target.value as T)}
				/>
			);
		case EFieldName.DEVICE_IP:
			return (
				<Input
					value={value as string}
					required
					type="text"
					pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
					placeholder="Device IP (192.168.1.1)"
					onChange={(e) => onChange(e.target.value as T)}
				/>
			);

		default:
			return <Input type="text" disabled placeholder="Select a field first" />;
	}
}

export const ValueInput = <T extends EFieldName>({ 
	fieldName,
	value,
	onChange
}: {
	fieldName: T;
	value: GetFieldType<T>;
	onChange: (value: GetFieldType<T>) => void;
}) => {
	return (
		<ValueInputField<GetFieldType<T>>
			fieldValue={fieldName}
			value={value}
			onChange={onChange}
		/>
	);
};
