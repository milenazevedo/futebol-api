<<<<<<< HEAD
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// MIDDLEWARE para validar o corpo (body) da requisição
export const validateBody = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Tenta validar os dados do body com o schema fornecido
      const validatedData = schema.parse(req.body);
      req.body = validatedData; // Substitui o body pelos dados validados
      next(); // Se válido, passa para o próximo middleware/controller
    } catch (error) {
      if (error instanceof ZodError) {
        // Se for erro de validação Zod, retorna erro 400 com detalhes
        return res.status(400).json({
          mensagem: "Dados de entrada inválidos",
          erros: error.issues.map((err) => ({
            campo: err.path.join("."), // Caminho do campo com erro
            mensagem: err.message,      // Mensagem de erro
          })),
        });
      }
      next(error); // Outros tipos de erro passam para o tratamento global
    }
  };
};

// MIDDLEWARE para validar parâmetros da URL (ex: /api/times/1)
export const validateParams = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedParams = schema.parse(req.params);
      (req as any).params = validatedParams; // Atualiza params com dados validados
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          mensagem: "Parâmetros inválidos",
          erros: error.issues.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

// MIDDLEWARE para validar query parameters (ex: ?page=1&limit=10)
export const validateQuery = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = schema.parse(req.query);
      (req as any).query = validatedQuery; // Atualiza query com dados validados
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          mensagem: "Parâmetros de consulta inválidos",
          erros: error.issues.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
=======
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

// MIDDLEWARE para validar o corpo (body) da requisição
export const validateBody = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Tenta validar os dados do body com o schema fornecido
      const validatedData = schema.parse(req.body);
      req.body = validatedData; // Substitui o body pelos dados validados
      next(); // Se válido, passa para o próximo middleware/controller
    } catch (error) {
      if (error instanceof ZodError) {
        // Se for erro de validação Zod, retorna erro 400 com detalhes
        return res.status(400).json({
          mensagem: "Dados de entrada inválidos",
          erros: error.issues.map((err) => ({
            campo: err.path.join("."), // Caminho do campo com erro
            mensagem: err.message,      // Mensagem de erro
          })),
        });
      }
      next(error); // Outros tipos de erro passam para o tratamento global
    }
  };
};

// MIDDLEWARE para validar parâmetros da URL (ex: /api/times/1)
export const validateParams = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedParams = schema.parse(req.params);
      (req as any).params = validatedParams; // Atualiza params com dados validados
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          mensagem: "Parâmetros inválidos",
          erros: error.issues.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
      }
      next(error);
    }
  };
};

// MIDDLEWARE para validar query parameters (ex: ?page=1&limit=10)
export const validateQuery = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedQuery = schema.parse(req.query);
      (req as any).query = validatedQuery; // Atualiza query com dados validados
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          mensagem: "Parâmetros de consulta inválidos",
          erros: error.issues.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
      }
      next(error);
    }
  };
};
>>>>>>> Parte-Milena
