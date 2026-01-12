import { FileText, Loader2, Upload } from "lucide-react";
import { useEffect, useState } from "react";

import type { DocumentPayload, UploadedDocument } from "../api/upload";
import { fetchDocuments, uploadDocument } from "../api/upload";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { cn } from "../lib/utils";

export function UploadPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [priority, setPriority] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await fetchDocuments();
      setDocuments(data);
    } catch {
      setError("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setFile(file);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const content = await file.text();

      const payload: DocumentPayload = {
        request_id: crypto.randomUUID(),
        company_id: "auto",
        name: file.name,
        document: content,
        priority,
      };

      await uploadDocument(payload);
      await loadDocuments();

      setFile(null);
      setPriority(false);
      setSuccess("Document uploaded successfully");
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Uploaded documents */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading && (
              <p className="text-sm text-muted-foreground">Loading…</p>
            )}

            {!loading && documents.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No documents uploaded yet.
              </p>
            )}

            {documents.map((doc, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-md border p-3"
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {doc.DocumentName ?? doc.name ?? "Untitled"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition",
                "hover:bg-muted"
              )}
            >
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm font-medium">
                {file ? file.name : "Drop file here or click to select"}
              </span>
              <span className="text-xs text-muted-foreground">
                Any text-based document
              </span>

              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleFileSelect(e.target.files[0])
                }
              />
            </label>

            <div className="flex items-center justify-between rounded-md border p-3">
              <span className="text-sm">Priority</span>
              <Switch checked={priority} onCheckedChange={setPriority} />
            </div>

            <Button
              className="w-full"
              disabled={!file || uploading}
              onClick={handleUpload}
            >
              {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload
            </Button>

            {error && <p className="text-sm text-destructive">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
