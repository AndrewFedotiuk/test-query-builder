import { EFieldName } from "@/client/features/MainForm/_types";
import { TAmountValue } from "@/client/features/MainForm/_types";
import { ETransactionState } from "@/client/features/MainForm/_types";

export type FieldTypeMap = {
	[EFieldName.AMOUNT]: TAmountValue;
	[EFieldName.INSTALLMENTS]: number;
	[EFieldName.TRANSACTION_STATE]: ETransactionState;
	[EFieldName.NAME]: string;
	[EFieldName.ID]: string;
	[EFieldName.DEVICE_IP]: string;
};

export type GetFieldType<T extends EFieldName> = T extends keyof FieldTypeMap 
	? FieldTypeMap[T] 
	: never;
