import React, { useEffect, useState } from "react";
import { Button, Menu, MenuProps } from "antd";
import { AiOutlineMenu, AiOutlineMenuUnfold, AiOutlineSchedule } from "react-icons/ai";
import { BsPersonWorkspace } from "react-icons/bs";
import { SiVectorlogozone } from "react-icons/si";
import { FaPeopleLine } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import styles from "./CustomBurgerMenu.module.scss";
import vector from "../../assets/vectorLogo.png";
import { Link } from "react-router-dom";
import routes from "../../router/routes";

const CustomBurgerMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuTable = [
    ['leads', "", 'groups', 'contracts'],
    ['finances', 'accuredservices', 'payments', 'contractreports']
  ]
  const getPath = () => {
    let openKey = '123'
    let path = window.location.pathname.split('/')
    menuTable.forEach((el, idx) => el.indexOf(path[path.length - 1]) !== -1 ? openKey = menuTable[idx][0] : '')
    return [path[path.length - 1], openKey]
  }

  const [currentPath, setCurrentPath] = useState<string[]>(getPath())


  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  }


  const items: MenuItem[] = [
    getItem(<Link to={routes.agents}>Контрагенты</Link>, "agents", <SiVectorlogozone size={19} />),
    getItem(<Link to={routes.employees}>Сотрудники</Link>, "employees", <BsPersonWorkspace size={19} />),
    getItem("Курсанты", "leads", <FaPeopleLine size={25} />, [
      getItem(<Link to={routes.main}>Лиды</Link>, ""),
      getItem(<Link to={routes.groups}>Группы</Link>, "groups"),
      getItem(<Link to={routes.contracts}>Договоры</Link>, "contracts")
    ]),

    getItem("Финансы", "finances", <GiMoneyStack size={25} />, [
      getItem(<Link to={routes.services}>Начисления</Link>, "accuredservices"),
      getItem(<Link to={routes.payments}>Оплаты</Link>, "payments"),
      getItem(<Link to={routes.reports}>Отчёты по договорам</Link>, "contractreports")

    ]),

    getItem("Расписание", "sub3", <AiOutlineSchedule size={25} />, [
      getItem("Расписание(теория)", "10"),
      getItem("Расписание(практика)", "11")
    ])
  ];

  return (
    <div className={styles.menu}>
      <div className={styles.burgerMenu}>
        {collapsed
          ? <AiOutlineMenu className={styles.burgerButton}
                           onClick={toggleCollapsed} />
          : <AiOutlineMenuUnfold className={styles.burgerButton}
                                 onClick={toggleCollapsed} />}
        <Menu defaultSelectedKeys={[`${currentPath[0]}`]}
              defaultOpenKeys={[`${currentPath[1]}`]}
              mode="inline"
              theme="light"
              inlineCollapsed={collapsed}
              items={items} />
      </div>
      <div>
        <img className={styles.asideMenu__logo} height="40" width="40" src={vector} alt="vectorLogo" />
      </div>
    </div>

  );
};

export default CustomBurgerMenu;