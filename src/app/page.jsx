// app/page.js
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`
      );
      const data = await res.json();
      setArticles(data.data);
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
          {articles.map((article) => {
            const { id, attributes } = article;
            const imageUrl =
              attributes.image?.data?.attributes?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attributes.image.data.attributes.url}`
                : '/no-image.png';

            return (
              <div key={id} style={{ marginBottom: '20px' }}>
                <h2>{attributes.title}</h2>
                <Image
                  src={imageUrl}
                  width={300}
                  height={200}
                  alt={attributes.title}
                />
                <p>{attributes.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
