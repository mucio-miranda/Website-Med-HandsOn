import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export interface CourseFeature {
  icon?: string;
  text: string;
}

export interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  features: (CourseFeature | string)[];
  link: string;
}

export function CourseCard({ title, description, image, features = [], link }: CourseCardProps) {
  return (
    // O card inteiro é clicável: o link do botão se estende sobre ele (after:inset-0)
    // Hover: sobe 2px, borda escurece um tom e ganha sombra suave; foco por teclado: anel azul no botão
    <article className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col h-full transition-[transform,box-shadow,border-color] duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(15,28,46,0.10)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* Proporção da imagem de card recomendada no CMS (1000x540) */}
      <div className="relative aspect-[1000/540] w-full shrink-0 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[400ms] group-hover:duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2">
          {title}
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="space-y-2 mb-5">
            {features.slice(0, 3).map((feature, index) => {
              const isString = typeof feature === 'string';
              const text = isString ? feature : feature.text;
              const icon = !isString && feature.icon ? feature.icon : null;

              return (
                <li key={index} className="flex items-start gap-2">
                  {icon ? (
                    <img src={icon} alt="" className="w-4 h-4 mt-0.5 shrink-0 object-contain" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary-700" aria-hidden="true" />
                  )}
                  <span className="text-sm text-gray-700">{text}</span>
                </li>
              );
            })}
          </ul>
        )}

        <Link
          href={link}
          className="mt-auto w-full min-h-12 inline-flex items-center justify-center gap-2 bg-primary-700 text-white px-6 rounded-lg font-semibold transition-[background-color,transform] duration-150 group-hover:bg-primary-900 active:translate-y-px active:scale-[.985] outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 after:absolute after:inset-0 after:content-[''] motion-reduce:transition-none"
        >
          Conhecer o curso
          <span className="sr-only">: {title}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-[3px] motion-reduce:transition-none" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
