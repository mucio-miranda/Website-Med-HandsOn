import Image from "next/image";
import { urlFor } from "@/lib/sanity.client";
import { CourseSponsor } from "@/lib/sanity.types";

interface CourseSponsorsProps {
  sponsors: CourseSponsor[];
}

export function CourseSponsors({ sponsors }: CourseSponsorsProps) {
  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h4 className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-4">Patrocinadores</h4>
      <ul className="grid grid-cols-2 gap-4">
        {sponsors.map((sponsor, index) => {
          const logoUrl = sponsor.logo && urlFor(sponsor.logo) ? urlFor(sponsor.logo)?.width(400).url() : undefined;
          if (!logoUrl) return null;

          const logo = (
            <div className="relative h-16 w-full">
              <Image
                src={logoUrl}
                alt={sponsor.name}
                fill
                sizes="160px"
                className="object-contain"
              />
            </div>
          );

          return (
            <li key={index} className="flex items-center justify-center p-2">
              {sponsor.url ? (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full hover:opacity-80 transition-opacity"
                >
                  {logo}
                </a>
              ) : (
                logo
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
