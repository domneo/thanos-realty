import parse, { DOMNode, domToReact } from "html-react-parser";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import styled from "styled-components";

import media from "styles/media";
import { menu } from "utils/layoutData";

import Layout from "components/Layout";
import Meta from "components/global/Meta";

const options = {
  replace: (domNode: DOMNode) => {
    // @ts-ignore
    const { attribs, type, name, children, parent } = domNode;
    if (attribs && type === "tag") {
      switch (name) {
        case "p":
          return <p className="lg">{domToReact(children, options)}</p>;
      }
    }
    if (type === "text" && parent === null) {
      // @ts-ignore
      const { data } = domNode;

      if (data.includes("\n")) return data;

      return <p className="lg">{data}</p>;
    }
  },
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const content =
    '<h2>Thanos Realty Fair Processing Notice</h2><h3>For Buyers.</h3><h4>So you’re looking to move? Find out how we use your information.</h4><h5>Why do we collect your data?</h5><p>All data that we collect and hold about you as an individual (your “Personal Data”), which might include your name, address, email and telephone number, is held and processed by us in accordance with the law and in accordance with our Privacy Statement. This means that Thanos Realty will only ever use your Personal Data for the purposes for which it is collected and only keep it for as long as necessary to fulfil those purposes (unless legally obliged to keep it for longer). Since you are interested in buying or renting property, we will only use your Personal Data in order to help you find your desired property (unless you tell us otherwise). We will also ask for your consent to send you marketing information and inform you about our other services.</p><h5>Who do we share your data with?</h5><p>Thanos Realty respects your privacy and therefore will never sell your personal data to anyone for any reason. In fact, there are only three circumstances in which we will share your Personal Data with third parties, these are:</p><ol><li><p>When we are required by law or court order to share your Personal Data, this might include background checks (such as credit reference checks through agencies) or fulfilling other regulatory purposes;</p></li><li><p>When you tell us to share your Personal Data or otherwise give us your express consent to share it, for example, where you ask us to share your details with your solicitor, bank or mortgage advisor; or</p></li><li><p>When the nature of the services we are providing to you requires that we share your personal data, for example, if you want to view property, we will likely have to share your name and details with the vendor/landlord or building managers.</p></li></ol><p>If ever you want us to, we will promptly provide you with details of exactly who your Personal Data has been shared with and why.</p><h5>How do we store your data?</h5><p>When you provide us with your Personal Data we will process it using our systems, meaning your details will be inputted into our secure databases. We have security in place to ensure that your data is not lost, stolen, accessed by unauthorised third parties, or tampered with in any way. Internally, your personal data will only be accessible by those members of our staff that have a need to see your data (which will depend on the nature of the services we are providing to you).</p><h5>Are we allowed to do this?</h5><p>Absolutely. For most processes we have what is called “legitimate interests”, for almost all others we will rely on your “consent”, sometimes, we have to process your Personal Data because of “legal obligation”. <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/" target="_blank" title="Lawful basis for processing">View further information regarding these terms.</a></p><h5>Would you like to know more?</h5><p>For further information concerning what Personal Data we hold about you, how you can access it and our use of Personal Data generally, please see our <a href="#" target="_blank" title="Privacy Statement">Privacy Statement online</a> or email our <a href="mailto:enquiry@thanos-realty.com" target="_blank" title="Data Protection Officer">Data Protection Officer</a>.</p><h3>For Sellers</h3><h4>So you’re looking to move? Find out how we use your information.</h4><h5>Why do we collect your data?</h5><p>All data that we collect and hold about you as an individual (your “Personal Data”), which might include your name, address, email and telephone number, is held and processed by us in accordance with the law and in accordance with our Privacy Statement . This means that Thanos Realty will only ever use your Personal Data for the purposes for which it is collected and only keep it for as long as necessary to fulfil those purposes (unless legally obliged to keep it for longer). Since you are interested in hearing about a particular property, we will only use the information you provide for that purpose (unless you tell us otherwise). We will also ask for your consent to send you marketing information and inform you about our other services.</p><h5>Who do we share your data with?</h5><p>Thanos Realty respects your privacy and therefore will never sell your personal data to anyone for any reason. In fact, there are only three circumstances in which we will share your Personal Data with third parties, these are:</p><ol><li><p>When we are required by law or court order to share your Personal Data, this might include background checks (such as credit reference checks through agencies) or fulfilling other regulatory purposes;</p></li><li><p>When you tell us to share your Personal Data or otherwise give us your express consent to share it, for example, where you ask us to share your details with your solicitor, bank or mortgage advisor; or</p></li><li><p>When the nature of the services we are providing to you requires that we share your personal data, for example, if you want to view property, we will likely have to share your name and details with the vendor/landlord or building managers.</p></li></ol><p>If ever you want us to, we will promptly provide you with details of exactly who your Personal Data has been shared with and why.</p><h5>How do we store your data?</h5><p>When you provide us with your Personal Data we will process it using our systems, meaning your details will be inputted into our secure databases. We have security in place to ensure that your data is not lost, stolen, accessed by unauthorised third parties, or tampered with in any way. Internally, your personal data will only be accessible by those members of our staff that have a need to see your data (which will depend on the nature of the services we are providing to you).</p><h5>Are we allowed to do this?</h5><p>Absolutely. For most processes we have what is called “legitimate interests”, for almost all others we will rely on your “consent”, sometimes, we have to process your Personal Data because of “legal obligation”. <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/" target="_blank" title="Lawful basis for processing">View further information regarding these terms.</a></p><h5>Would you like to know more?</h5><p>For further information concerning what Personal Data we hold about you, how you can access it and our use of Personal Data generally, please see our <a href="#" target="_blank" title="Privacy Statement">Privacy Statement online</a> or email our <a href="mailto:enquiry@thanos-realty.com" target="_blank" title="Data Protection Officer">Data Protection Officer</a>.</p><h3>For Occupiers.</h3><h4>So you’re looking to move? Find out how we use your information.</h4><h5>Why do we collect your data?</h5><p>All data that we collect and hold about you as an individual (your “Personal Data”), which might include your name, address, email and telephone number, is held and processed by us in accordance with the law and in accordance with our Privacy Statement. This means that Thanos Realty will only ever use your Personal Data for the purposes for which it is collected and only keep it for as long as necessary to fulfil those purposes (unless legally obliged to keep it for longer). Since you are interested in hearing about property, we will only use the information you provide for that purpose, this may include the sending of marketing information and information about our other services that may be of interest to you.</p><h5>Who do we share your data with?</h5><p>Thanos Realty respects your privacy and therefore will never sell your personal data to anyone for any reason. In fact, there are only three circumstances in which we will share your Personal Data with third parties, these are:</p><ol><li><p>When we are required by law or court order to share your Personal Data, this might include background checks (such as credit reference checks through agencies) or fulfilling other regulatory purposes;</p></li><li><p>When you tell us to share your Personal Data or otherwise give us your express consent to share it, for example, where you ask us to share your details with your solicitor, bank or mortgage advisor; or</p></li><li><p>When the nature of the services we are providing to you requires that we share your personal data, for example, if you want to view property, we will likely have to share your name and details with the vendor/landlord or building managers. If ever you want us to, we will promptly provide you with details of exactly who your Personal Data has been shared with and why.</p></li></ol><h5>How do we store your data?</h5><p>When you provide us with your Personal Data we will process it using our systems, meaning your details will be inputted into our secure databases. We have security in place to ensure that your data is not lost, stolen, accessed by unauthorised third parties, or tampered with in any way. Internally, your personal data will only be accessible by those members of our staff that have a need to see your data (which will depend on the nature of the services we are providing to you).</p><h5>Are we allowed to do this?</h5><p>Absolutely. For most processes we have what is called “legitimate interests”, for almost all others we will rely on your “consent”, sometimes, we have to process your Personal Data because of “legal obligation”. <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/" target="_blank" title="Lawful basis for processing">View further information regarding these terms.</a></p><h5>Would you like to know more?</h5><p>For further information concerning what Personal Data we hold about you, how you can access it and our use of Personal Data generally, please see our <a href="#" target="_blank" title="Privacy Statement">Privacy Statement online</a> or email our <a href="mailto:enquiry@thanos-realty.com" target="_blank" title="Data Protection Officer">Data Protection Officer</a>.</p>';

  return {
    props: {
      menu: menu,
      title: "Terms and Conditions",
      lastUpdated: "February 10, 2022",
      content: content,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

const TnCs = ({
  menu,
  title,
  lastUpdated,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout mode="light" menu={menu}>
      <Meta title={title} />
      <Root className="container-fluid overflow-hidden">
        <BgImageWrapper>
          <Image
            src="/images/legal-ellipses.svg"
            alt="ellipses"
            layout="fill"
            objectFit="contain"
            objectPosition={"top"}
          />
        </BgImageWrapper>
        <div className="container">
          <div className="row mt-4">
            <div className="col-lg-10 offset-lg-1 col-xl-9">
              <h1 className="alt text-dark mb-5">
                <span className="bg-white p-2 p-sm-4">{title}</span>
              </h1>
              <p className="text-gray bg-white mb-0 p-2 pb-4 p-sm-4">
                <span className="">
                  Last Updated:{" "}
                  <span className="d-inline-block">{lastUpdated}</span>
                </span>
              </p>
              <Content>{parse(content, options)}</Content>
            </div>
          </div>
        </div>
      </Root>
    </Layout>
  );
};

const Root = styled.section`
  padding-top: 10rem;
  padding-bottom: 3rem;

  @media ${media.md} {
    padding-top: 15rem;
  }

  @media ${media.xl} {
    padding-top: 20rem;
  }
`;

const BgImageWrapper = styled.div`
  position: absolute;
  top: 60px;
  bottom: 0;
  left: -100px;
  right: 0;
  z-index: -1;

  @media ${media.sm} {
    top: 30px;
    left: -50px;
  }

  @media ${media.md} {
    top: 50px;
    left: -130px;
  }

  @media ${media.lg} {
    top: 20px;
    left: -100px;
    right: 50px;
  }

  @media ${media.xl} {
    top: 100px;
    left: -150px;
    right: 60px;
  }

  @media ${media.xxl} {
    top: 100px;
    left: -100px;
    right: 280px;
  }

  & > span {
    max-height: 537px;
  }
`;

const Content = styled.div`
  background: var(--bs-white);
  padding: 0.5rem;

  @media ${media.sm} {
    padding: 1.5rem;
  }

  * {
    color: var(--bs-black);
    margin-bottom: 3rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1.5rem;
    padding-top: 1.5rem;
  }
`;

export default TnCs;
