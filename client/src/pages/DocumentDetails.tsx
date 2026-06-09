import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PDFPreview from "../components/PDFPreview";
import axios from "axios";

function DocumentDetails() {
  const { id } = useParams();
  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    const fetchDocument = async () => {

      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:5000/api/docs/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );
      setDoc(response.data);
    };

    fetchDocument();

  }, [id]);

  if (!doc) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <h1>{doc.fileName}</h1>
    <PDFPreview fileUrl={`http://localhost:5000/${doc.filePath}`}/>
    </div>
  );
}

export default DocumentDetails;