import type React from "react";
import { useEffect, useState } from "react";

import type { DocumentPayload, UploadedDocument } from "../api/upload";
import { fetchDocuments, uploadDocument } from "../api/upload";

const initialForm: DocumentPayload = {
  request_id: "",
  document: "",
  name: "",
  company_id: "",
  priority: false,
};

type DocumentListProps = {
  title: string;
  documents: { name?: string }[];
  emptyMessage: string;
};

function DocumentList({ title, documents, emptyMessage }: DocumentListProps) {
  return (
    <div className="mb-4">
      <h6 className="text-uppercase text-muted small fw-semibold mb-2">
        {title}
      </h6>
      {documents.length === 0 ? (
        <p className="text-muted mb-0 small">{emptyMessage}</p>
      ) : (
        <ul className="list-group list-group-flush border rounded">
          {documents.map((doc, index) => (
            <li
              key={`${doc.name ?? "doc"}-${index}`}
              className="list-group-item py-3"
            >
              <div className="fw-semibold">
                Document name: {doc.name?.trim() || "Untitled"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function UploadPage() {
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<DocumentPayload>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDocuments();
      setDocuments(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load documents";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    const isCheckbox =
      target instanceof HTMLInputElement && target.type === "checkbox";

    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox ? target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await uploadDocument(form);
      await loadDocuments();
      setSuccessMessage("Document uploaded successfully");
      setForm(initialForm);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title mb-3">Documents</h3>
              {loading && (
                <p className="text-muted mb-0" aria-live="polite">
                  Loading documents...
                </p>
              )}
              {error && (
                <div
                  className="alert alert-danger"
                  role="alert"
                  aria-live="assertive"
                >
                  {error}
                </div>
              )}
              {!loading && !error && (
                <DocumentList
                  title="Uploaded documents"
                  documents={documents.map((doc) => ({
                    name: doc.DocumentName ?? doc.name,
                  }))}
                  emptyMessage="No documents uploaded yet."
                />
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title mb-3">Upload new document</h3>
              <form
                onSubmit={handleSubmit}
                className="needs-validation"
                noValidate
              >
                <div className="mb-3">
                  <label className="form-label" htmlFor="request_id">
                    Request ID
                  </label>
                  <input
                    className="form-control"
                    id="request_id"
                    name="request_id"
                    value={form.request_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="company_id">
                    Company ID
                  </label>
                  <input
                    className="form-control"
                    id="company_id"
                    name="company_id"
                    value={form.company_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="document">
                    Document Content
                  </label>
                  <textarea
                    className="form-control"
                    id="document"
                    name="document"
                    rows={4}
                    value={form.document}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="priority"
                    name="priority"
                    checked={form.priority}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="priority">
                    Priority
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Uploading..." : "Upload Document"}
                </button>
              </form>

              {successMessage && (
                <div
                  className="alert alert-success mt-3"
                  role="alert"
                  aria-live="polite"
                >
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
