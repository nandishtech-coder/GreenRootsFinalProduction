export async function checkBackendHealth(): Promise<boolean> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 7000);

  try {
    const response = await fetch("/api/health", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json().catch(() => ({}))) as { ok?: boolean };
    return payload.ok === true;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
