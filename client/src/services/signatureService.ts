import axios from "axios";

export const saveSignature = async (
  documentId: string,
  x: number,
  y: number,
  page: number
) => {

  const token = localStorage.getItem("token");

  return axios.post(
    "http://localhost:5000/api/signatures",
    {
      document: documentId,
      page,
      x,
      y
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};