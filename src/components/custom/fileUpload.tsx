"use client";

import { Inbox } from 'lucide-react';
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUpload = () => {

  const [file, steFile] = useState<File []>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      steFile(acceptedFiles);
    }
  });

  return (
    <React.Fragment>
      <section className=' absolute top-[10vh] left-0 h-[90vh] w-1/2 flex flex-col justify-center items-center p-4'>
        {
          (!file)
            ?
            <div {...getRootProps({
              className: " w-full h-full border-dashed border-2 border-blue-400 rounded-xl cursor-pointer py-8 flex flex-col justify-center items-center gap-3"
            })}>
              <span className=' scale-150 text-blue-600'>
                <Inbox />
              </span>
              <p className=' italic'>Drag and Drop or Upload the files</p>
              <input {...getInputProps()} />
            </div>
            :
            <div className=' w-full h-full border-dashed border-2 border-blue-400 rounded-xl cursor-pointer py-8 flex flex-col justify-center items-center gap-3'>
              {file.map((index, value) => (
                <span key={value}>
                  {index.name}
                </span>
              ))}
            </div>
        }
      </section>
    </React.Fragment>
  )
}

export default FileUpload