'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`
        );
        const data = await res.json();

        // لو البيانات فيها attributes أو لا
        const list = data.data.map((item) => item.attributes || item);
        setArticles(list);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }

    getData();
  }, []);

  return (
    <main style={{ padding: '20px' }}>
      <h1>Articles</h1>

      {articles.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {articles.map((article, index) => {
            const imageUrl = article.image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.image.url}`
              : '/no-image.png';

            return (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h2>{article.title}</h2>
                <Image
                  src={imageUrl}
                  width={300}
                  height={200}
                  alt={article.title}
                />
                <p>{article.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
