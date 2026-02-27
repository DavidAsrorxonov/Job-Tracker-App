"use client";

import UploadDocs from "@/components/upload-docs";
import Navbar from "./_components/navbar";
import DocumentsList from "./_components/documents-list";

const Upload = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full flex">
        <div className="w-1/2 p-6 flex h-fit">
          <UploadDocs />
        </div>

        <div className="w-1/2 p-6">
          <DocumentsList />
        </div>
      </div>

      {/* <div className="h-[400px] w-full">Hello</div> */}
    </div>
  );
};

export default Upload;
