import { Table, Button } from 'react-bootstrap'
import { useCart } from '../context/CartContext.jsx'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext.jsx'

export default function Carrito() {
  const { state, add, decrement, remove, clear } = useCart()
  const items = Object.values(state.items)
  const total = items.reduce((acc, it) => acc + it.precio * it.qty, 0)
  const { user } = useAuth()

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
          <Button variant="primary" onClick={async () => {
            const order = {
              createdAt: new Date().toISOString(),
              buyer: user?.email || 'guest',
              items: state.items,
              total: items.reduce((acc, it) => acc + it.precio * it.qty, 0)
            }
            try {
              await addDoc(collection(db, 'orders'), order)
              clear()
              alert('Compra registrada. ¡Gracias!')
            } catch (e) {
              alert('Error al crear la orden: ' + (e.message || ''))
            }
          }}>Comprar</Button>
        </div>
      </div>
    </>
  )
}
