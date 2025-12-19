import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext()

const initial = { items: {} } // { [id]: {id,nombre,precio,imagen,qty} }

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'ADD': {
      const it = action.item
      const prev = state.items[it.id] || { ...it, qty: 0 }
      const items = { ...state.items, [it.id]: { ...prev, qty: prev.qty + 1 } }
      return { ...state, items }
    }
    case 'DECREMENT': {
      const it = state.items[action.id]
      if (!it) return state
      const qty = it.qty - 1
      const items = { ...state.items }
      if (qty <= 0) delete items[action.id]
      else items[action.id] = { ...it, qty }
      return { ...state, items }
    }
    case 'REMOVE': {
      const items = { ...state.items }
      delete items[action.id]
      return { ...state, items }
    }
    case 'CLEAR':
      return initial
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)

  // cargar desde localStorage
  useEffect(() => {
    const raw = localStorage.getItem('cart')
    if (raw) {
      try { dispatch({ type: 'SET', payload: JSON.parse(raw) }) } catch {}
    }
  }, [])

  // guardar en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const add = (item) => dispatch({ type: 'ADD', item })
  const decrement = (id) => dispatch({ type: 'DECREMENT', id })
  const remove = (id) => dispatch({ type: 'REMOVE', id })
  const clear = () => dispatch({ type: 'CLEAR' })

  // total de unidades para mostrar en el navbar
  const count = Object.values(state.items).reduce((a, it) => a + it.qty, 0)

  return (
    <CartContext.Provider value={{ state, add, decrement, remove, clear, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
