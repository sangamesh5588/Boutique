export interface Product {
  id: string
  name: string
  category: string
  price: number
  currency: string
  description: string
  images: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  madeToOrder: boolean
  shipTime: string
  fabric: string
  fit: string
  details: string
}

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export interface AppointmentForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  location: string
  notes: string
}

export type FilterCategory = 'All' | 'Ball Gown' | 'Mermaid' | 'A-Line' | 'Sheath' | 'Boho'

export type PageRoute = '/' | '/collections' | '/product/:id' | '/lookbook' | '/atelier' | '/book-fitting'
