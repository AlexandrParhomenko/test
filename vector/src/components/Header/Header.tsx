import React from "react";
import styles from './Header.module.scss'
import Search from "antd/es/input/Search";
import { Button } from "antd";
import { IoMdExit } from "react-icons/io";

const Header = () => {
  return (
    <div className={styles.header}>
      <Search placeholder="Поиск по номеру договора, ФИО, инструктору"
              enterButton='Поиск'
              allowClear
              size='large'
              className={styles.table__searchBar} />
      <Button type='primary'
              icon={<IoMdExit size={20}/>}
              className={styles.header__button}>
        Выйти
      </Button>
    </div>
  );
};

export default Header;