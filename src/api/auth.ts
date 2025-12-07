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

export async function login(phone: string, password: string) {
  const res = await fetch("http://localhost:4321/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password })
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || "Login failed");
  }

  return res.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_at: string;
  }>;
}