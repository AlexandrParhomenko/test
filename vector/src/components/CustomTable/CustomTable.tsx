import { FC, useState } from "react";
import { useGetUsersQuery } from "../../services/userEndpoints";
import {
  Spin,
  Table,
} from "antd";
import { columns } from "./TableConfig";
import { TableItemInfo } from "../../types/types";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./CustomTable.module.scss";
import CustomModal from "../CustomModal/CustomModal";

const CustomTable: FC = () => {
  const { data, isLoading, error } = useGetUsersQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pickedUser, setPickedUser] = useState<TableItemInfo>({} as TableItemInfo);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const formatData = (data: string) => {
    let formatDate = data.split("-");
    return `${formatDate[2]}.${formatDate[1]}.${formatDate[0]}`;
  };

  if (isLoading || !data) {
    return <Spin indicator={antIcon} className={styles.spinner} />;
  }
  const dataSource = data.data.map(el => ({
    key: el.id,
    dateStartTraining: formatData(el.date_start_training),
    fullName: `${el.stud_last_name} ${el.stud_first_name} ${el.stud_middle_name}`,
    currentStudentStatus: el.current_student_status,
    contractNumber: el.contract_number,
    employeeLastName: el.employee_last_name,
    groupNumber: el.training_group_number,
    instructorPlan: "Запланировать",
    vjd: "",
    dop: "",
    tsz: "",
    grn: "",
    ntr: ""
  }));



  const onRow = (row: TableItemInfo) => {
    return {
      onClick: () => {
        handleModalOpen();
        setPickedUser(row);
      }
    };
  }

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalCancel = () => setIsModalOpen(false)



  return (
    <>
      <CustomModal type='rewrite' onOpen={handleModalOpen} onClose={handleModalCancel} isShow={isModalOpen} pickedUser={pickedUser}/>
      <Table rowClassName={styles.table}
             onRow={onRow}
             rowSelection={{ type: "radio" }}
             pagination={false}
             dataSource={dataSource}
             columns={columns}
             size="small"
             scroll={{ x: 1300 }} />
    </>

  );
};

export default CustomTable;