import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma";

/**
 * Registers a new user
 * @param email User email (must be unique)
 * @param senha User password (will be hashed with bcrypt)
 * @param nome User name
 * @returns Created user object (without password) or error
 */
export const registerUser = async (
  email: string,
  senha: string,
  nome: string
) => {
  // Validations
  if (!email || !senha || !nome) {
    throw new Error("Email, senha e nome são obrigatórios");
  }

  if (senha.length < 4) {
    throw new Error("A senha deve ter no mínimo 4 caracteres");
  }

  // Check if email already exists
  const existingUser = await prisma.Usuario.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email já registrado");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Create user
  const usuario = await prisma.Usuario.create({
    data: {
      email,
      senha: hashedPassword,
      nome,
    },
    select: {
      id: true,
      email: true,
      nome: true,
      createdAt: true,
    },
  });

  return usuario;
};

/**
 * Authenticates a user
 * @param email User email
 * @param senha User password
 * @returns User object (without password) if credentials are valid
 */
export const loginUser = async (email: string, senha: string) => {
  // Validations
  if (!email || !senha) {
    throw new Error("Email e senha são obrigatórios");
  }

  // Find user by email
  const usuario = await prisma.Usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    throw new Error("Credenciais inválidas");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas");
  }

  // Return user without password
  const { senha: _, ...usuarioWithoutPassword } = usuario;
  return usuarioWithoutPassword;
};
