import { ActionTableEnum } from '../enums/action-table.enum';
import { IBdData } from '../interfaces/bd-data.interface';

export type ChangeTableData = Readonly<{
  action: ActionTableEnum,
  prevValue?: IBdData,
  newValue?: IBdData,
}>;
