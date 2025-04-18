import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, status, value, created_at } = req.body;
    const usuario = req.query.usuario || "desconhecido";

    if (status === "paid") {
      try {
        await axios.post("https://vgsinjzkuivzecmjhflq.supabase.co/rest/v1/pagamentos", {
          id,
          valor: value / 100,
          status,
          data: created_at || new Date().toISOString(),
          usuario
        }, {
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2luanprdWl2emVjbWpoZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMzMsImV4cCI6MjA2MDMwNDEzM30.F5pDo9-Fy9RPIcnaUJrT3jXYPCnORmBKeYtKuBhYOwA",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2luanprdWl2emVjbWpoZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMzMsImV4cCI6MjA2MDMwNDEzM30.F5pDo9-Fy9RPIcnaUJrT3jXYPCnORmBKeYtKuBhYOwA",
            "Content-Type": "application/json",
            Prefer: "return=minimal"
          }
        });
        console.log("Pagamento salvo:", id, usuario);
      } catch (err) {
        console.error("Erro ao salvar:", err.response?.data || err.message);
      }
    }
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const { data } = await axios.get("https://vgsinjzkuivzecmjhflq.supabase.co/rest/v1/pagamentos?select=*", {
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2luanprdWl2emVjbWpoZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMzMsImV4cCI6MjA2MDMwNDEzM30.F5pDo9-Fy9RPIcnaUJrT3jXYPCnORmBKeYtKuBhYOwA",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2luanprdWl2emVjbWpoZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMzMsImV4cCI6MjA2MDMwNDEzM30.F5pDo9-Fy9RPIcnaUJrT3jXYPCnORmBKeYtKuBhYOwA"
        }
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).send("Erro ao buscar dados");
    }
  }

  return res.status(405).end();
}
