import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <AboutSection>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet lacinia nulla ut laoreet. Quisque ultricies et tortor nec laoreet.</p>
          <SocialIcons>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2acca7e85be423abec2a1e37ebf34070fde2f4dc1adcfe1f7b44c61a8818c673?placeholderIfAbsent=true&apiKey=b4eeb15480614348979f5cda6d8d97a4" alt="Facebook" />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/45752c5a4e29f63e72c4a515bab8b0cd343cd8ae7862bfb90193c49485813dcc?placeholderIfAbsent=true&apiKey=b4eeb15480614348979f5cda6d8d97a4" alt="Twitter" />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/79b7f60ecd9a80ae8a07239af28ee18f92ffd13ff069ab260680c53f9b72ed04?placeholderIfAbsent=true&apiKey=b4eeb15480614348979f5cda6d8d97a4" alt="Instagram" />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/25aed9539650f1c50b67ec44c052360f497b1036ea1425f424eca62002fd0809?placeholderIfAbsent=true&apiKey=b4eeb15480614348979f5cda6d8d97a4" alt="LinkedIn" />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/640afe89765abfe11a4ea36dc58c38cb91cd13371a88cc5e4dee776903e0b796?placeholderIfAbsent=true&apiKey=b4eeb15480614348979f5cda6d8d97a4" alt="YouTube" />
          </SocialIcons>
        </AboutSection>
        <FooterLinksSection>
          <FooterLinkColumn>
            <h3>Information</h3>
            <FooterLink>About</FooterLink>
            <FooterLink>Delivery information</FooterLink>
            <FooterLink>Privacy Policy</FooterLink>
            <FooterLink>Sales</FooterLink>
            <FooterLink>Terms & Conditions</FooterLink>
            <FooterLink>EMI Payment</FooterLink>
          </FooterLinkColumn>
          <FooterLinkColumn>
            <h3>Account</h3>
            <FooterLink>My Account</FooterLink>
            <FooterLink>My Orders</FooterLink>
            <FooterLink>Returns</FooterLink>
            <FooterLink>Shipping</FooterLink>
            <FooterLink>Wishlist</FooterLink>
            <FooterLink>Account Details</FooterLink>
          </FooterLinkColumn>
          <FooterLinkColumn>
            <h3>Store</h3>
            <FooterLink>Affiliate</FooterLink>
            <FooterLink>Discounts</FooterLink>
            <FooterLink>Sale</FooterLink>
            <FooterLink>Contact</FooterLink>
            <FooterLink>All Collections</FooterLink>
          </FooterLinkColumn>
        </FooterLinksSection>
        <ContactSection>
          <h3>Contact Us</h3>
          <p>If you have any query, please contact us <br /><strong>needus24@gmail.com</strong></p>
          <ContactItem>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/594647a895c53472cb0e6b318aa4667f5fdf92ea7ecc0e9f856eba170f90c236?placeholderIfAbsent=true&apiKey=b4eeb15480614348979f5cda6d8d97a4" alt="Location icon" />
            <span>California, USA</span>
          </ContactItem>
          <ContactItem>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd58d62604c5bd03e83aed55a6ac16fe7191b928b8c50b0c92f39bee509b56d9?placeholderIfAbsent=true&apiKey=b4eeb15480614348979f5cda6d8d97a4" alt="Phone icon" />
            <span>+12012987481</span>
          </ContactItem>
        </ContactSection>
      </FooterContent>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background-color: #2f333a;
  color: #fff;
  padding: 51px 80px;
  @media (max-width: 991px) {
    padding: 51px 20px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const AboutSection = styled.div`
  max-width: 300px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const FooterLinksSection = styled.div`
  display: flex;
  gap: 40px;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const FooterLinkColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 13px;
  font: 400 18px Inter, sans-serif;
  &:hover {
    text-decoration: underline;
  }
`;

const ContactSection = styled.div`
  max-width: 300px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  img {
    width: 40px;
    height: 40px;
  }
`;

const FooterDivider = styled.hr`
  border: none;
  border-top: 1px solid #fff;
  margin: 30px 0;
`;

const PaymentMethods = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  img {
    height: 30px;
  }
`;

const Copyright = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font: 400 15px Inter, sans-serif;
  img {
    width: 24px;
    height: 24px;
  }
`;

export default Footer;