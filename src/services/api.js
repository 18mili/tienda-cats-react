export async function getProductos() {
  const resp = await fetch('/data/productos.json')
  const base = await resp.json()
  // Si hay productos agregados desde la UI admin, únelos
  try {
    const demoRaw = localStorage.getItem('productos_demo')
    if (demoRaw) {
      const demo = JSON.parse(demoRaw)
      // prepend demo products so admin-added appear first
      return [...demo, ...base]
    }
  } catch (e) {
    // ignore parse errors
  }
  return base
}

export async function getProductoById(id) {
  const lista = await getProductos()
  return lista.find(p => String(p.id) === String(id)) || null
}

export async function getPosts() {
  const resp = await fetch('/data/posts.json')
  return await resp.json()
}
