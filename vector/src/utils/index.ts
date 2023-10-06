import { RcFile, UploadChangeParam } from "antd/es/upload";

export const createFormData = (body: object, file: RcFile): FormData => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'body',
    new Blob([JSON.stringify(body)], {
      type: 'application/json',
    })
  );

  return formData;
};

export const normFile = (e: UploadChangeParam) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};