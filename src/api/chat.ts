export type ChatMessageResponse = {
  reply: string;
};

export async function sendChatMessage(
  message: string
): Promise<ChatMessageResponse> {
  const accessToken = localStorage.getItem("access_token");

  const res = await fetch("http://localhost:4321/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({
      messages: [
        {
          content: message,
          role: "user",
        },
      ],
      rquid: crypto.randomUUID(),
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to send message");
  }

  return res.json();
}
