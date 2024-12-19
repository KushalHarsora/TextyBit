"use client";

import { Inbox } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [file, setFile] = useState<File[]>([]);

  // useEffect to check localStorage for an existing file on page load
  useEffect(() => {
    const savedFile = localStorage.getItem('uploadedFile');
    if (savedFile) {
      const parsedFile = JSON.parse(savedFile);
      
      // Convert the Base64 string back into a Blob and create a new File object
      const byteString = atob(parsedFile.content.split(',')[1]); // Remove the data URI prefix and decode Base64
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        view[i] = byteString.charCodeAt(i);
      }
      
      // Create a new File object from the Blob
      const fileBlob = new Blob([arrayBuffer], { type: parsedFile.type });
      const restoredFile = new File([fileBlob], parsedFile.name, { type: parsedFile.type });
      
      setFile([restoredFile]); // Set the file to state
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        // Store the file content in localStorage
        localStorage.setItem("uploadedFile", JSON.stringify({
          name: newFile.name,
          content: reader.result as string, // Store Base64 string
          type: newFile.type, // Store the file type
        }));

        setFile([newFile]); // Update the file state with the newly uploaded file
      };

      reader.readAsDataURL(newFile); // Read the file as Base64
    }
  });

  return (
    <React.Fragment>
      <section className="absolute top-[10vh] left-0 h-[90vh] w-1/2 flex flex-col justify-center items-center p-4">
        {
          !file.length
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
              <div className="w-full h-full border-dashed border-2 border-blue-400 rounded-xl cursor-pointer py-8 flex flex-col justify-center items-center gap-3">
                {file.map((index, value) => (
                  <span key={value}>
                    {index.name}
                  </span>
                ))}
              </div>
            )
        }
      </section>
    </React.Fragment>
  );
};

export default FileUpload;
