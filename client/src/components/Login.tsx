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
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { styled } from "@mui/material/styles";
import { API_BASE } from "../config/api";

// ===================================================================
// ESTILIZAÇÃO NEON (A única parte nova)
// ===================================================================
const NEON_GREEN = '#39FF14';

// Container principal que centraliza e faz a caixa "flutuar"
const FloatingContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

// A caixa de login/registro com efeito de vidro e neon
const LoginBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  width: '100%',
  maxWidth: '420px',
  background: 'rgba(18, 18, 18, 0.85)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${NEON_GREEN}`,
  boxShadow: `
    0 0 15px ${NEON_GREEN},
    0 0 25px ${NEON_GREEN},
    inset 0 0 15px rgba(57, 255, 20, 0.1)
  `,
  textAlign: 'center',
}));

const NeonTypography = styled(Typography)({
  color: NEON_GREEN,
  textShadow: `0 0 10px ${NEON_GREEN}`,
});

const NeonIcon = styled('span')({
  color: NEON_GREEN,
  filter: `drop-shadow(0 0 5px ${NEON_GREEN})`,
});

const NeonAlert = styled(Alert)({
  marginBottom: '16px',
  '&.MuiAlert-standardSuccess': {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: '#4caf50',
    border: '1px solid #4caf50',
  },
  '&.MuiAlert-standardError': {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    color: '#f44336',
    border: '1px solid #f44336',
  },
});

const NeonTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: NEON_GREEN,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: NEON_GREEN,
  },
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: '#444',
      borderRadius: '8px',
    },
    '&:hover fieldset': {
      borderColor: NEON_GREEN,
    },
    '&.Mui-focused fieldset': {
      borderColor: NEON_GREEN,
      boxShadow: `0 0 8px ${NEON_GREEN}`,
    },
    '&.Mui-error fieldset': {
      borderColor: '#f44336',
      boxShadow: `0 0 8px #f44336`,
    }
  },
  '& .MuiInputLabel-root': {
    color: '#aaa',
    '&.Mui-error': {
      color: '#f44336',
    }
  },
  '& .MuiFormHelperText-root': {
      color: '#f44336',
  }
});

const NeonButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `2px solid ${NEON_GREEN}`,
  color: NEON_GREEN,
  fontWeight: 'bold',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  boxShadow: `0 0 10px ${NEON_GREEN}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: NEON_GREEN,
    color: '#0a0a0a',
    boxShadow: `
      0 0 20px ${NEON_GREEN},
      0 0 30px ${NEON_GREEN}
    `,
    transform: 'translateY(-2px) scale(1.02)',
  },
  '&:disabled': {
    borderColor: '#555',
    color: '#555',
    boxShadow: 'none',
  }
}));

const NeonLink = styled(Link)({
  color: NEON_GREEN,
  fontWeight: 'bold',
  '&:hover': {
      color: '#00ff88',
      textShadow: `0 0 8px #00ff88`,
  }
});

const NeonCircularProgress = styled(CircularProgress)({
    color: NEON_GREEN,
});

// ===================================================================
// SUA LÓGICA ORIGINAL (Nenhuma alteração aqui)
// ===================================================================
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

  const validateEmail = (email: string): { isValid: boolean; message: string } => {
    if (!email.trim()) return { isValid: false, message: "Email é obrigatório" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return { isValid: emailRegex.test(email), message: emailRegex.test(email) ? "" : "Email inválido" };
  };

  const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (!password.trim()) return { isValid: false, message: "Senha é obrigatória" };
    return { isValid: password.length >= 4, message: password.length >= 4 ? "" : "Senha com menos de 4 caracteres" };
  };

  const validateNome = (nome: string): { isValid: boolean; message: string } => {
    if (!nome.trim()) return { isValid: false, message: "Nome é obrigatório" };
    if (nome.trim().length < 3) return { isValid: false, message: "Nome deve ter pelo menos 3 caracteres" };
    return { isValid: true, message: "" };
  };

  const inputsValidos: boolean = isRegistering
    ? validateEmail(email).isValid && validatePassword(password).isValid && validateNome(nome).isValid
    : validateEmail(email).isValid && validatePassword(password).isValid;

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => setNome(event.target.value);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url: string = `${API_BASE}/auth/register`;
    setIsLoading(true);
    try {
      const response = await axios.post(url, { email: email, senha: password, nome: nome });
      setMsgSucesso(`Conta criada com sucesso! Bem-vindo(a), ${response.data.nome}!`);
      setMsgErro("");
      setTimeout(() => { setIsRegistering(false); setEmail(""); setPassword(""); setNome(""); setMsgSucesso(""); }, 2000);
    } catch (error: any) {
      let mensagem = "Erro ao criar conta. Tente novamente.";
      if (error?.response?.data?.message) mensagem = error.response.data.message;
      setMsgErro(mensagem); setMsgSucesso("");
    } finally { setIsLoading(false); }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url: string = `${API_BASE}/login`;
    setIsLoading(true);
    try {
      const response = await axios.post(url, { email: email, senha: password });
      const dadosSecretario = response.data;
      setUsuario(dadosSecretario);
      setMsgSucesso(`Bem vindo(a), ${dadosSecretario.nome}!`);
      setMsgErro("");
      setTimeout(() => { navigate("/home"); }, 1000);
    } catch (error: any) {
      let mensagem = "Erro ao realizar login. Verifique suas credenciais.";
      if (error?.response?.data?.message) mensagem = error.response.data.message;
      setMsgErro(mensagem); setMsgSucesso("");
    } finally { setIsLoading(false); }
  };

  // ===================================================================
  // RETURN COM OS COMPONENTES ESTILIZADOS
  // ===================================================================
  return (
    <FloatingContainer>
      <LoginBox elevation={0}>
        <Box textAlign="center" mb={2}>
          {isRegistering ? (
            <>
              <NeonIcon><PersonAddIcon sx={{ fontSize: 36, mb: 1 }} /></NeonIcon>
              <NeonTypography variant="h5" component="h2" fontWeight={600} mb={1}>
                Criar Conta
              </NeonTypography>
              <Typography variant="body2" color="text.secondary">
                Crie sua conta para acessar o sistema
              </Typography>
            </>
          ) : (
            <>
              <NeonIcon><LoginIcon sx={{ fontSize: 36, mb: 1 }} /></NeonIcon>
              <NeonTypography variant="h5" component="h2" fontWeight={600} mb={1}>
                Bem-vindo
              </NeonTypography>
              <Typography variant="body2" color="text.secondary">
                Faça login para acessar o sistema
              </Typography>
            </>
          )}
        </Box>
        {msgSucesso && <NeonAlert severity="success">{msgSucesso}</NeonAlert>}
        {msgErro && <NeonAlert severity="error">{msgErro}</NeonAlert>}
        <Box component="form" noValidate onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <NeonTextField
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
          <NeonTextField
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
          <NeonTextField
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
          <NeonButton
            type="submit"
            variant="outlined"
            fullWidth
            disabled={!inputsValidos || isLoading}
          >
            {isLoading ? (
              <Box display="flex" alignItems="center" gap={1}>
                <NeonCircularProgress size={20} />
                Carregando...
              </Box>
            ) : isRegistering ? (
              "Criar Conta"
            ) : (
              "Entrar"
            )}
          </NeonButton>
        </Box>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            {isRegistering ? "Já tem conta? " : "Não tem conta? "}
            <NeonLink
              component="button"
              variant="body2"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setEmail(""); setPassword(""); setNome(""); setMsgErro(""); setMsgSucesso("");
              }}
              type="button"
            >
              {isRegistering ? "Faça login" : "Registre-se"}
            </NeonLink>
          </Typography>
        </Box>
      </LoginBox>
    </FloatingContainer>
  );
}

export default Login;