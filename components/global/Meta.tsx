import Head from "next/head";
import { useRouter } from "next/router";

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
}

export default function Meta({
  title,
  description,
  image,
  url,
  siteName,
}: MetaProps) {
  const router = useRouter();

  const metaTitle =
    title +
    (title ? " — " : "") +
    "Thanos Realty | Halving Occupancy, Doubling Space";
  const metaDescription = description || "Halving Occupancy, Doubling Space";
  const metaUrl = url;
  const metaImage = image || process.env.NEXT_PUBLIC_META_IMAGE;
  const metaSiteName =
    siteName || "Thanos Realty | Halving Occupancy, Doubling Space";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <link rel="icon" href="/images/favicon.svg" />
        <meta name="description" content={metaDescription} />
        <meta name="image" content={metaImage} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content={metaTitle} />
        <meta
          name="og:description"
          property="og:description"
          content={metaDescription}
        />
        <meta property="og:site_name" content={metaSiteName} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Head>
    </>
  );
}
