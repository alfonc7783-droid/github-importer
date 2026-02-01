import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STORAGE_KEY = "rsvp-admin-token";

const AdminExport = () => {
  const [token, setToken] = useState("");
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const isReady = useMemo(() => token.trim().length > 0, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEY);
    if (storedToken) {
      setToken(storedToken);
      setRemember(true);
    }
  }, []);

  useEffect(() => {
    if (remember) {
      if (token.trim()) {
        localStorage.setItem(STORAGE_KEY, token.trim());
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [remember, token]);

  const handleDownload = async () => {
    setError("");
    setStatus("");

    if (!token.trim()) {
      setError("Введите токен для экспорта.");
      return;
    }

    try {
      const response = await fetch("/api/rsvp/export", {
        headers: {
          // nginx BasicAuth consumes Authorization, so export token is sent via custom header.
          "X-Export-Token": token.trim(),
        },
      });

      if (!response.ok) {
        let message = `HTTP ${response.status}`;
        try {
          const data = await response.json();
          message = data?.error || data?.message || message;
        } catch {
          // ignore JSON parsing errors
        }
        setError(`Ошибка экспорта: ${message}`);
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "rsvp-export.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus("Экспорт скачан.");
    } catch (fetchError) {
      const message = fetchError instanceof Error ? fetchError.message : "Не удалось скачать экспорт.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-16">
      <div className="mx-auto w-full max-w-lg">
        <Card className="border-primary/10 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Экспорт RSVP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admin-token">Токен доступа</Label>
              <Input
                id="admin-token"
                type="password"
                placeholder="Bearer token"
                value={token}
                onChange={(event) => setToken(event.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember-token"
                checked={remember}
                onCheckedChange={(checked) => setRemember(Boolean(checked))}
              />
              <Label htmlFor="remember-token" className="text-sm text-muted-foreground">
                Запомнить токен на этом устройстве
              </Label>
            </div>

            <Button type="button" className="w-full" disabled={!isReady} onClick={handleDownload}>
              Скачать export CSV
            </Button>

            {(status || error) && (
              <div className="rounded-md border border-border bg-background/60 px-4 py-3 text-sm">
                {error ? (
                  <p className="text-destructive">{error}</p>
                ) : (
                  <p className="text-foreground">{status}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminExport;
