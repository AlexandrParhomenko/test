import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/Main/Main";
import routes from "./routes";
import BaseLayout from "../pages/BaseLayout/BaseLayout";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import AgentsPage from "../pages/AgentsPage/AgentsPage";
import GroupsPage from "../pages/GroupsPage/GroupsPage";
import EmployeePage from "../pages/EmployeePage/EmployeePage";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import PaymentsPage from "../pages/PaymentsPage/PaymentsPage";
import ReportsPage from "../pages/ReportsPage/ReportsPage";

export const routesConfig = [
  {
    path: routes.main,
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: routes.agents,
        element: <AgentsPage/>
      },
      {
        path: routes.employees,
        element: <EmployeePage/>
      },
      {
        path: routes.groups,
        element: <GroupsPage/>
      },
      {
        path: routes.services,
        element: <ServicesPage/>
      },
      {
        path: routes.payments,
        element: <PaymentsPage/>
      },
      {
        path: routes.reports,
        element: <ReportsPage/>
      },
      {
        path: routes.contracts,
        element: <ReportsPage/>
      },
      {
        path: '*',
        element: <Navigate to={routes.notFound} />,
      },
      {
        path: routes.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routesConfig, {
  basename: '/VectorApp/',
});

export default router;