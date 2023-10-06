import React, { FC } from "react";
import styles from './GroupCell.module.scss';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Data } from "../../types/types";

interface GroupCellProps {
  data: Data,
  category: number,
  onClick: Function
}

const GroupCell: FC<GroupCellProps> = ({onClick, category, data}) => {

  return (
    <div onClick={() => onClick()} className={category === data.id ? `${styles.groupBox} ${styles.active}` : `${styles.groupBox}`}>
      <div className={styles.groupBox__container}>
        <div className={styles.groupBox__categoryWrapper}>{data.category.map((category, idx) => <div
          className={styles.groupBox__category} key={idx}>{category}</div>)}</div>
        <BiDotsVerticalRounded color="grey" size={30} />
      </div>
      <span className={styles.groupName}>{data.name}</span>
      <span className={styles.groupState}>{data.state}</span>
      <span>{`Начало ${data.startDate}`}</span>
      <span>{data.address}</span>
    </div>
  );
};

export default GroupCell;