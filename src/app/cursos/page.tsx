import { Header } from "@/components/layout/Header";
import { CourseCard } from "@/components/cursos/CourseCard";
import { Metadata } from "next";
import { getAllCourses } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";

export const metadata: Metadata = {
  title: "Cursos e Especializações Médicas | Med HandsOn",
  description: "Confira nossos cursos de especialização em medicina e cirurgia. Aprenda com prática HandsOn em procedimentos reais.",
  keywords: [
    "cursos médicos",
    "especialização médica",
    "curso cirurgia plástica",
    "fellowship medicina",
    "rinoplastia ultrassônica",
    "prática cirúrgica",
    "hands on medicina",
    "curso rinoplastia",
    "formação médica",
  ],
  alternates: {
    canonical: "https://medhandson.com.br/cursos",
  },
  openGraph: {
    title: "Cursos e Especializações Médicas | Med HandsOn",
    description: "Confira nossos cursos de especialização em medicina e cirurgia. Aprenda com prática HandsOn em procedimentos reais.",
    url: "https://medhandson.com.br/cursos",
    type: "website",
  },
};

export const revalidate = 60; // Revalidar a cada 60 segundos

const staticCourses: any[] = [];

export default async function CursosPage() {
  const sanityCourses = await getAllCourses();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://medhandson.com.br"
    }, {
      "@type": "ListItem",
      "position": 2,
      "name": "Cursos",
      "item": "https://medhandson.com.br/cursos"
    }]
  };

  const dynamicCourses = sanityCourses.map(course => {
    // Lógica para definir a imagem do card:
    // 1. Tenta usar cardImage
    // 2. Se não existir, tenta usar mainImage
    // 3. Se não existir, usa placeholder
    let imageUrl = "/images/hero-img.png";
    
    if (course.cardImage && urlFor(course.cardImage)) {
      imageUrl = urlFor(course.cardImage)?.url() || "";
    } else if (course.mainImage && urlFor(course.mainImage)) {
      imageUrl = urlFor(course.mainImage)?.url() || "";
    }

    return {
      id: course._id,
      title: course.title,
      description: course.shortDescription,
      image: imageUrl,
      link: `/cursos/${course.slug}`,
      features: course.features || []
    };
  });

  const courses = [...staticCourses, ...dynamicCourses];

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      <div className="pt-[120px] pb-20 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Cursos
          </h1>
          <p className="text-base md:text-xl text-gray-600 leading-relaxed">
            Formações completas com foco em prática real para você dominar novas técnicas cirúrgicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
              features={course.features}
              link={course.link}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
