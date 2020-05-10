import { ActionTableEnum } from '../enums/action-table.enum';
import { BdData } from '../interfaces/bd-data.interface';

export type ChangeTableData = Readonly<{
  action: ActionTableEnum,
  prevValue?: BdData,
  newValue?: BdData,
}>;
