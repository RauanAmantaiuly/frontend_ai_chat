export type DocumentPayload = {
  request_id: string;
  document: string;
  name: string;
  company_id: string;
  priority: boolean;
};

export type UploadedDocument = Partial<DocumentPayload> & {
  DocumentName?: string;
  DocumentID?: string;
  UserID?: string;
  created_at?: string;
};

export async function fetchDocuments(): Promise<UploadedDocument[]> {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Missing access token. Please log in again.");
  }

  const response = await fetch("http://localhost:4321/upload", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  return response.json();
}

export async function uploadDocument(payload: DocumentPayload) {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch("http://localhost:4321/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to upload document");
  }

  return response.json() as Promise<{ message?: string }>;
}
