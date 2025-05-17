'use client';

import { UploadButton } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';

// Manually defined fallback type
type UploadFileResponse = {
  url: string;
  name: string;
};

export default function ImageUploadButton() {
  return (
    <div className="my-4">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: UploadFileResponse[] | undefined) => {
          if (res && res.length > 0) {
            console.log('Upload complete:', res);
            alert('Image uploaded!');
          } else {
            console.log('No file uploaded.');
          }
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
    </div>
  );
}



