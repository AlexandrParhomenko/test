import "./App.css"
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ConfigProvider } from "antd";
import ruRU from 'antd/locale/ru_RU'

function App() {
  return (
      <ConfigProvider theme={{
        components: {
          Menu: {
            colorPrimary: '#e34d4d',
            colorBgContainer: '#364150',
            colorText: '#b9b9b9',
            itemHoverColor: 'white',
            itemSelectedBg: '#e34d4d',
            itemSelectedColor: 'white',
            collapsedWidth: 50,
            horizontalItemSelectedColor: '#e34d4d',
          },
        }
      }} locale={ruRU}>
        <RouterProvider router={router}/>
      </ConfigProvider>
  )
}

export default App
