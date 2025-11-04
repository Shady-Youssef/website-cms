// app/route/page.jsx

// دالة fetch بتجيب المقال من Strapi بناءً على slug
async function fetchYourArticle(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }

    const json = await res.json();

    // بيرجع أول مقال مطابق للـ slug
    return json.data[0]?.attributes || {};
  } catch (error) {
    console.error("Error fetching article:", error);
    return {};
  }
}

// الميتاداتا الخاصة بكل صفحة مقالة (SEO)
export async function generateMetadata({ params }) {
  const article = await fetchYourArticle(params.slug);

  return {
    title: article.title || "Default Title",
    description: article.seo_description || "Default description",
    openGraph: {
      images: [article.image?.data?.attributes?.url || "/default.jpg"],
      title: article.title,
      description: article.seo_description,
    },
  };
}

// صفحة المقال نفسها
export default async function Page({ params }) {
  const article = await fetchYourArticle(params.slug);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.image?.data?.attributes?.url && (
        <img
          src={article.image.data.attributes.url}
          alt={article.title}
          className="rounded-lg mb-6"
        />
      )}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.content || "" }}
      />
    </main>
  );
}
