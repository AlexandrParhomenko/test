import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../../components/Header/Header";
import CustomBurgerMenu from "../../components/CustomBurgerMenu/CustomBurgerMenu";
import styles from './BaseLayout.module.scss'

const BaseLayout: FC = () => {
  return (
    <div className={styles.base}>
      <CustomBurgerMenu/>
      <div className={styles.base__content}>
        <Header />
        <Outlet />
      </div>

    </div>
  );
};

export default BaseLayout;