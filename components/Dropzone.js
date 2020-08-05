import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clientAxios from "../config/axios";

const Dropzone = () => {
  const onDropRejected = () => {
    console.log("Could not upload");
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    //Create form data
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    const result = await clientAxios.post("/api/files", formData);
  }, []);

  //Extract content from dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const files = acceptedFiles.map((file) => (
    <li
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
      key={file.lastModified}
    >
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  const createLink = () => {
    console.log("Creating link");
  };

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 p-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Files</h4>
          <ul>{files}</ul>
          <button
            type="button"
            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
            onClick={() => createLink()}
          >
            Create link
          </button>
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />
          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">Drop the file</p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Select a file and drag it here
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Select file
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
