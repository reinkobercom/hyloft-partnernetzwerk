import Link from "next/link";
import { datumDE, type Artikel } from "@/lib/blog";

export default function BlogCard({ a }: { a: Artikel }) {
  return (
    <Link href={`/blog/${a.slug}`} className="group flex flex-col">
      <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-stone">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.bild} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <p className="mt-5 text-xs text-muted">
        <span className="font-semibold text-forest">{a.kategorie}</span> · {datumDE(a.datum)} · {a.lesezeit} Min.
      </p>
      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink group-hover:text-forest">{a.titel}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{a.teaser}</p>
    </Link>
  );
}
