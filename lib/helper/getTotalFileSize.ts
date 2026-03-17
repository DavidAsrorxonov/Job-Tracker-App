import { UserDoc } from "@/app/(main)/dashboard/upload/_components/upload-client";

export const getTotalFileSize = (docs: UserDoc[]) => {
  const total = docs.reduce((acc, doc) => acc + doc.size!, 0);
  const inKB = total / 1024;
  const inMB = inKB / 1024;

  return {
    total,
    inKB,
    inMB,
  };
};
