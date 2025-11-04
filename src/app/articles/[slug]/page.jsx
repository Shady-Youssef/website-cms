// app/articles/[slug]/page.js
import Image from 'next/image';

// 1️⃣ دي اللي بتجيب الداتا
async function getArticle(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data.data[0];
}

// 2️⃣ هنا بنعمل الميتاداتا (بدل Head)
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  const attrs = article?.attributes || {};

  return {
    title: `${attrs.title} | موقعك`,
    description: attrs.seo_description || attrs.description,
    openGraph: {
      title: attrs.title,
      description: attrs.seo_description,
      images: [
        {
          url:
            process.env.NEXT_PUBLIC_STRAPI_URL +
            (attrs.image?.data?.attributes?.url || ''),
        },
      ],
    },
  };
}

// 3️⃣ صفحة المقال
export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return <p>Article not found</p>;

  const attrs = article.attributes;
  const imageUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL +
    (attrs.image?.data?.attributes?.url || '');

  return (
    <article style={{ padding: '20px' }}>
      <h1>{attrs.title}</h1>
      <Image src={imageUrl} width={600} height={400} alt={attrs.title} />
      <p>{attrs.description}</p>
    </article>
  );
}
