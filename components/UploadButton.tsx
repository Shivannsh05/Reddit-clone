'use client';

import { UploadButton } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';

export default function ImageUploadButton() {
  return (
    <div className="my-4">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: { url: string }[]) => {
          if (!res || !Array.isArray(res)) {
            alert("Upload failed: No response received.");
            return;
          }

          console.log("Upload complete:", res);
          alert("Image uploaded!");

          // Example: Access uploaded file URL
          const imageUrl = res[0]?.url;
          console.log("Image URL:", imageUrl);
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}




