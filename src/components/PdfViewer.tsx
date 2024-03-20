import React from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <>
      <iframe
        src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
        className="w-full h-full"
      ></iframe>
      <div className="mt-2 flex flex-col gap-2 leading-7 bg-orange-200 w-full" >
        <p className="p-2 flex flex-col text-center">
          You can download the PDF file directly:
          <a href={pdf_url} download className="p-1.5 bg-blue-500 w-full rounded-lg">
            Download PDF
          </a>
        </p>
        <p className="p-2 flex flex-col text-center">
          Or, if you prefer, you can view the PDF file in a new tab or window:
          <a
            href={pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-yellow-500 w-full rounded-lg"
          >
            View PDF
          </a>
        </p>
      </div>

      {/* <embed src={pdf_url} type="application/pdf" className="w-full h-full" /> */}
    </>
  );
};

export default PDFViewer;
