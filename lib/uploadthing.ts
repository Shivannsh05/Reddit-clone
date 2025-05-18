// lib/uploadthing.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { generateComponents } from "@uploadthing/react"; // ✅ Use the correct function for your version

// Initialize the UploadThing handler
const f = createUploadthing();

// Define your file router
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      console.log("File uploaded:", file.url);
    }),
};

// Export type for the router
export type OurFileRouter = typeof ourFileRouter;

// ✅ Generate components without passing type args (not needed in this version)
export const { UploadButton, UploadDropzone, Uploader } = generateComponents();














