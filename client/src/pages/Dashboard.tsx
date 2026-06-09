import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocuments } from "../services/documentService";

function Dashboard() {

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const token = localStorage.getItem("token");
      const data = await getDocuments(token!);
      setDocuments(data);
    };

    fetchDocs();

  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Documents
      </h1>
      {documents.map((doc: any) => (
        <div key={doc._id} className="border p-4 mb-4 rounded">
          <h2>{doc.fileName}</h2>
          <p>
            Status:
            {" "}
            {doc.status}
          </p>
          <Link to={`/documents/${doc._id}`}>
            View Document
          </Link>
        </div>
      ))}
    </div>
    
  );
}

export default Dashboard;