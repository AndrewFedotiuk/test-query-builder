import { EFieldName } from "@/client/features/MainForm/_types";
import { Input } from "@/components/ui/input";
import { ETransactionState, TAmountValue } from "@/client/features/MainForm/_types";
import { ECurrency } from "@/client/features/MainForm/_types";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

type TValueInput<T> = {
	fieldValue: EFieldName;
	value: T;
	onChange: (value: T) => void;
}

export function ValueInput<T>({ 
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
						onChange={(e) => onChange({
							...amountVal,
							amount: Number(e.target.value)
						} as T)}
					/>
					<NativeSelect
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
					onChange={(e) => onChange(Number(e.target.value) as T)} 
				/>
			);

		case EFieldName.ID:
		case EFieldName.NAME:
		case EFieldName.DEVICE_IP:
			return (
				<Input
					value={value as string}
					type="text"
					onChange={(e) => onChange(e.target.value as T)}
				/>
			);

		default:
			return <Input type="text" disabled placeholder="Select a field first" />;
	}
}
