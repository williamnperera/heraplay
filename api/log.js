import axios from "axios";

export default async function handler(req, res) {
  const usuario = req.query.usuario || "desconhecido";
  const payload = req.body;

  try {
    await axios.post("https://vgsinjzkuivzecmjhflq.supabase.co/rest/v1/pagamentos", {
      id: payload.id || "sem-id-" + Math.random(),
      valor: payload.value ? payload.value / 100 : 0,
      status: payload.status || "sem-status",
      data: payload.created_at || new Date().toISOString(),
      usuario: usuario + "-log"
    }, {
      headers: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2luanprdWl2emVjbWpoZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMzMsImV4cCI6MjA2MDMwNDEzM30.F5pDo9-Fy9RPIcnaUJrT3jXYPCnORmBKeYtKuBhYOwA",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2luanprdWl2emVjbWpoZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMzMsImV4cCI6MjA2MDMwNDEzM30.F5pDo9-Fy9RPIcnaUJrT3jXYPCnORmBKeYtKuBhYOwA",
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      }
    });

    return res.status(200).json({ status: "log salvo" });
  } catch (err) {
    console.error("Erro ao salvar log:", err.response?.data || err.message);
    return res.status(500).json({ erro: "erro ao salvar log" });
  }
}