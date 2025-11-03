import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { EFieldName, EOperation } from "./_type";
import { CardHeader } from "../CardHeader";
import { Button } from "@/components/ui/button";

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

export function CardFieldGroup() {
	return (
		<div className="grid gap-3 p-3 rounded-md border">
			<CardHeader />

			<div className="flex gap-3">
				<NativeSelect>
					{fieldOptions.map((option) => (
						<NativeSelectOption key={option.value} value={option.value}>
							{option.label}
						</NativeSelectOption>
					))}
				</NativeSelect>

				<NativeSelect>
					{operationOptions.map((option) => (
						<NativeSelectOption key={option.value} value={option.value}>
							{option.label}
						</NativeSelectOption>
					))}
				</NativeSelect>
			
				<Input className="flex-1" type="text" placeholder="Operator" />

				<Button variant="destructive" size="icon">-</Button>
			</div>
		</div>
	)
};
