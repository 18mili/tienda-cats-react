import { useEffect, useMemo, useState } from 'react'
import Filters from '../components/Filters'
import ProductsGrid from '../components/ProductsGrid'
import { getProductos } from '../services/api'
import { useCart } from '../context/CartContext.jsx'

export default function Catalogo() {
  const [lista, setLista] = useState([])
  const [q, setQ] = useState('')
  const [categoria, setCategoria] = useState('')
  const { add } = useCart()

  // Carga inicial (useEffect) y re-carga cuando admin añade productos
  useEffect(() => {
    const load = () => getProductos().then(setLista)
    load()
    window.addEventListener('productos_updated', load)
    return () => window.removeEventListener('productos_updated', load)
  }, [])

  // Filtro en memoria (useMemo)
  const filtrados = useMemo(() => {
    const qlow = q.toLowerCase()
    return lista.filter(p =>
      (!categoria || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(qlow)
    )
  }, [lista, q, categoria])

  return (
    <>
      <Filters q={q} setQ={setQ} categoria={categoria} setCategoria={setCategoria} />
      <ProductsGrid productos={filtrados} onAgregar={add} />
    </>
  )
}
