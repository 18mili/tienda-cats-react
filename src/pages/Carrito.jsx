import { Table, Button } from 'react-bootstrap'
import { useCart } from '../context/CartContext.jsx'

export default function Carrito() {
  const { state, add, decrement, remove, clear } = useCart()
  const items = Object.values(state.items)
  const total = items.reduce((acc, it) => acc + it.precio * it.qty, 0)

  if (items.length === 0) {
    return (
      <>
        <h2>Tu carrito está vacío</h2>
        <p>Ve al catálogo y agrega productos.</p>
      </>
    )
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th style={{width: 180}}>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}>
              <td>{it.nombre}</td>
              <td>${it.precio.toLocaleString()}</td>
              <td>
                <div className="d-flex gap-2 align-items-center">
                  <Button size="sm" variant="outline-secondary" onClick={() => decrement(it.id)}>-</Button>
                  <span>{it.qty}</span>
                  <Button size="sm" variant="outline-secondary" onClick={() => add(it)}>+</Button>
                </div>
              </td>
              <td>${(it.precio * it.qty).toLocaleString()}</td>
              <td>
                <Button size="sm" variant="outline-danger" onClick={() => remove(it.id)}>
                  Quitar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <h4>Total: ${total.toLocaleString()}</h4>
        <div className="d-flex gap-2">
          <Button variant="outline-danger" onClick={clear}>Vaciar carrito</Button>
          <Button variant="primary" onClick={() => {
            // Crear orden demo y guardarla en localStorage
            const order = {
              id: Date.now(),
              createdAt: new Date().toISOString(),
              buyer: JSON.parse(localStorage.getItem('auth_demo') || 'null')?.email || 'guest',
              items: state.items,
              total: items.reduce((acc, it) => acc + it.precio * it.qty, 0)
            }
            const raw = localStorage.getItem('orders_demo')
            const arr = raw ? JSON.parse(raw) : []
            arr.unshift(order)
            localStorage.setItem('orders_demo', JSON.stringify(arr))
            try { window.dispatchEvent(new Event('orders_updated')) } catch (e) {}
            clear()
            alert('Compra registrada. ¡Gracias! (demo)')
          }}>Comprar</Button>
        </div>
      </div>
    </>
  )
}
