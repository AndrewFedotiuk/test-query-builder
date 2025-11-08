import { EFieldName } from "@/client/features/MainForm/_types";
import { EFieldType } from "@/client/features/MainForm/_types";
import { EOperation } from "@/client/features/MainForm/_types";
import { TFieldDefinition } from "./_types";

export const FIELDS: TFieldDefinition[] = [
	{
		label: "Amount",
		value: EFieldName.AMOUNT,
		type: EFieldType.NUMBER,
		operations: [EOperation.EQUAL, EOperation.NOT_EQUAL]
	},
	{
		label: "Name",
		value: EFieldName.NAME,
		type: EFieldType.TEXT,
		operations: [EOperation.EQUAL, EOperation.NOT_EQUAL]
	},
	{
		label: "ID",
		value: EFieldName.ID,
		type: EFieldType.TEXT,
		operations: [EOperation.EQUAL, EOperation.NOT_EQUAL]
	},
	{
		label: "Transaction State",
		value: EFieldName.TRANSACTION_STATE,
		type: EFieldType.ENUM,
		operations: [EOperation.EQUAL, EOperation.NOT_EQUAL]
	},
	{
		label: "Device IP",
		value: EFieldName.DEVICE_IP,
		type: EFieldType.TEXT,
		operations: [EOperation.EQUAL, EOperation.NOT_EQUAL]
	},
	{
		label: "Installments",
		value: EFieldName.INSTALLMENTS,
		type: EFieldType.NUMBER,
		operations: [EOperation.EQUAL, EOperation.NOT_EQUAL]
	}
];
