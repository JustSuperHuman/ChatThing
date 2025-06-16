/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { env } from "@/env.js";
import { Upload } from "upload-js";

const upload = Upload({ apiKey: env.UPLOAD_IO_API_KEY });

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return new Response("File not found", { status: 400 });
  }

  const { fileUrl } = await upload.uploadFile(file);

  return new Response(JSON.stringify({ url: fileUrl }), {
    headers: { "content-type": "application/json" },
  });
}
