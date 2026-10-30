import { groq } from 'next-sanity'
import { client } from './sanity.client'
import { Course, BlogPost } from './sanity.types'

// Query para buscar todos os posts
export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      _updatedAt,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      category,
      readTime,
      publishedAt,
      featured,
      seoTitle,
      seoDescription,
      keywords,
      author
    }`
  )
}

// Query para buscar um post específico pelo slug
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      _updatedAt,
      title,
      "slug": slug.current,
      excerpt,
      coverImage,
      category,
      readTime,
      publishedAt,
      content,
      featured,
      seoTitle,
      seoDescription,
      keywords,
      author
    }`,
    { slug }
  )
}

// Query para buscar slugs de todos os posts (para generateStaticParams)
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    groq`*[_type == "post"]{ "slug": slug.current }`
  )
}

// --- CURSOS ---

// Query para buscar todos os cursos (para a listagem)
export async function getAllCourses(): Promise<Course[]> {
  return client.fetch(
    groq`*[_type == "course"] | order(_createdAt desc) {
      _id,
      _updatedAt,
      title,
      "slug": slug.current,
      mainImage,
      cardImage,
      shortDescription,
      startDate,
      duration,
      location,
      price,
      installments,
      mentalTrigger,
      features,
      instructor { name },
      seoTitle,
      seoDescription,
      keywords
    }`
  )
}

// Query para buscar um curso específico pelo slug
export async function getCourseBySlug(slug: string): Promise<Course> {
  return client.fetch(
    groq`*[_type == "course" && slug.current == $slug][0] {
      _id,
      _updatedAt,
      title,
      "slug": slug.current,
      mainImage,
      cardImage,
      shortDescription,
      fullDescription,
      startDate,
      duration,
      location,
      price,
      installments,
      mentalTrigger,
      enrollmentLink,
      instructor,
      features,
      modules,
      sponsors,
      seoTitle,
      seoDescription,
      keywords
    }`,
    { slug }
  )
}

// Query para buscar slugs de todos os cursos
export async function getAllCourseSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    groq`*[_type == "course"]{ "slug": slug.current }`
  )
}
