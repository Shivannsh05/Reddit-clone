import { createUploadthing, generateComponents } from "uploadthing";

// Initialize the UploadThing function
const f = createUploadthing();

// Define the file router configuration
export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ metadata, file }: { metadata: unknown; file: { url: string } }) => {
    console.log("Upload completed:", file.url);
    // You can store file.url in your DB here
  }),
};

// Export the type for use in the route handler or elsewhere
export type OurFileRouter = typeof ourFileRouter;

// Generate Upload components without type argument (to avoid TS error)
export const { UploadButton, UploadDropzone, Uploader } = generateComponents();










