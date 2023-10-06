import { TableItemInfo } from "../../types/types";
import { ColumnType } from "antd/es/table";
import styles from './CustomTable.module.scss'
import { LuRefreshCcwDot } from "react-icons/lu";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";

export const columns: ColumnType<TableItemInfo>[] = [
  {
    title: 'Номер договора',
    dataIndex: 'dateStartTraining',
    key: 'dateStartTraining',
    sorter: (a, b) => {
      let aa = a.dateStartTraining.split('.').reverse().join(),
        bb = b.dateStartTraining.split('.').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0)
    },
  },
  {
    title: 'ФИО курсанта',
    dataIndex: 'fullName',
    key: 'fullName',
    sorter: (a, b) => a.fullName.localeCompare(b.fullName),
  },
  {
    title: 'Статус',
    dataIndex: 'currentStudentStatus',
    filters: [
      {
        text: 'Обучается',
        value: 'Обучается',
      },
      {
        text: 'Зачислен',
        value: 'Зачислен',
      },
      {
        text: 'Зачислен досрочно',
        value: 'Зачислен досрочно',
      },
    ],
    key: 'currentStudentStatus',
    render: (_: any, record: TableItemInfo) => {
      return (
        <div className={styles.studentStatusColumn}>
          {record.currentStudentStatus === 'Обучается'
            ? <LuRefreshCcwDot size={20} color='green'/>
            : record.currentStudentStatus === 'Зачислен'
              ? <AiOutlinePlusCircle size={23}  color='red'/>
              : <AiOutlineCloseCircle size={20}/>}
          <span>{record.currentStudentStatus}</span>
        </div>
      )
    },
    // onFilter: (value: string | number | boolean, record) => record.currentStudentStatus.startsWith(value.toString()),
  },
  {
    title: 'Инструктор план/факт',
    dataIndex: 'instructorPlan',
    key: 'instructorPlan',
    render: (_: any, record: TableItemInfo) => {
      return (
        <>
          <span className={styles.instructorColumn}>{record.instructorPlan}</span>
        </>
      )
    }
  },
  {
    title: 'ВЖД',
    dataIndex: 'vjd',
    key: 'vjd',
  },
  {
    title: 'ДОП',
    dataIndex: 'dop',
    key: 'dop',
  },
  {
    title: 'ТСЗ',
    dataIndex: 'tsz',
    key: 'tsz',
  },
  {
    title: 'ГРН',
    dataIndex: 'grn',
    key: 'grn',
  },
  {
    title: 'НТР',
    dataIndex: 'ntr',
    key: 'ntr',
  },
  {
    title: 'Расчеты по договору',
    dataIndex: 'payment',
    key: 'payment',
    render: (_: any, record: TableItemInfo) => {
      return (
        <>
          <div>Сумма 25000</div>
          <div className={styles.paymentAmount}>Долг 15000</div>
        </>
      )
    }
  },
]