import axios from "axios";

const URL = "https://vgsinjzkuivzecmjhflq.supabase.co/rest/v1/usuarios";
const HEADERS = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2luanprdWl2emVjbWpoZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMzMsImV4cCI6MjA2MDMwNDEzM30.F5pDo9-Fy9RPIcnaUJrT3jXYPCnORmBKeYtKuBhYOwA",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnc2luanprdWl2emVjbWpoZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMzMsImV4cCI6MjA2MDMwNDEzM30.F5pDo9-Fy9RPIcnaUJrT3jXYPCnORmBKeYtKuBhYOwA",
  "Content-Type": "application/json"
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { usuario, nome, telefone, senha, valor_pago, data_expira } = req.body;
      await axios.post(URL, {
        usuario, nome, telefone, senha, valor_pago, data_expira
      }, {
        headers: { ...HEADERS, Prefer: "return=minimal" }
      });
      res.status(200).json({ status: "Usuário salvo" });
    } catch (e) {
      res.status(500).json({ erro: e.message });
    }
  } else if (req.method === "GET") {
    try {
      const { data } = await axios.get(URL + "?order=data_expira.desc", { headers: HEADERS });
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({ erro: e.message });
    }
  } else if (req.method === "PATCH") {
    try {
      const { usuario, nome, telefone, senha, data_expira } = req.body;
      await axios.patch(`${URL}?usuario=eq.${usuario}`, {
        nome, telefone, senha, data_expira
      }, {
        headers: { ...HEADERS, Prefer: "return=minimal" }
      });
      res.status(200).json({ status: "Usuário atualizado" });
    } catch (e) {
      res.status(500).json({ erro: e.message });
    }
  } else {
    res.status(405).end();
  }
}