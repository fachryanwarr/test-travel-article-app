export const getImage = (fileName: string) => {
  return import.meta.env.VITE_IMG_BASE_URL + fileName;
};
