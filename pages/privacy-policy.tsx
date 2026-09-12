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
    '<h2>Thanos Realty Terms and Conditions</h2><p>This website is owned and controlled by Thanos Realty LLP trading as Thanos Realty. If you use this website you agree to the terms and conditions set out below. Thanos Realty is a limited liability partnership registered in England with registered number OC900142. Our registered office is 18 Marlowe Street, London, W1T 9QX where you may look at a list of members\' names.</p><h3>Disclaimer</h3><p>This website describes services:</p><ul><li><p>provided in the UK by Thanos Realty (a limited liability partnership incorporated in the UK ) and its direct subsidiaries (together known as \'Thanos Realty UK\'); and</p></li><li><p>provided internationally in some 60 territories by a network of separate and independent entities or practices (whether or not having juridical or legal personality) offering professional, commercial and residential property services. These internationally based firms, together with Thanos Realty UK, are known as \'the Thanos Realty global network\'.</p></li></ul><p>Each entity or practice in the Thanos Realty global network is a distinct and separate legal entity. Its ownership and management is distinct from that of any other entity or practice whether operating under the name Thanos Realty or otherwise.</p><p>No entity or practice operating under the name Thanos Realty (including Thanos Realty) is liable for the acts or omissions of any other entity or practice. Neither does it act as agent for nor have any authority (whether actual, apparent, implied or otherwise) to represent, bind or obligate in any way any other entity or practice that operates under the name Thanos Realty (including Thanos Realty).</p><p>References to Thanos Realty on the website include Thanos Realty UK and the Thanos Realty global network. Each entity in the Thanos Realty global network is responsible locally for the management and ownership of its respective website(s).</p><p>While Thanos Realty makes every effort to ensure that everything on the website is accurate and complete, we provide it for information only, so it is indicative rather than definitive. We thus make no explicit or implicit guarantee of its accuracy, and, as far as applicable laws allow, we neither accept responsibility for errors, inaccuracies or omissions, nor for loss that may result directly or indirectly from reliance on its content. Users of the website should not take or omit to take any action that relies on information on the website. Thanos Realty may correct or update the website without prior notice.</p><p>In making the website available, Thanos Realty does not imply or establish any client, advisory, financial or professional relationship. Through the website, neither Thanos Realty nor any other person is providing advisory, consulting or other professional services.</p><h3>Intellectual Property</h3><p>This website is owned and controlled by Thanos Realty. Unless otherwise noted, all information featured on the Thanos Realty website, (whether text or images), is protected by our intellectual property rights, including copyright and trademarks, and is owned or licensed by Thanos Realty. All such rights are reserved. Nothing on this site should be construed as granting any licence or rights to use or distribute any site content without express written agreement.</p><p>You may not download, display, copy, distribute or print any part of the content except to your own computer for your personal non-commercial use. You must not change frame or inline (mirror) any of the content of our website and you must not modify the paper or digital copies of any materials you have printed off or downloaded in any way.</p><p>You must not engage in spamming, flooding, harvesting of e-mail addresses or other personal information, spidering, screen scraping, database scraping, or any other activity with the purpose of obtaining lists of users or any other information, including specifically, property listings available through the site which are sourced from and driven by Thanos Realty’s proprietary database.</p><p>Our status (and that of any identified contributors) as the authors of content on our site must always be acknowledged.</p><p>You must not use any part of the content on our site for commercial purposes without obtaining a licence to do so from us or our licensors.</p><p>If you print off, copy or download any part of our site in breach of these terms of use, your right to use our site will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.</p><h3>Interruption</h3><p>Thanos Realty neither guarantees that the website will be uninterrupted or without delay nor that it will be error-free or virus-free. The website is provided \'as is\' without warranties of any kind.</p><p>Thanos Realty will not be responsible and will not accept any liability whatsoever for any viruses which may infect your computer by reason of your use of or downloading of applications (including .exe applications) from this website.</p><p>Important Information relating to properties displayed on the website</p><p>Particulars: Any property particulars are not an offer or contract, nor part of one. You should not rely on statements by Thanos Realty in the particulars or by word of mouth or in writing ("information") as being factually accurate about the property, its condition or its value. Neither Thanos Realty nor any joint agent has any authority to make any representations about the property, and accordingly any information given is entirely without responsibility on the part of the agents, seller(s) or lessor(s).</p><p>Photos etc: The photographs show only certain parts of the property as they appeared at the time they were taken. Areas, measurements and distances given are approximate only. Any computer generated image gives only an indication as to how the property may look and this may change at any time.</p><p>Regulations etc: Any reference to alterations to, or use of, any part of the property does not mean that any necessary planning, building regulations or other consent has been obtained. A buyer or lessee must find out by inspection or in other ways that these matters have been properly dealt with and that all information is correct.</p><p>VAT: The VAT position relating to the property may change without notice.</p><p>Information on the website about a property is liable to be changed at any time.</p><p>Currency Disclaimer: The currency conversion is for guidance only as the rate of exchange may not be "up to date".</p><p>Map Disclaimer: For properties situated outside the UK any indication on a map does not necessarily show the location of a property, but only the general vicinity. Please refer to the local agent for confirmation of the location.</p><p>Copyright Notice</p><p>This website is owned and controlled by Thanos Realty. Unless otherwise noted, all information featured on the Thanos Realty website, (whether text or images), is protected by copyrights and trademarks, and is owned or licensed by Thanos Realty. You may not download, display or print any part of the content except to your own computer for your personal use and not for business purposes. You must not change frame or inline (mirror) any of the content of our website</p><h3>Links</h3><p>Links on this website may lead to servers maintained by individuals or organisations other than Thanos Realty. Thanos Realty makes no representation or warranty regarding the accuracy, timeliness, suitability or any other aspect of the information located on such servers and neither monitors nor endorses such servers or content.</p><p>If you link to our website we may require you at any time at our absolute discretion to remove the Link</p><h3>Law</h3><p>Any terms and conditions concerning the usage of this website will be governed by the laws of England, and any dispute concerning use of this website will be determined exclusively by the English Courts.</p><h2>Thanos Realty Fair Processing Notice</h2><h3>For Buyers.</h3><h4>So you’re looking to move? Find out how we use your information.</h4><h5>Why do we collect your data?</h5><p>All data that we collect and hold about you as an individual (your “Personal Data”), which might include your name, address, email and telephone number, is held and processed by us in accordance with the law and in accordance with our Privacy Statement. This means that Thanos Realty will only ever use your Personal Data for the purposes for which it is collected and only keep it for as long as necessary to fulfil those purposes (unless legally obliged to keep it for longer). Since you are interested in buying or renting property, we will only use your Personal Data in order to help you find your desired property (unless you tell us otherwise). We will also ask for your consent to send you marketing information and inform you about our other services.</p><h5>Who do we share your data with?</h5><p>Thanos Realty respects your privacy and therefore will never sell your personal data to anyone for any reason. In fact, there are only three circumstances in which we will share your Personal Data with third parties, these are:</p><ol><li><p>When we are required by law or court order to share your Personal Data, this might include background checks (such as credit reference checks through agencies) or fulfilling other regulatory purposes;</p></li><li><p>When you tell us to share your Personal Data or otherwise give us your express consent to share it, for example, where you ask us to share your details with your solicitor, bank or mortgage advisor; or</p></li><li><p>When the nature of the services we are providing to you requires that we share your personal data, for example, if you want to view property, we will likely have to share your name and details with the vendor/landlord or building managers.</p></li></ol><p>If ever you want us to, we will promptly provide you with details of exactly who your Personal Data has been shared with and why.</p><h5>How do we store your data?</h5><p>When you provide us with your Personal Data we will process it using our systems, meaning your details will be inputted into our secure databases. We have security in place to ensure that your data is not lost, stolen, accessed by unauthorised third parties, or tampered with in any way. Internally, your personal data will only be accessible by those members of our staff that have a need to see your data (which will depend on the nature of the services we are providing to you).</p><h5>Are we allowed to do this?</h5><p>Absolutely. For most processes we have what is called “legitimate interests”, for almost all others we will rely on your “consent”, sometimes, we have to process your Personal Data because of “legal obligation”. <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/" target="_blank" title="Lawful basis for processing">View further information regarding these terms.</a></p><h5>Would you like to know more?</h5><p>For further information concerning what Personal Data we hold about you, how you can access it and our use of Personal Data generally, please see our <a href="#" target="_blank" title="Privacy Statement">Privacy Statement online</a> or email our <a href="mailto:enquiry@thanos-realty.com" target="_blank" title="Data Protection Officer">Data Protection Officer</a>.</p><h3>For Sellers</h3><h4>So you’re looking to move? Find out how we use your information.</h4><h5>Why do we collect your data?</h5><p>All data that we collect and hold about you as an individual (your “Personal Data”), which might include your name, address, email and telephone number, is held and processed by us in accordance with the law and in accordance with our Privacy Statement . This means that Thanos Realty will only ever use your Personal Data for the purposes for which it is collected and only keep it for as long as necessary to fulfil those purposes (unless legally obliged to keep it for longer). Since you are interested in hearing about a particular property, we will only use the information you provide for that purpose (unless you tell us otherwise). We will also ask for your consent to send you marketing information and inform you about our other services.</p><h5>Who do we share your data with?</h5><p>Thanos Realty respects your privacy and therefore will never sell your personal data to anyone for any reason. In fact, there are only three circumstances in which we will share your Personal Data with third parties, these are:</p><ol><li><p>When we are required by law or court order to share your Personal Data, this might include background checks (such as credit reference checks through agencies) or fulfilling other regulatory purposes;</p></li><li><p>When you tell us to share your Personal Data or otherwise give us your express consent to share it, for example, where you ask us to share your details with your solicitor, bank or mortgage advisor; or</p></li><li><p>When the nature of the services we are providing to you requires that we share your personal data, for example, if you want to view property, we will likely have to share your name and details with the vendor/landlord or building managers.</p></li></ol><p>If ever you want us to, we will promptly provide you with details of exactly who your Personal Data has been shared with and why.</p><h5>How do we store your data?</h5><p>When you provide us with your Personal Data we will process it using our systems, meaning your details will be inputted into our secure databases. We have security in place to ensure that your data is not lost, stolen, accessed by unauthorised third parties, or tampered with in any way. Internally, your personal data will only be accessible by those members of our staff that have a need to see your data (which will depend on the nature of the services we are providing to you).</p><h5>Are we allowed to do this?</h5><p>Absolutely. For most processes we have what is called “legitimate interests”, for almost all others we will rely on your “consent”, sometimes, we have to process your Personal Data because of “legal obligation”. <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/" target="_blank" title="Lawful basis for processing">View further information regarding these terms.</a></p><h5>Would you like to know more?</h5><p>For further information concerning what Personal Data we hold about you, how you can access it and our use of Personal Data generally, please see our <a href="#" target="_blank" title="Privacy Statement">Privacy Statement online</a> or email our <a href="mailto:enquiry@thanos-realty.com" target="_blank" title="Data Protection Officer">Data Protection Officer</a>.</p><h3>For Occupiers.</h3><h4>So you’re looking to move? Find out how we use your information.</h4><h5>Why do we collect your data?</h5><p>All data that we collect and hold about you as an individual (your “Personal Data”), which might include your name, address, email and telephone number, is held and processed by us in accordance with the law and in accordance with our Privacy Statement. This means that Thanos Realty will only ever use your Personal Data for the purposes for which it is collected and only keep it for as long as necessary to fulfil those purposes (unless legally obliged to keep it for longer). Since you are interested in hearing about property, we will only use the information you provide for that purpose, this may include the sending of marketing information and information about our other services that may be of interest to you.</p><h5>Who do we share your data with?</h5><p>Thanos Realty respects your privacy and therefore will never sell your personal data to anyone for any reason. In fact, there are only three circumstances in which we will share your Personal Data with third parties, these are:</p><ol><li><p>When we are required by law or court order to share your Personal Data, this might include background checks (such as credit reference checks through agencies) or fulfilling other regulatory purposes;</p></li><li><p>When you tell us to share your Personal Data or otherwise give us your express consent to share it, for example, where you ask us to share your details with your solicitor, bank or mortgage advisor; or</p></li><li><p>When the nature of the services we are providing to you requires that we share your personal data, for example, if you want to view property, we will likely have to share your name and details with the vendor/landlord or building managers. If ever you want us to, we will promptly provide you with details of exactly who your Personal Data has been shared with and why.</p></li></ol><h5>How do we store your data?</h5><p>When you provide us with your Personal Data we will process it using our systems, meaning your details will be inputted into our secure databases. We have security in place to ensure that your data is not lost, stolen, accessed by unauthorised third parties, or tampered with in any way. Internally, your personal data will only be accessible by those members of our staff that have a need to see your data (which will depend on the nature of the services we are providing to you).</p><h5>Are we allowed to do this?</h5><p>Absolutely. For most processes we have what is called “legitimate interests”, for almost all others we will rely on your “consent”, sometimes, we have to process your Personal Data because of “legal obligation”. <a href="https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/lawful-basis-for-processing/" target="_blank" title="Lawful basis for processing">View further information regarding these terms.</a></p><h5>Would you like to know more?</h5><p>For further information concerning what Personal Data we hold about you, how you can access it and our use of Personal Data generally, please see our <a href="#" target="_blank" title="Privacy Statement">Privacy Statement online</a> or email our <a href="mailto:enquiry@thanos-realty.com" target="_blank" title="Data Protection Officer">Data Protection Officer</a>.</p>';

  return {
    props: {
      menu: menu,
      title: "Privacy Policy",
      lastUpdated: "February 10, 2022",
      content: content,
    }, // will be passed to the page component as props
    revalidate: parseInt(process.env.REVALIDATE_CONTENT_IN_SECONDS as string), // refresh interval
  };
};

const PrivacyPolicy = ({
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

export default PrivacyPolicy;
