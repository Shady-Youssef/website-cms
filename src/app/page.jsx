'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    const [articles, setArticles] = useState([]);

      useEffect(() => {
    fetch("http://127.0.0.1:1337/api/articles?populate=*")

      .then((res) => res.json())
      .then((data) => setArticles(data.data));
  }, []);
  return <>
  <main>
      <h1>Articles</h1>
      {articles.map((article) => {
  const imageData = article?.image?.[0]; // ✅ أول عنصر في array
  const imageUrl = imageData?.formats?.thumbnail?.url
  ? `http://127.0.0.1:1337${imageData.formats.thumbnail.url}`
  : null;


  return (
    <div key={article.id}>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      {/* <img src={imageUrl} alt={article.title} width="400" height="300" /> */}

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={article.title}
          width={400}
          height={300}
        />
        
      )}
    </div>
  );
})}


    </main>
  </>
}
