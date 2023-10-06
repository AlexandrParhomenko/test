import React, { useState } from "react";
import styles from "./Main.module.scss";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { FiFilter, FiRefreshCw } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomTable from "../../components/CustomTable/CustomTable";
import GroupCell from "../../components/GroupCell/GroupCell";
import { dataArray } from "../../constants";
import { Button, Input } from "antd";
import CustomModal from "../../components/CustomModal/CustomModal";
import { TableItemInfo } from "../../types/types";

const Main = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalCancel = () => setIsModalOpen(false)
  return (
    <div className={styles.main}>
      <CustomModal type='create' onOpen={handleModalOpen} onClose={handleModalCancel} isShow={isModalOpen} pickedUser={{} as TableItemInfo}/>
      <div className={styles.main__content}>
        <div className={styles.mainBox}>
          <div className={styles.groupPickerWrapper}>
            <div className={styles.groupPicker}>
              <span>Все группы</span>
              <BiDotsVerticalRounded size={30} />
            </div>
            <div className={styles.groupList}>
              <Input placeholder="Поиск по номеру группы" className={styles.inputBar} />
              <div className={styles.categoryWrapper}>
                <div className={styles.categoryType}>
                  <span>Категории</span>
                  <MdKeyboardArrowDown />
                </div>
                <div className={styles.categoryType}>
                  <span>Филиалы</span>
                  <MdKeyboardArrowDown />
                </div>
              </div>
              {dataArray.map((el) => <GroupCell key={el.id.toString()} data={el}
                                                onClick={() => setActiveCategory(el.id)} category={activeCategory} />
              )}
            </div>
          </div>
          <div className={styles.mainContentWrapper}>
            <div className={styles.tableWrapper}>
              <div className={styles.tableWrapper__head}>
                <Button onClick={handleModalOpen} className={styles.addStudentBtn}>
                  <span>Договоры на обучение</span>
                  <AiOutlinePlus className={styles.addStudentBtn__logo} />
                </Button>
                <div className={styles.filterIconsWrapper}>
                  <div className={styles.filterIcon}><FiRefreshCw color="grey" size={20} /></div>
                  <div className={styles.filterIcon}><FiFilter color="grey" size={20} /></div>
                  <div className={styles.filterIcon}><RiDeleteBin6Line color="grey" size={20} /></div>
                </div>
              </div>
              <div className={styles.filterCategories}>
                <div className={styles.filterCategory}>
                  <span>Действия</span>
                  <MdKeyboardArrowDown size={25} />
                </div>
                <div className={styles.filterCategory}>
                  <span>Коммуникации</span>
                  <MdKeyboardArrowDown size={25} />
                </div>
                <div className={styles.filterCategory}>
                  <span>Документы</span>
                  <MdKeyboardArrowDown size={25} />
                </div>
              </div>
            </div>
            <div className={styles.table}>
              <div className={styles.tableBackground}>
                <CustomTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;