import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  Paper,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Lock, Message, Person } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress'

const LoginPage = () => {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { login, isLoginIn } = useAuthStore()

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error('Please enter email.')
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Please enter valid email.')
    if (!formData.password.trim()) return toast.error('Please enter password.')
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters.')
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) login(formData)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: theme.palette.primary.light,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <Message color="primary" />
            </Box>
            <Typography variant="h5" fontWeight="bold">
              Sign in to your account
            </Typography>
            <Typography color="textSecondary" variant="body2">
              Get started with your free account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoginIn}
              sx={{ mt: 3 }}
              startIcon={isLoginIn ? <CircularProgress size={20} /> : null}
            >
              {isLoginIn ? 'Loading...' : 'Sign In'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default LoginPage
