import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import { Login as LoginIcon, PersonAdd as PersonAddIcon } from "@mui/icons-material";
import { z } from "zod";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const emailSchema = z.email();
const passwordSchema = z.string().min(4);

function Login() {
  const navigate = useNavigate();
  const { setUsuario } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [msgSucesso, setMsgSucesso] = useState<string>("");
  const [msgErro, setMsgErro] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const validateEmail = (
    email: string
  ): { isValid: boolean; message: string } => {
    if (!email.trim()) {
      return {
        isValid: false,
        message: "Email é obrigatório",
      };
    }
    const resultado = emailSchema.safeParse(email);
    return {
      isValid: resultado.success,
      message: resultado.success ? "" : "Email inválido",
    };
  };

  const validatePassword = (
    password: string
  ): { isValid: boolean; message: string } => {
    if (!password.trim()) {
      return {
        isValid: false,
        message: "Senha é obrigatória",
      };
    }
    const resultado = passwordSchema.safeParse(password);
    return {
      isValid: resultado.success,
      message: resultado.success ? "" : "Senha com menos de 4 caracteres",
    };
  };

  const validateNome = (nome: string): { isValid: boolean; message: string } => {
    if (!nome.trim()) {
      return {
        isValid: false,
        message: "Nome é obrigatório",
      };
    }
    if (nome.trim().length < 3) {
      return {
        isValid: false,
        message: "Nome deve ter pelo menos 3 caracteres",
      };
    }
    return { isValid: true, message: "" };
  };

  const inputsValidos: boolean = isRegistering
    ? validateEmail(email).isValid &&
      validatePassword(password).isValid &&
      validateNome(nome).isValid
    : validateEmail(email).isValid && validatePassword(password).isValid;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url: string = "/api/auth/register";

    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        email: email,
        senha: password,
        nome: nome,
      });

      setMsgSucesso(`Conta criada com sucesso! Bem-vindo(a), ${response.data.nome}!`);
      setMsgErro("");
      setTimeout(() => {
        setIsRegistering(false);
        setEmail("");
        setPassword("");
        setNome("");
        setMsgSucesso("");
      }, 2000);
    } catch (error: any) {
      let mensagem = "Erro ao criar conta. Tente novamente.";
      if (error?.response?.data?.message) {
        mensagem = error.response.data.message;
      }
      setMsgErro(mensagem);
      setMsgSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url: string = "/api/login";

    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        email: email,
        senha: password,
      });

      const dadosSecretario = response.data;
      setUsuario(dadosSecretario);
      setMsgSucesso(`Bem vindo(a), ${dadosSecretario.nome}!`);
      setMsgErro("");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error: any) {
      let mensagem = "Erro ao realizar login. Verifique suas credenciais.";
      if (error?.response?.data?.message) {
        mensagem = error.response.data.message;
      }
      setMsgErro(mensagem);
      setMsgSucesso("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={2} sx={{ p: 3, width: 320 }}>
        <Box textAlign="center" mb={2}>
          {isRegistering ? (
            <>
              <PersonAddIcon sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
              <Typography variant="h6" component="h2" fontWeight={600} mb={1}>
                Criar Conta
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Crie sua conta para acessar o sistema
              </Typography>
            </>
          ) : (
            <>
              <LoginIcon sx={{ fontSize: 36, color: "primary.main", mb: 1 }} />
              <Typography variant="h6" component="h2" fontWeight={600} mb={1}>
                Bem-vindo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Faça login para acessar o sistema
              </Typography>
            </>
          )}
        </Box>
        {msgSucesso && <Alert>{msgSucesso}</Alert>}
        {msgErro && <Alert severity="error">{msgErro}</Alert>}
        <Box
          component="form"
          noValidate
          onSubmit={isRegistering ? handleRegister : handleLogin}
        >
          {isRegistering && (
            <TextField
              label="Nome completo"
              type="text"
              fullWidth
              margin="normal"
              value={nome}
              onChange={handleNomeChange}
              error={!validateNome(nome).isValid}
              helperText={validateNome(nome).message}
              disabled={isLoading}
            />
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={!validateEmail(email).isValid}
            helperText={validateEmail(email).message}
            disabled={isLoading}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            error={!validatePassword(password).isValid}
            helperText={validatePassword(password).message}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!inputsValidos || isLoading}
          >
            {isLoading ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} color="inherit" />
                Carregando...
              </Box>
            ) : isRegistering ? (
              "Criar Conta"
            ) : (
              "Entrar"
            )}
          </Button>
        </Box>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            {isRegistering ? "Já tem conta? " : "Não tem conta? "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setEmail("");
                setPassword("");
                setNome("");
                setMsgErro("");
                setMsgSucesso("");
              }}
              type="button"
              sx={{ cursor: "pointer" }}
            >
              {isRegistering ? "Faça login" : "Registre-se"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
