import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

function PDFPreview({fileUrl}: {fileUrl: string;}) {

  const [numPages, setNumPages] = useState<number>();

  return (
    <>
    <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
      <Page pageNumber={1} />
    </Document>
    <p>Total Pages: {numPages}</p>
    </>
  );
}

export default PDFPreview;