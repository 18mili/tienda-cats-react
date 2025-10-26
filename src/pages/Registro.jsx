import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', pass: '' })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.pass) {
      setMsg('Completa todos los campos.')
      return
    }
    // Demo: guarda en localStorage y redirige a login
    const users = JSON.parse(localStorage.getItem('users_demo') || '[]')
    users.push({ nombre: form.nombre, email: form.email })
    localStorage.setItem('users_demo', JSON.stringify(users))
    navigate('/login')
  }

  return (
    <div className="container-xxl" style={{ maxWidth: 520 }}>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h3 className="mb-3">Crear cuenta</h3>
          {msg && <div className="alert alert-warning py-2">{msg}</div>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={form.nombre} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="pass" value={form.pass} onChange={onChange} required />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Registrarme</Button>
          </Form>
          <div className="text-center mt-3">
            <small>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></small>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
