import React, { FC, useState } from "react";
import styles from "./CustomModal.module.scss";
import { sectionList } from "../../constants";
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { FaStarOfLife } from "react-icons/fa";
import dayjs from "dayjs";
import { Option } from "antd/es/mentions";
import { BsFillTelephoneFill } from "react-icons/bs";
import { createFormData, getBase64, normFile } from "../../utils";
import { RcFile } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";
import { FormValues, TableItemInfo } from "../../types/types";
import { useSetUserParamsMutation } from "../../services/userEndpoints";
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'dayjs/locale/ru.js';

interface CustomModalProps {
  pickedUser: TableItemInfo,
  isShow: boolean,
  onOpen: Function,
  onClose: Function,
  type: "create" | "rewrite"
}

const CustomModal: FC<CustomModalProps> = ({ pickedUser, isShow, onClose, onOpen, type }) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [setUserParams, { isLoading: setUserParamsLoading }] = useSetUserParamsMutation();
  const dateFormat = "DD.MM.YYYY";

  const handleFullName = (name: string) => {
    if (name) {
      let fullName = name.split(" ");
      return `${fullName[0]} ${fullName[1][0]}.${fullName[2][0]}.`;
    }
  };

  const onSave = async (values: FormValues) => {
    const {
      age,
      phoneAdvanced,
      phoneNumber,
      number,
      pactNumber,
      country,
      email,
      endDate,
      dismissDate,
      files,
      gender,
      birthDay,
      GIBDDNum,
      lastName,
      previousLastName,
      firstName,
      secondName,
      secondPhoneComment,
      startDate,
      region,
      studStatus,
      promotedFrom
    } = values;
    const file = files[0].originFileObj;
    if (!file) {
      console.log("fileError");
      return;
    }
    const body = {
      gender,
      birthDay,
      GIBDDNum,
      lastName,
      previousLastName,
      firstName,
      secondName,
      secondPhoneComment,
      startDate,
      region,
      studStatus,
      promotedFrom,
      age,
      phoneAdvanced,
      phoneNumber,
      number,
      pactNumber,
      country,
      email,
      endDate,
      dismissDate
    };
    const formData = createFormData(body, file);

    await setUserParams(formData);
    onClose();
  };

  const uploadButton = (<>
    <div style={{ marginTop: 8, width: 200 }}>Загрузить фото</div>
  </>);


  return (
    <Modal footer={false} destroyOnClose centered onCancel={() => onClose()} open={isShow}>
      <div>
        {type === "rewrite" ? <>
          <div className={styles.modalHeader}>
            <span>{handleFullName(pickedUser.fullName)}</span>
            <div className={styles.groupWindow}>{`гр. ${pickedUser.groupNumber}`}</div>
            <span>Преподаватель:</span>
            <span className={styles.employeeName}>{`${pickedUser.employeeLastName}`}</span>
          </div>
          <div className={styles.sectionPicker}>
            {sectionList.map((el, idx) => <div onClick={() => setActiveSection(idx)}
                                               className={idx === activeSection ? `${styles.section__active} ${styles.section}` : styles.section}
                                               key={idx}>{el.toUpperCase()}</div>)}
          </div>
        </> : ""
        }
        <Form onFinish={onSave} layout="vertical" className={styles.form}>
          <div className={styles.userDataBox}>
            <div className={styles.formWrapper}>
              <FaStarOfLife style={{ color: "#19b0b0" }} />
              <Form.Item label="№ договора"
                         name="pactNumber">
                <Input defaultValue="407" width={20} />
              </Form.Item>
              <Form.Item name="startDate"
                         label="Дата договора">
                <DatePicker locale={locale} defaultValue={type === 'rewrite' ? dayjs(pickedUser.dateStartTraining, dateFormat) : dayjs(new Date())} format={dateFormat}
                            placeholder="" />
              </Form.Item>
              <Form.Item name="endDate"
                         label="Окончание">
                <DatePicker locale={locale} placeholder="" />
              </Form.Item>
              <Form.Item name="dismissDate"
                         label="Отчисление">
                <DatePicker locale={locale} placeholder="" />
              </Form.Item>
              <Form.Item name="promotedFrom"
                         label="Канал привлечения клиента">
                <Select />
              </Form.Item>
              <Form.Item label="Фамилия"
                         name="secondName"
                         initialValue={pickedUser.fullName ? pickedUser.fullName.split(" ")[0] : ""}
                         rules={[
                           {
                             required: true,
                             message: "Введите фамилию"
                           }
                         ]}>
                <Input width={20} />
              </Form.Item>
              <Form.Item label="Имя"
                         name="firstName"
                         initialValue={pickedUser.fullName ? pickedUser.fullName.split(" ")[1] : ""}
                         rules={[
                           {
                             required: true,
                             message: "Введите имя"
                           }
                         ]}>
                <Input width={20} />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Отчество"
                initialValue={pickedUser.fullName ? pickedUser.fullName.split(" ")[2] : ""}
                rules={[
                  {
                    required: true,
                    message: "Введите отчество"
                  }
                ]}>
                <Input width={20} />
              </Form.Item>
              <Form.Item name="previousLastName"
                         label="Прежняя фамилия">
                <Input placeholder="Если менялась" width={20} />
              </Form.Item>
              <Form.Item className={styles.item} label="Пол"
                         name="gender">
                <Select value="male">
                  <Option value="male">Мужской</Option>
                  <Option value="female">Женский</Option>
                </Select>
              </Form.Item>
              <Form.Item name="birthDay"
                         label="Дата рождения">
                <DatePicker />
              </Form.Item>
              <Form.Item name="age"
                         label="Лет">
                <InputNumber width={20} />
              </Form.Item>
              <Form.Item name="country"
                         label="Гражданство">
                <Select />
              </Form.Item>
              <Form.Item name="number"
                         label="№ п/п">
                <InputNumber width={20} />
              </Form.Item>
              <Form.Item name="GIBDDNum"
                         label="Рег. № в ГИБДД">
                <Input width={20} />
              </Form.Item>
              <Form.Item name="region"
                         label="Регион/страна рождения">
                <Select />
              </Form.Item>
              <Form.Item name="studStatus"
                         label="Статус студента">
                <Select defaultValue={pickedUser.currentStudentStatus}>
                </Select>
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Телефон"
                rules={[{ required: true, message: "Введите номер телефона" }]}
              >
                <Input addonBefore="+7" style={{ width: "100%" }} />
              </Form.Item>
              <BsFillTelephoneFill style={{ color: "#19b0b0" }} />
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Пожалуйста введите E-mail!"
                  }
                ]}
              >
                <Input placeholder="user@email.ru" />
              </Form.Item>
              <Form.Item
                name="phoneAdvanced"
                label="Дополнительный телефон"
                rules={[{ required: true, message: "Please input your phone number!" }]}
              >
                <Input addonBefore="+7" style={{ width: "100%" }} />
              </Form.Item>
              <BsFillTelephoneFill style={{ color: "#19b0b0" }} />
              <Form.Item name="secondPhoneComment"
                         label="Примечание к доп.телефону">
                <Input width={20} />
              </Form.Item>
            </div>
            <Form.Item getValueFromEvent={normFile}
                       name="files"
                       valuePropName="fileList">
              <Upload
                customRequest={({ file, onSuccess }) => {
                  getBase64(file as RcFile, (url) => {
                    setLoading(false);
                    setImageUrl(url);
                  });
                }}
                maxCount={1}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                accept="image/*">
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
              </Upload>
            </Form.Item>
          </div>
          <Form.Item name="comment">
            <TextArea placeholder="Комментарий" rows={4} className={styles.formInput} />
          </Form.Item>
          <Form.Item className={styles.submitBtnWrapper}>
            <Button className={styles.cancelBtn} onClick={() => {
              setImageUrl('')
              onClose();
            }}>Отмена</Button>
            <Button htmlType="submit" loading={setUserParamsLoading} className={styles.submitBtn}>{type === 'create' ? 'Отправить' : 'Сохранить'}</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CustomModal;