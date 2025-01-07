'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { Inbox } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { ProgressBar, Viewer, Worker } from '@react-pdf-viewer/core';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { GoogleGenerativeAI } from '@google/generative-ai';


const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY!);
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'; // Set the worker
    }
  }, []);

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

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise(async (resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const pdfBuffer = e.target!.result as ArrayBuffer;
          const pdfDocument = await getDocument(pdfBuffer).promise;
          let fullText = '';

          for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            const textContent = await page.getTextContent();

            const pageText = textContent.items
              .filter((item: any) => 'str' in item)
              .map((item: any) => item.str)
              .join(' ');

            fullText += pageText + '\n';
          }
          localStorage.setItem("textContent", fullText);
          resolve(fullText);
        } catch (error) {
          reject('Error extracting PDF text');
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      const reader = new FileReader();

      if (newFile.size > 5 * 1024 * 1024) {
        toast.error("Kindly select a small PDF File (max 10mb)", {
          style: {
            "backgroundColor": "#FADBD8",
            "color": "black",
            "border": "none"
          },
          duration: 2500
        });
      } else {
        if (newFile && newFile.type === "application/pdf") {
          reader.onload = async () => {
            localStorage.setItem("uploadedFile", JSON.stringify({
              name: newFile.name,
              content: reader.result as string,
              type: newFile.type,
            }));

            const textContent = await extractTextFromPDF(newFile);
            const result = await model.embedContent(textContent);

            if (result && result.embedding && result.embedding.values) {
              const embeddings = result.embedding.values;
              const storedEmbeddings = JSON.parse(localStorage.getItem("embeddings") || '[]');
              storedEmbeddings.push({ fileName: newFile.name, embeddings });
              localStorage.setItem("embeddings", JSON.stringify(storedEmbeddings));

              setFile(newFile);
              setPdfUrl(reader.result as string);
              window.location.reload();
            } else {
              console.error("Failed to generate embeddings");
            }
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
          window.location.reload();
        }
      }
    }
  });

  const deleteFile = async () => {
    localStorage.removeItem("uploadedFile");
    localStorage.removeItem("embeddings");
    localStorage.removeItem("textContent");
    setFile(null);
    setPdfUrl(null);
    toast.error("File Deleted", {
      style: {
        "backgroundColor": "#FADBD8",
        "color": "black",
        "border": "none"
      },
      duration: 1000
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <React.Fragment>
      <section className="absolute top-[10vh] left-0 h-[90vh] w-1/2 flex flex-col justify-center items-center p-4">
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
              <div className='h-full w-full flex flex-col items-center overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent'>
                <div className='h-[10vh] w-full flex flex-row justify-evenly items-center bg-blue-50 py-3 px-2'>
                  <span className='text-lg font-semibold'>
                    {file.name}
                  </span>
                  <span>
                    <Button
                      className='px-5 py-3 flex justify-center items-center gap-1'
                      variant={'destructive'}
                      onClick={deleteFile}
                    >
                      Delete File
                    </Button>
                  </span>
                </div>
                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
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
