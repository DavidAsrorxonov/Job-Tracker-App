"use client";

import UploadDocs from "@/components/upload-docs";
import Navbar from "./_components/navbar";
import DocumentsList from "./_components/documents-list";

const Upload = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 flex justify-between">
        <UploadDocs />

        <DocumentsList />
      </div>
    </div>
  );
};

export default Upload;
