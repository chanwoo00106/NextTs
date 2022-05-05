import Head from "next/head";

interface HeaderProps {
  title: string;
  description?: string;
  img?: string;
}

function SEO({ title, description, img }: HeaderProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content={description ? description : "파일 공유 서비스"}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={process.env.FRONT_SERVER_URL} />
      <meta property="og:image" content={img ? img : ""} />
      <meta
        property="og:description"
        content={description ? description : "파일 공유 서비스"}
      />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:url" content={process.env.FRONT_SERVER_URL} />
      <meta property="twitter:image" content={img ? img : ""} />
      <meta
        property="twitter:description"
        content={description ? description : "파일 공유 서비스"}
      />
    </Head>
  );
}

export default SEO;
