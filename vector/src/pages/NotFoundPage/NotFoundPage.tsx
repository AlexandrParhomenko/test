import React from "react";
import { Empty } from "antd";
import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => {
  return (
    <Empty style={{color: 'red'}} imageStyle={{color: 'red'}} description='Нет данных' className={styles.empty}/>
  );
};

export default NotFoundPage;