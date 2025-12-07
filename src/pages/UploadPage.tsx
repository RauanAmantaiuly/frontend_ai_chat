import { useEffect, useState } from "react";
import type { DocumentPayload, UploadedDocument } from "../api/upload";
import { fetchDocuments, uploadDocument } from "../api/upload";

type ProvidedDocument = {
  UserID: string;
  DocumentID: string;
  DocumentName: string;
};

const providedDocuments: ProvidedDocument[] = [
  {
    UserID: "84013e88-075d-4abe-8b3f-e6d7b0eead67",
    DocumentID: "5de15f7c-633c-4d88-a023-498c856603ce",
    DocumentName: "document name"
  },
  {
    UserID: "84013e88-075d-4abe-8b3f-e6d7b0eead67",
    DocumentID: "09a8202a-3d0b-44a9-81de-0d6ecc0ed9e0",
    DocumentName: "openCV script"
  }
];

const initialForm: DocumentPayload = {
  id: "",
  request_id: "",
  document: "",
  name: "",
  company_id: "",
  priority: false
};

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
      const message = err instanceof Error ? err.message : "Failed to load documents";
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
      [name]: isCheckbox ? target.checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await uploadDocument(form);
      setSuccessMessage("Document uploaded successfully");
      setForm(initialForm);
      loadDocuments();
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
              <h3 className="card-title mb-3">Uploaded Documents</h3>
              <div className="alert alert-info">
                <h6 className="mb-3">Provided Document Details</h6>
                <p className="mb-3">The following records are available:</p>
                <div className="list-group">
                  {providedDocuments.map((doc) => (
                    <div
                      key={doc.DocumentID}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold">{doc.DocumentName}</div>
                          <div className="small text-muted">Document ID: {doc.DocumentID}</div>
                        </div>
                        <span className="badge text-bg-light text-dark">User: {doc.UserID}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {loading && <p className="text-muted">Loading documents...</p>}
              {error && <div className="alert alert-danger">{error}</div>}
              {!loading && !error && documents.length === 0 && (
                <p className="text-muted">No documents uploaded yet.</p>
              )}
              <div className="list-group">
                {documents.map((doc) => (
                  <div
                    key={doc.id + doc.request_id}
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">{doc.name || "Untitled"}</h5>
                        <small className="text-muted">Company: {doc.company_id}</small>
                      </div>
                      {doc.priority && <span className="badge text-bg-primary">Priority</span>}
                    </div>
                    <p className="mb-1 small text-break">{doc.document}</p>
                    <small className="text-muted">Request ID: {doc.request_id}</small>
                    {doc.created_at && (
                      <div className="small text-muted">Uploaded: {doc.created_at}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h3 className="card-title mb-3">Upload New Document</h3>
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                  <label className="form-label" htmlFor="id">
                    Document ID
                  </label>
                  <input
                    className="form-control"
                    id="id"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    required
                  />
                </div>

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

                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Uploading..." : "Upload Document"}
                </button>
              </form>

              {successMessage && (
                <div className="alert alert-success mt-3">{successMessage}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
