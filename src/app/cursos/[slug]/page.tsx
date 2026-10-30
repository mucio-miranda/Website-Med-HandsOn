import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { CourseHero } from "@/components/cursos/CourseHero";
import { CourseFeatures } from "@/components/cursos/CourseFeatures";
import { CourseInstructor } from "@/components/cursos/CourseInstructor";
import { CourseContent } from "@/components/cursos/CourseContent";
import { CourseSponsors } from "@/components/cursos/CourseSponsors";
import { getCourseBySlug, getAllCourseSlugs } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Curso não encontrado",
    };
  }

  const ogImage = course.mainImage && urlFor(course.mainImage) ? urlFor(course.mainImage)?.width(1200).height(630).url() : undefined;
  
  const title = course.seoTitle || course.title;
  const description = course.seoDescription || course.shortDescription;

  return {
    title: `${title} | Med HandsOn`,
    description: description,
    keywords: course.keywords || [],
    alternates: {
      canonical: `https://medhandson.com.br/cursos/${slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: `https://medhandson.com.br/cursos/${slug}`,
      images: ogImage ? [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ogImage ? [ogImage] : [],
      creator: "@medhandson",
    },
  };
}

// Generate Static Params
export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs();
  return slugs.map((slug) => ({
    slug: slug.slug,
  }));
}

export const revalidate = 60;

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.seoTitle || course.title,
    "description": course.seoDescription || course.shortDescription,
    "provider": {
      "@type": "Organization",
      "name": "Med HandsOn",
      "sameAs": "https://medhandson.com.br"
    },
    "offers": course.price ? {
      "@type": "Offer",
      "price": course.price,
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "url": `https://medhandson.com.br/cursos/${course.slug}`
    } : undefined,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": course.location?.toLowerCase().includes("online") ? "online" : "onsite",
      "location": course.location,
      "startDate": course.startDate,
    },
    ...(course.keywords && course.keywords.length > 0 && { "keywords": course.keywords.join(', ') }),
    "inLanguage": "pt-BR",
  };

  const breadcrumbJsonLd = {
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
    }, {
      "@type": "ListItem",
      "position": 3,
      "name": course.title,
      "item": `https://medhandson.com.br/cursos/${course.slug}`
    }]
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      
      <div className="pt-[80px]">
        <CourseHero
          title={course.title}
          description={course.shortDescription}
          startDate={course.startDate || "A definir"}
          duration={course.duration || "A definir"}
          location={course.location || "Online / Presencial"}
          imageSrc={course.mainImage && urlFor(course.mainImage) ? urlFor(course.mainImage)?.url() || "" : undefined}
          mobileImageSrc={course.cardImage && urlFor(course.cardImage) ? urlFor(course.cardImage)?.url() || "" : (course.mainImage && urlFor(course.mainImage) ? urlFor(course.mainImage)?.url() || "" : undefined)}
          mobileBgColor="#091222"
          enrollmentLink={course.enrollmentLink}
        />
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* About Course (Full Description) */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre o Curso</h2>
                {course.fullDescription ? (
                   <PortableTextRenderer content={course.fullDescription} />
                ) : (
                   <p className="text-gray-600">Sem descrição detalhada disponível.</p>
                )}
              </section>

              {/* Content Modules */}
              {course.modules && <CourseContent modules={course.modules} />}

              {/* Instructor */}
              {course.instructor && (
                <CourseInstructor
                  name={course.instructor.name}
                  role={course.instructor.role}
                  description={course.instructor.bio}
                  imageSrc={course.instructor.image && urlFor(course.instructor.image) ? urlFor(course.instructor.image)?.url() || "" : undefined}
                />
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Features */}
                {course.features && course.features.length > 0 && (
                   <CourseFeatures features={course.features} />
                )}
                
                {/* Price Card */}
                <div className="mt-6 bg-primary-50 p-6 rounded-xl border border-primary-100">
                  <h4 className="font-bold text-primary-900 mb-2">Próxima Turma</h4>
                  <p className="text-primary-700 mb-4">{course.mentalTrigger || "Vagas limitadas."}</p>
                  
                  {(course.price !== undefined && course.price !== null) ? (
                    <div className="mb-6">
                      <p className="text-sm text-primary-600 font-medium uppercase tracking-wide">Investimento</p>
                      <p className="text-3xl font-bold text-primary-600">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price)}
                      </p>
                      {course.installments && (
                         <p className="text-sm text-primary-500">{course.installments}</p>
                      )}
                    </div>
                  ) : (
                     <div className="mb-6">
                       <p className="text-xl font-bold text-primary-600">Consulte valores</p>
                     </div>
                  )}

                  {course.enrollmentLink ? (
                    <a 
                      href={course.enrollmentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <button 
                        className="w-full text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary-600/20 cursor-pointer"
                        style={{
                          background: 'linear-gradient(180deg, #0085FF 0%, #00488A 100%)',
                        }}
                      >
                        Garantir Minha Vaga
                      </button>
                    </a>
                  ) : (
                    <button 
                      disabled
                      className="w-full text-gray-500 bg-gray-200 font-bold py-3 px-4 rounded-lg cursor-not-allowed"
                    >
                      Inscrições em breve
                    </button>
                  )}
                </div>

                {/* Sponsors */}
                {course.sponsors && course.sponsors.length > 0 && (
                  <CourseSponsors sponsors={course.sponsors} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
