"use strict";
// src/controllers/jogadorController.ts
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJogador = exports.updateJogador = exports.getJogadorById = exports.getAllJogadores = exports.createJogador = exports.searchJogadores = void 0;
const jogadorService = __importStar(require("../services/jogadorService"));
const validation_1 = require("../schemas/validation");
// CONTROLLER: Lida com as requisições HTTP para Jogadores
const searchJogadores = async (req, res) => {
    try {
        const { posicao, subposicao } = validation_1.searchJogadorSchema.parse(req.query);
        const jogadores = await jogadorService.search(posicao, subposicao);
        return res.json(jogadores);
    }
    catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ message: error.message });
    }
};
exports.searchJogadores = searchJogadores;
const createJogador = async (req, res) => {
    try {
        const payload = validation_1.createJogadorSchema.parse(req.body);
        const novo = await jogadorService.create(payload);
        return res.status(201).json(novo);
    }
    catch (error) {
        if (error.errors)
            return res.status(400).json({ errors: error.errors });
        return res.status(500).json({ message: error.message });
    }
};
exports.createJogador = createJogador;
const getAllJogadores = async (req, res) => {
    try {
        const lista = await jogadorService.getAll();
        return res.json(lista);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getAllJogadores = getAllJogadores;
const getJogadorById = async (req, res) => {
    try {
        const { id } = validation_1.idParamSchema.parse(req.params);
        const jogador = await jogadorService.getById(id);
        if (!jogador)
            return res.status(404).json({ message: "Jogador não encontrado" });
        return res.json(jogador);
    }
    catch (error) {
        if (error.errors)
            return res.status(400).json({ errors: error.errors });
        return res.status(500).json({ message: error.message });
    }
};
exports.getJogadorById = getJogadorById;
const updateJogador = async (req, res) => {
    try {
        const { id } = validation_1.idParamSchema.parse(req.params);
        const payload = validation_1.updateJogadorSchema.parse(req.body);
        const atualizado = await jogadorService.update(id, payload);
        return res.json(atualizado);
    }
    catch (error) {
        if (error.errors)
            return res.status(400).json({ errors: error.errors });
        if (error.code === "P2025")
            return res.status(404).json({ message: "Jogador não encontrado" });
        return res.status(500).json({ message: error.message });
    }
};
exports.updateJogador = updateJogador;
const deleteJogador = async (req, res) => {
    try {
        const { id } = validation_1.idParamSchema.parse(req.params);
        await jogadorService.remove(id);
        return res.status(204).send();
    }
    catch (error) {
        if (error.code === "P2025")
            return res.status(404).json({ message: "Jogador não encontrado" });
        return res.status(500).json({ message: error.message });
    }
};
exports.deleteJogador = deleteJogador;
