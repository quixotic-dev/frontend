import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../../shared/config";
import {
  ContainerBackground,
  ContainerExtended,
  Title,
  Subtitle,
} from "./styles";

export const Privacy = () => {
  return (
    <ContainerBackground>
      <ContainerExtended>
        <Title>Privacy Policy</Title>
        <Subtitle>Last updated on December 14, 2021</Subtitle>
        <p>
          Thank you for being part of our community at Fanbase Labs, Inc., doing
          business as Quix (&ldquo;Quix ,&ldquo; &ldquo;we,&ldquo;
          &ldquo;us,&ldquo; or &ldquo;our&ldquo;). Your privacy is important to
          us. It is Quix&#39;s policy to respect your privacy and comply with
          any applicable law and regulation regarding any personal information
          we may collect about you, including across our website,{" "}
          <a href={`https://${siteConfig.WEBSITE_URL}`}>
            {siteConfig.WEBSITE_URL}
          </a>
          , and other sites we own and operate.
        </p>
        <p>
          Personal information is any information about you which can be used to
          identify you. This includes information about you as a person (such as
          name, address, and date of birth), your devices, payment details, and
          even information about how you use a website or online service.
        </p>
        <p>
          In the event our site contains links to third-party sites and
          services, please be aware that those sites and services have their own
          privacy policies. After following a link to any third-party content,
          you should read their posted privacy policy information about how they
          collect and use personal information. This Privacy Policy does not
          apply to any of your activities after you leave our site.
        </p>
        <p>This policy is effective as of 14 December 2021. </p>
        {/* <p>Last updated: 15 December 2021 </p> */}
        <h3>Information We Collect</h3>
        <p>
          Information we collect includes both information you knowingly and
          actively provide us when using or participating in any of our services
          and promotions, and any information automatically sent by your devices
          in the course of accessing our products and services.
        </p>
        <h4>Log Data</h4>
        <p>
          When you visit our website, our servers may automatically log the
          standard data provided by your web browser. It may include your
          device’s Internet Protocol (IP) address, your browser type and
          version, the pages you visit, the time and date of your visit, the
          time spent on each page, and other details about your visit.
        </p>
        <p>
          Additionally, if you encounter certain errors while using the site, we
          may automatically collect data about the error and the circumstances
          surrounding its occurrence. This data may include technical details
          about your device, what you were trying to do when the error happened,
          and other technical information relating to the problem. You may or
          may not receive notice of such errors, even in the moment they occur,
          that they have occurred, or what the nature of the error is.
        </p>
        <p>
          Please be aware that while this information may not be personally
          identifying by itself, it may be possible to combine it with other
          data to personally identify individual persons.
        </p>
        <h4>Device Data</h4>
        <p>
          When you visit our website or interact with our services, we may
          automatically collect data about your device, such as:
        </p>
        <ul>
          <li>Device Type</li>
          <li>Operating System</li>
          <li>Geo-location data</li>
        </ul>
        <p>
          Data we collect can depend on the individual settings of your device
          and software. We recommend checking the policies of your device
          manufacturer or software provider to learn what information they make
          available to us.
        </p>
        <h4>Personal Information</h4>
        <p>
          We may ask for personal information which may include one or more of
          the following:
        </p>
        <ul>
          <li>Email</li>
          <li>Social media profiles</li>
        </ul>
        <h4>User-Generated Content</h4>
        <p>
          We consider &ldquo;user-generated content&rdquo; to be materials
          voluntarily supplied to us by our users for the purpose of publication
          on our website and/or social media channels. All user-generated
          content is associated with the account or email address used to submit
          the materials.
        </p>
        <p>
          Please be aware that any content you submit for the purpose of
          publication will be public after posting (and subsequent review or
          vetting process). Once published, it may be accessible to third
          parties not covered under this privacy policy.
        </p>
        <h4>Legitimate Reasons for Processing Your Personal Information</h4>
        <p>
          We only collect and use your personal information when we have a
          legitimate reason for doing so. In which instance, we only collect
          personal information that is reasonably necessary to provide our
          services to you.
        </p>
        <h4>Collection and Use of Information</h4>
        <p>
          We may collect personal information from you when you do any of the
          following on our website:
        </p>
        <ul>
          <li>
            Sign up to receive updates from us via email or social media
            channels
          </li>
          <li>Use a mobile device or web browser to access our content</li>
          <li>
            Contact us via email, social media, or on any similar technologies
          </li>
          <li>When you mention us on social media</li>
        </ul>
        <p>
          We may collect, hold, use, and disclose information for the following
          purposes, and personal information will not be further processed in a
          manner that is incompatible with these purposes:
        </p>
        <ul>
          <li>
            to provide you with our platform&lsquo;s core features and services
          </li>
          <li>
            to enable you to customize or personalize your experience of our
            website
          </li>
          <li>to contact and communicate with you</li>
        </ul>
        <p>
          Please be aware that we may combine information we collect about you
          with general information or research data we receive from other
          trusted sources.
        </p>
        <h4>Security of Your Personal Information</h4>
        <p>
          When we collect and process personal information, and while we retain
          this information, we will protect it within commercially acceptable
          means to prevent loss and theft, as well as unauthorized access,
          disclosure, copying, use, or modification.
        </p>
        <p>
          Although we will do our best to protect the personal information you
          provide to us, we advise that no method of electronic transmission or
          storage is 100% secure, and no one can guarantee absolute data
          security. We will comply with laws applicable to us in respect of any
          data breach.
        </p>
        <p>
          You are responsible for selecting any password and its overall
          security strength, ensuring the security of your own information
          within the bounds of our services.
        </p>
        <h4>How Long We Keep Your Personal Information</h4>
        <p>
          We keep your personal information only for as long as we need to. This
          time period may depend on what we are using your information for, in
          accordance with this privacy policy. If your personal information is
          no longer required, we will delete it or make it anonymous by removing
          all details that identify you.
        </p>
        <p>
          However, if necessary, we may retain your personal information for our
          compliance with a legal, accounting, or reporting obligation or for
          archiving purposes in the public interest, scientific, or historical
          research purposes or statistical purposes.
        </p>
        <h3>Children’s Privacy</h3>
        <p>
          We do not aim any of our products or services directly at children
          under the age of 13, and we do not knowingly collect personal
          information about children under 13.
        </p>
        <h3>Disclosure of Personal Information to Third Parties</h3>
        <p>We may disclose personal information to: </p>
        <ul>
          <li>a parent, subsidiary, or affiliate of our company</li>
          <li>
            third party service providers for the purpose of enabling them to
            provide their services, for example, IT service providers, data
            storage, hosting and server providers, advertisers, or analytics
            platforms
          </li>
          <li>our employees, contractors, and/or related entities</li>
          <li>our existing or potential agents or business partners</li>
          <li>
            courts, tribunals, regulatory authorities, and law enforcement
            officers, as required by law, in connection with any actual or
            prospective legal proceedings, or in order to establish, exercise,
            or defend our legal rights
          </li>
          <li>
            third parties, including agents or sub-contractors, who assist us in
            providing information, products, services, or direct marketing to
            you
          </li>
          <li>third parties to collect and process data</li>
        </ul>
        <h3>Your Rights and Controlling Your Personal Information</h3>
        <p>
          You always retain the right to withhold personal information from us,
          with the understanding that your experience of our website may be
          affected. We will not discriminate against you for exercising any of
          your rights over your personal information. If you do provide us with
          personal information you understand that we will collect, hold, use
          and disclose it in accordance with this privacy policy. You retain the
          right to request details of any personal information we hold about
          you.
        </p>
        <p>
          If we receive personal information about you from a third party, we
          will protect it as set out in this privacy policy. If you are a third
          party providing personal information about somebody else, you
          represent and warrant that you have such person’s consent to provide
          the personal information to us.
        </p>
        <p>
          If you have previously agreed to us using your personal information
          for direct marketing purposes, you may change your mind at any time.
          We will provide you with the ability to unsubscribe from our
          email-database or opt out of communications. Please be aware we may
          need to request specific information from you to help us confirm your
          identity.
        </p>
        <p>
          If you believe that any information we hold about you is inaccurate,
          out of date, incomplete, irrelevant, or misleading, please contact us
          using the details provided in this privacy policy. We will take
          reasonable steps to correct any information found to be inaccurate,
          incomplete, misleading, or out of date.
        </p>
        <p>
          If you believe that we have breached a relevant data protection law
          and wish to make a complaint, please contact us using the details
          below and provide us with full details of the alleged breach. We will
          promptly investigate your complaint and respond to you, in writing,
          setting out the outcome of our investigation and the steps we will
          take to deal with your complaint. You also have the right to contact a
          regulatory body or data protection authority in relation to your
          complaint.
        </p>
        <h3>Use of Cookies</h3>
        <p>
          We use &ldquo;cookies&rdquo; to collect information about you and your
          activity across our site. A cookie is a small piece of data that our
          website stores on your computer, and accesses each time you visit, so
          we can understand how you use our site. This helps us serve you
          content based on preferences you have specified.
        </p>
        <p>Please refer to our Cookie Policy for more information. </p>
        <h3>Limits of Our Policy</h3>
        <p>
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and policies
          of those sites, and cannot accept responsibility or liability for
          their respective privacy practices.
        </p>
        <h3>Changes to This Policy</h3>
        <p>
          At our discretion, we may change our privacy policy to reflect updates
          to our business processes, current acceptable practices, or
          legislative or regulatory changes. If we decide to change this privacy
          policy, we will post the changes here at the same link by which you
          are accessing this privacy policy.
        </p>
        <p>
          If required by law, we will get your permission or give you the
          opportunity to opt in to or opt out of, as applicable, any new uses of
          your personal information.
        </p>
        <h3>Contact Us</h3>
        <p>
          For any questions or concerns regarding your privacy, you may contact
          us using the following details:
        </p>
        <p>
          Quix
          <br />
          hi@{siteConfig.WEBSITE_URL}
        </p>
      </ContainerExtended>
    </ContainerBackground>
  );
};
