// app/page.jsx
import Image from "next/image";
import getStrapiImage from "@/utils/getStrapiImage";
import { Box, Container, Grid, Typography } from "@mui/material";


// 1️⃣ دالة بتجيب المقالات من Strapi
async function getArticles() {
  const res = await fetch(
    "https://big-comfort-da5fef7983.strapiapp.com/api/articles?populate=*",
    {
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  return data.data;
}

export async function generateMetadata() {
  const article = await getArticles();
  const attrs =  article[0] || {};

  return {
    title: ` موقعك | ${attrs.title}`,
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

export default async function Home() {
  const articles = await getArticles();

  return (
    <Container maxWidth="xl">
      
    <main>
      <Typography component={'h1'} variant="h3" color="initial">Latest Articles</Typography>
      <Grid container spacing={2} >

      {articles.map((article) => {
        const img = getStrapiImage(article.image, "medium");

        return (
            <Grid key={article.id}  size={{xs:12, md:4}}>
          <Box component={'article'} sx={{mb:4, textAlign:'right'}}>
            {img && (
              <Image
                src={img}
                alt={article.image?.alternativeText || article.title}
                width={200}
                height={200}
                loading="eager"
                unoptimized
              />
            )}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <p>{article.content}</p>
          </Box>
      </Grid>
        );
      })}
      </Grid>
    </main>
    </Container>
  );
}
