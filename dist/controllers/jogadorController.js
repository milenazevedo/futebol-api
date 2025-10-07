"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJogador = exports.updateJogador = exports.getJogadorById = exports.getAllJogadores = exports.createJogador = void 0;
const jogadorService = __importStar(require("../services/jogadorService"));
const validation_1 = require("../schemas/validation");
// CONTROLLER: Lida com as requisições HTTP para Jogadores
const createJogador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valida os dados do body usando Zod
        const payload = validation_1.createJogadorSchema.parse(req.body);
        // Chama o serviço para criar o jogador
        const novo = yield jogadorService.create(payload);
        // Retorna resposta 201 (Created) com o jogador criado
        return res.status(201).json(novo);
    }
    catch (error) {
        // Se for erro de validação Zod, retorna 400
        if (error.errors)
            return res.status(400).json({ errors: error.errors });
        // Outros erros retornam 500
        return res.status(500).json({ message: error.message });
    }
});
exports.createJogador = createJogador;
const getAllJogadores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca todos os jogadores
        const lista = yield jogadorService.getAll();
        // Retorna a lista de jogadores
        return res.json(lista);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllJogadores = getAllJogadores;
const getJogadorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valida o ID nos parâmetros da URL
        const { id } = validation_1.idParamSchema.parse(req.params);
        // Busca o jogador pelo ID
        const jogador = yield jogadorService.getById(id);
        // Se jogador não foi encontrado, retorna 404
        if (!jogador)
            return res.status(404).json({ message: "Jogador não encontrado" });
        // Retorna o jogador encontrado
        return res.json(jogador);
    }
    catch (error) {
        if (error.errors)
            return res.status(400).json({ errors: error.errors });
        return res.status(500).json({ message: error.message });
    }
});
exports.getJogadorById = getJogadorById;
const updateJogador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valida o ID e os dados do body
        const { id } = validation_1.idParamSchema.parse(req.params);
        const payload = validation_1.updateJogadorSchema.parse(req.body);
        // Chama o serviço para atualizar
        const atualizado = yield jogadorService.update(id, payload);
        return res.json(atualizado);
    }
    catch (error) {
        if (error.errors)
            return res.status(400).json({ errors: error.errors });
        // Erro específico do Prisma quando registro não existe
        if (error.code === "P2025")
            return res.status(404).json({ message: "Jogador não encontrado" });
        return res.status(500).json({ message: error.message });
    }
});
exports.updateJogador = updateJogador;
const deleteJogador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = validation_1.idParamSchema.parse(req.params);
        // Remove o jogador
        yield jogadorService.remove(id);
        // Retorna 204 (No Content) - sucesso sem conteúdo na resposta
        return res.status(204).send();
    }
    catch (error) {
        if (error.code === "P2025")
            return res.status(404).json({ message: "Jogador não encontrado" });
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteJogador = deleteJogador;
