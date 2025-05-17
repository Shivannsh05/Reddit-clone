import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing";

// Export the handler used by UploadThing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
