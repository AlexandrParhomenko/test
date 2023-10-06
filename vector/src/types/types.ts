import { UploadFile } from "antd";

export interface UserType {
  stud_last_name: string,
  stud_first_name: string,
  stud_middle_name: string,
  contract_number: string,
  current_student_status: string,
  employee_last_name: string,
  training_group_number: string,
  training_group_current_status: string,
  date_start_training: string,
  id: string,
}

export interface GetUsersResponse {
  data: UserType[],
}

export interface TableItemInfo {
  key: string,
  dateStartTraining: string,
  fullName: string,
  currentStudentStatus: string,
  instructorPlan: string,
  contractNumber: string,
  employeeLastName: string,
  groupNumber: string,
  vjd: string,
  dop: string,
  tsz: string,
  grn: string,
  ntr: string,
}

export interface Data {
  id: number,
  category: string[],
  name: string,
  state: string,
  startDate: string,
  address: string
}

export type FormValues = {
  pactNumber: string,
  startDate: string,
  endDate: string,
  dismissDate: string,
  promotedFrom: string,
  secondName: string,
  firstName: string,
  lastName: string,
  previousLastName: string,
  gender: string,
  birthDay: string,
  age: string,
  country: string,
  number: string,
  GIBDDNum: string,
  region: string,
  studStatus: string,
  phoneNumber: string,
  email: string,
  phoneAdvanced: string,
  secondPhoneComment: string,
  files: UploadFile[]
}