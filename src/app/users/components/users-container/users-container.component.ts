import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionTableEnum } from 'src/app/shared/enums/action-table.enum';
import { ColumnTypeEnum } from 'src/app/shared/enums/column-type.enum';
import { ChangeTableData } from 'src/app/shared/types/change-table-data.type';
import { User } from '../../../api/interfaces/user.interface';
import { UsersApiService } from '../../../api/services/users-api.service';
import { Column } from '../../../shared/types/column.type';
@Component({
  selector: 'bsc-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent {
  colsData: Array<Column> = [
    {
      rowKey: 'firstname',
      translateKey: 'USERDATA.FIRSTNAME',
      type: ColumnTypeEnum.TEXT,
      minWidth: 170,
      requared: true,
    },
    {
      rowKey: 'secondname',
      translateKey: 'USERDATA.SECONDNAME',
      type: ColumnTypeEnum.TEXT,
      minWidth: 170,
      requared: true,
    },
    {
      rowKey: 'birthday',
      translateKey: 'USERDATA.BIRTHDAY',
      type: ColumnTypeEnum.DATE,
      minWidth: 150,
      minValue: new Date('1900-01-01'),
      maxValue: new Date(),
      requared: true,
    },
    {
      rowKey: 'email',
      translateKey: 'USERDATA.EMAIL',
      type: ColumnTypeEnum.EMAIL,
      minWidth: 250,
      requared: true,
    },
    {
      rowKey: 'telephone',
      translateKey: 'USERDATA.TELEPHONE',
      type: ColumnTypeEnum.TELEPHONE,
      minWidth: 120,
      requared: false,
    },
    {
      rowKey: 'height',
      translateKey: 'USERDATA.HEIGHT',
      type: ColumnTypeEnum.NUMBER,
      minWidth: 110,
      minValue: 40,
      maxValue: 260,
      requared: true,
    },
    {
      rowKey: 'weight',
      translateKey: 'USERDATA.WEIGHT',
      type: ColumnTypeEnum.NUMBER,
      minWidth: 110,
      minValue: 1,
      maxValue: 360,
      requared: true,
    },
  ];
  rowsData$ = this.usersApiService.getData();
  constructor(private usersApiService: UsersApiService) {}

  onChangeData(event: ChangeTableData) {
    if (event.action === ActionTableEnum.EDIT) {
      this.usersApiService.editRow(
        event.prevValue.id.toString(),
        event.newValue as User
      );
    } else if (event.action === ActionTableEnum.NEW) {
      this.usersApiService.newRow(event.newValue as User);
    } else if (event.action === ActionTableEnum.DELETE) {
      this.usersApiService.deleteRow(event.prevValue.id.toString());
    }
  }
}
