import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', pass: '' })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    // Demo simple: valida no vacíos
    if (!form.email || !form.pass) {
      setMsg('Completa email y contraseña.')
      return
    }
    // Cuenta admin fija (demo)
    if (form.email === 'admin@tiendacats.com' && form.pass === '1234') {
      localStorage.setItem('auth_demo', JSON.stringify({ email: form.email, isAdmin: true }))
      navigate('/admin')
      return
    }
    // Comprueba si hay usuarios registrados en demo (localStorage)
    const users = JSON.parse(localStorage.getItem('users_demo') || '[]')
    if (!users || users.length === 0) {
      setMsg('No existen usuarios. Crea una cuenta primero.')
      return
    }
    const found = users.find(u => u.email === form.email)
    if (!found) {
      setMsg('No existe ese usuario.')
      return
    }

    // Guardado demo (no real): marca sesión en localStorage
    localStorage.setItem('auth_demo', JSON.stringify({ email: form.email }))
    navigate('/')
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
