"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateParams = exports.validateBody = void 0;
const zod_1 = require("zod");
// MIDDLEWARE para validar o corpo (body) da requisição
const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            // Tenta validar os dados do body com o schema fornecido
            const validatedData = schema.parse(req.body);
            req.body = validatedData; // Substitui o body pelos dados validados
            next(); // Se válido, passa para o próximo middleware/controller
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                // Se for erro de validação Zod, retorna erro 400 com detalhes
                return res.status(400).json({
                    message: "Dados de entrada inválidos",
                    errors: error.issues.map((err) => ({
                        campo: err.path.join("."), // Caminho do campo com erro
                        mensagem: err.message, // Mensagem de erro
                    })),
                });
            }
            next(error); // Outros tipos de erro passam para o tratamento global
        }
    };
};
exports.validateBody = validateBody;
// MIDDLEWARE para validar parâmetros da URL (ex: /api/times/1)
const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            const validatedParams = schema.parse(req.params);
            req.params = validatedParams; // Atualiza params com dados validados
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    message: "Parâmetros inválidos",
                    errors: error.issues.map((err) => ({
                        campo: err.path.join("."),
                        mensagem: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};
exports.validateParams = validateParams;
// MIDDLEWARE para validar query parameters (ex: ?page=1&limit=10)
const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            const validatedQuery = schema.parse(req.query);
            req.query = validatedQuery; // Atualiza query com dados validados
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    message: "Parâmetros de consulta inválidos",
                    errors: error.issues.map((err) => ({
                        campo: err.path.join("."),
                        mensagem: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};
exports.validateQuery = validateQuery;
