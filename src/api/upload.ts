export type DocumentPayload = {
  id: string;
  request_id: string;
  document: string;
  name: string;
  company_id: string;
  priority: boolean;
};

export type UploadedDocument = DocumentPayload & {
  created_at?: string;
};

export async function fetchDocuments(): Promise<UploadedDocument[]> {
  const response = await fetch("http://localhost:4321/upload");

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  return response.json();
}

export async function uploadDocument(payload: DocumentPayload) {
  const response = await fetch("http://localhost:4321/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to upload document");
  }

  return response.json() as Promise<{ message?: string }>;
}