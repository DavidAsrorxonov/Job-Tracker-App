"use client";

import UploadDocs from "@/components/upload-docs";
import Navbar from "./_components/navbar";

const Upload = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <UploadDocs />
      </div>
    </div>
  );
};

export default Upload;
