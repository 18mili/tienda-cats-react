import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

export async function getProductos() {
  try {
    // Traer productos desde la colección principal 'productos' en Firestore
    const col = collection(db, 'productos')
    const snap = await getDocs(col)
    const fbProductos = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    
    // Traer también productos creados por admin desde 'productos_demo'
    const colDemo = collection(db, 'productos_demo')
    const snapDemo = await getDocs(colDemo)
    const demo = snapDemo.docs.map(d => ({ id: d.id, ...d.data() }))
    
    // Combinar: admin products primero, luego productos principales
    return [...demo, ...fbProductos]
  } catch (e) {
    console.error('Error fetching productos:', e)
    // Fallback al JSON local si falla Firestore
    try {
      const resp = await fetch('/data/productos.json')
      return await resp.json()
    } catch (fallbackErr) {
      return []
    }
  }
}

export async function getProductoById(id) {
  const lista = await getProductos()
  return lista.find(p => String(p.id) === String(id)) || null
}

export async function getPosts() {
  const resp = await fetch('/data/posts.json')
  return await resp.json()
}
