// app/articles/[slug]/page.js (مثال)
export async function generateMetadata({ params }) {
  const article = await fetchYourArticle(params.slug);
  return {
    title: article.title,
    description: article.seo_description,
    openGraph: {
      images: [article.imageUrl],
      title: article.title,
      description: article.seo_description,
    },
  };
}
export default function Page({ params }) { /* ... */ }
