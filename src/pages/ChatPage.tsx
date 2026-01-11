import { useEffect, useRef, useState } from "react";

import { sendChatMessage } from "../api/chat";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Привет! Я готов помочь с вопросами по документам и задачам. Задай свой вопрос, и я постараюсь ответить.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isSending) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);
    setError(null);

    try {
      const response = await sendChatMessage(userMessage.content);
      const assistantMessage: Message = {
        role: "assistant",
        content: response.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Не удалось отправить сообщение";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Произошла ошибка при обращении к бэкенду.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-page d-flex flex-column">
      <div className="container py-4 flex-grow-1 d-flex flex-column">
        <div className="row justify-content-center flex-grow-1">
          <div className="col-lg-8 d-flex flex-column gap-3">
            <header className="d-flex flex-column gap-1">
              {/* <p className="text-uppercase text-muted small fw-semibold mb-0">Новый чат</p> */}
              <h1 className="h3 fw-bold mb-0">Chat with MyAI</h1>
            </header>

            <div className="card shadow-sm flex-grow-1 overflow-hidden chat-card">
              <div className="card-body bg-light d-flex flex-column p-0">
                <div className="chat-window flex-grow-1">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`d-flex ${
                        message.role === "user"
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`message-bubble ${
                          message.role === "user"
                            ? "message-user"
                            : "message-assistant"
                        }`}
                      >
                        <div className="small text-muted mb-1 fw-semibold">
                          {message.role === "user" ? "Вы" : "MyAI"}
                        </div>
                        <div className="message-text">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {error && (
                  <div
                    className="alert alert-danger rounded-0 mb-0"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleSend}
                  className="chat-input p-3 border-top bg-white"
                >
                  <div className="input-group">
                    <textarea
                      className="form-control"
                      placeholder="Write your question..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={1}
                      style={{ resize: "none" }}
                    />
                    <button
                      className="btn btn-primary d-flex align-items-center"
                      type="submit"
                      disabled={isSending}
                    >
                      {isSending ? "Sending..." : "Send"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
