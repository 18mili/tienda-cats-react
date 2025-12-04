import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [form, setForm] = useState({ email: '', pass: '' })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    // Demo simple: valida no vacíos
    if (!form.email || !form.pass) {
      setMsg('Completa email y contraseña.')
      return
    }
    // Intentar login con Firebase
    login(form.email, form.pass).then(res => {
      if (res?.isAdmin) navigate('/admin')
      else navigate('/')
    }).catch(err => {
      setMsg('Error al iniciar sesión: ' + (err.message || err.code || ''))
    })
  }

  return (
    <div className="container-xxl" style={{ maxWidth: 480 }}>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h3 className="mb-3">Iniciar sesión</h3>
          {msg && <div className="alert alert-warning py-2">{msg}</div>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email" name="email" value={form.email} onChange={onChange}
                placeholder="tu@email.com" required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password" name="pass" value={form.pass} onChange={onChange}
                placeholder="••••••••" required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Entrar</Button>
          </Form>
          <div className="text-center mt-3">
            <small>¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link></small>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
