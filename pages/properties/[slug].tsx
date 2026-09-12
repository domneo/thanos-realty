import { GetStaticProps, InferGetStaticPropsType } from "next";

import fetchAPI from "utils/fetchAPI";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Meta from "components/global/Meta";
import { AdditionalDetails } from "components/property/AdditionalDetails";
import { CTA } from "components/property/CTA";
import { Details } from "components/property/Details";
import { Gallery } from "components/property/Gallery";

import { PropertiesData, PropertyData, PropertyAsset } from "types/content";

export const getStaticPaths = async () => {
  const getProperties = async (): Promise<PropertiesData> => {
    const data = await fetchAPI(
      `api/v1/properties?published=1&sort=published_at&sort_by=desc&per_page=9999`
    );
    return data?.properties;
  };

  const propertiesSlugs = (await getProperties()).data.map(
    (property) => property?.slug
  );

  return {
    paths: propertiesSlugs.map((slug) => ({ params: { slug: slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const getSettingValue = async (settingName: string) => {
    const data = await fetchAPI(`api/v1/settings/${settingName}`);
    return data?.setting?.value;
  };

  const getProperty = async (): Promise<PropertyData> => {
    const data = await fetchAPI(`api/v1/properties/${params?.slug}`);
    return data;
  };

  const property = await getProperty();

  const ctaContents = {
    title: "Connect With Us",
    description:
      "Our team of experts are here to help you out. Drop us a message or give us a call.",
    phone: {
      text: "+65 6555 0170",
      link: "tel:+6565550170",
    },
    whatsapp: {
      text: "Whatsapp",
      link: "https://wa.me/message/",
    },
    button: {
      text: "Send enquiry",
      link: `mailto:${await getSettingValue("HOME_CTA_EMAIL")}`,
    },
  };

  return {
    props: {
      menu: menu,
      property: property,
      ctaContents: ctaContents,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

const Properties = ({
  menu,
  property,
  ctaContents,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    id,
    images,
    title,
    description,
    precinct,
    mrt,
    typical_floor_plate,
    year_built,
    building_size,
    stories,
    ideal_rent_price,
    ideal_rent_text,
    facilities,
  } = property;

  return (
    <Layout mode="light" menu={menu}>
      <Meta title={title} description={description} image={images[0].url} />
      <Gallery images={images} />
      <Details
        title={title}
        precinct={precinct}
        mrt={mrt}
        typical_floor_plate={typical_floor_plate}
        year_built={year_built}
        building_size={building_size}
        stories={stories}
        ideal_rent_price={ideal_rent_price}
        ideal_rent_text={ideal_rent_text}
      />
      <div className="container-fluid py-5 py-md-6">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <AdditionalDetails
                description={description}
                facilities={facilities}
              />
            </div>
            <div className="col-lg-5 col-xl-4 offset-xl-1">
              <CTA contents={ctaContents} id={id} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Properties;
