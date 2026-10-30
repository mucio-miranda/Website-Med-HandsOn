import { PortableTextBlock } from '@portabletext/types'

export interface Author {
  name: string
  role: string
  bio?: string
  image?: any
}

export interface BlogPost {
  _id: string
  _updatedAt?: string
  title: string
  slug: string
  excerpt: string
  coverImage: any // Sanity image object
  category: string
  readTime: string
  publishedAt: string
  content: PortableTextBlock[]
  featured?: boolean
  // Campos de SEO
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
  author?: Author
}

export interface CourseModule {
  title: string
  topics: string[]
}

export interface CourseInstructor {
  name: string
  role: string
  bio: string
  image: any
}

export interface CourseSponsor {
  name: string
  logo: any
  url?: string
}

export interface Course {
  _id: string
  _updatedAt?: string
  title: string
  slug: string
  mainImage: any
  cardImage?: any // Nova imagem específica para o card
  shortDescription: string
  fullDescription: PortableTextBlock[]
  startDate?: string
  duration?: string
  location?: string
  price?: number
  installments?: string
  mentalTrigger?: string // Gatilho mental de urgência
  enrollmentLink?: string
  instructor?: CourseInstructor
  features?: string[]
  modules?: CourseModule[]
  sponsors?: CourseSponsor[]
  // Campos de SEO
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
}
