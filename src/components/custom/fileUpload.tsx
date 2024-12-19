"use client";

import { Inbox } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ProgressBar, Viewer, Worker } from '@react-pdf-viewer/core';
import { toast } from 'sonner';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const savedFile = localStorage.getItem('uploadedFile');
    if (savedFile) {
      const parsedFile = JSON.parse(savedFile);
      const byteString = atob(parsedFile.content.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        view[i] = byteString.charCodeAt(i);
      }
      const fileBlob = new Blob([arrayBuffer], { type: parsedFile.type });
      const restoredFile = new File([fileBlob], parsedFile.name, { type: parsedFile.type });
      setFile(restoredFile);
      setPdfUrl(parsedFile.content);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const filetype = ["application/pdf"];
      const newFile = acceptedFiles[0];
      const reader = new FileReader();

      if (newFile && filetype.includes(newFile.type)) {
        reader.onload = () => {
          localStorage.setItem("uploadedFile", JSON.stringify({
            name: newFile.name,
            content: reader.result as string,
            type: newFile.type,
          }));

          setFile(newFile);
          setPdfUrl(reader.result as string);
        };

        reader.readAsDataURL(newFile);
      } else {
        toast.error("Kindly select a PDF File only", {
          style: {
            "backgroundColor": "#FADBD8",
            "color": "black",
            "border": "none"
          },
          duration: 2500
        });
      }
    }
  });

  return (
    <React.Fragment>
      <section className=" absolute top-[10vh] left-0 h-[90vh] w-1/2 flex flex-col justify-center items-center p-4">
        {
          !file
            ? (
              <div {...getRootProps({
                className: "w-full h-full border-dashed border-2 border-blue-400 rounded-xl cursor-pointer py-8 flex flex-col justify-center items-center gap-3"
              })}>
                <span className="scale-150 text-blue-600">
                  <Inbox />
                </span>
                <p className="italic">Drag and Drop or Upload the files</p>
                <input {...getInputProps()} />
              </div>
            )
            : (
              <div className='h-full w-full flex items-center overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent'>
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                  {pdfUrl && <Viewer
                    fileUrl={pdfUrl}
                    renderLoader={(percentages: number) => (
                      <div style={{ width: '240px' }}>
                        <ProgressBar progress={Math.round(percentages)} />
                      </div>
                    )}
                  />}
                  {!pdfUrl && <div {...getRootProps({
                    className: "w-full h-full border-dashed border-2 border-blue-400 rounded-xl cursor-pointer py-8 flex flex-col justify-center items-center gap-3"
                  })}>
                    <span className="scale-150 text-red-600">
                      <Inbox />
                    </span>
                    <p className="italic">Drag and Drop or Upload the files</p>
                    <input {...getInputProps()} />
                  </div>}
                </Worker>
              </div>
            )
        }
      </section>
    </React.Fragment>
  );
};

export default FileUpload;
