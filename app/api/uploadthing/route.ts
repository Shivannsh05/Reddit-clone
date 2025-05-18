// app/api/uploadthing/route.ts

import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing";

// Export the handler used by UploadThing
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

