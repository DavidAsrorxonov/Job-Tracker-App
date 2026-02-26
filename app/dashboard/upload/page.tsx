"use client";

import UploadDocs from "@/components/upload-docs";
import Navbar from "./_components/navbar";
import DocumentsList from "./_components/documents-list";

const Upload = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="p-6 flex h-fit">
          <UploadDocs />
        </div>

        <div className="p-6">
          <DocumentsList />
        </div>
      </div>
    </div>
  );
};

export default Upload;
