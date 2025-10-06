import express from "express";
import routes from "./routes";
import { setupSwagger } from "./swagger";

const app = express();
app.use(express.json());

// Swagger
setupSwagger(app);

// Prefixo /api em tudo
app.use("/api", routes);

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger em http://localhost:${PORT}/docs`);
});
