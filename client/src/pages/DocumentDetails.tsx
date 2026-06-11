import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PDFPreview from "../components/PDFPreview";
import axios from "axios";
import { DndContext } from "@dnd-kit/core";
import { saveSignature } from "../services/signatureService";
import SignatureField from "../components/SignatureField";

function DocumentDetails() {
  const { id } = useParams();
  const [doc, setDoc] = useState<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [relativeX, setRelativeX] =useState(0);
  const [relativeY, setRelativeY] = useState(0);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = async (event:any) => { 
  const { delta } = event;
  const newX = position.x + delta.x;
  const newY = position.y + delta.y;
    setPosition({
      x: newX,
      y: newY
    });
  const rect = pdfRef.current?.getBoundingClientRect();
  if (!rect) return;
  setRelativeX((newX / rect.width) * 100);
  setRelativeY((newY / rect.width) * 100);
  console.log("drag ended");
  };


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
  <DndContext onDragEnd={handleDragEnd}>
    <div ref={ pdfRef }>
      <h1>{doc.fileName}</h1>
      <PDFPreview fileUrl={`http://localhost:5000/${doc.filePath}`}/>
      <div className="absolute z-50" style={{ left: position.x, top: position.y }}>
        <SignatureField />
      </div>
      <button onClick={() => saveSignature(doc._id, relativeX, relativeY, 1)}>
        Save Position
      </button>
    </div>
  </DndContext>
  );
}

export default DocumentDetails;