export async function register(phone: string, password: string) {
  const res = await fetch("http://localhost:4321/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password })
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json() as Promise<{ user_id: string }>;
}
