import ReactMarkdown from "react-markdown";
import { BannerText, Container, ContainerBackground } from "./styles";

export const Banner = ({ scrolled, message }) => {
  return (
    <ContainerBackground className={scrolled ? "scrolled" : ""}>
      <Container>
        <BannerText>
          <ReactMarkdown
            allowedElements={["br", "strong", "em", "a"]}
            unwrapDisallowed={true}
            linkTarget="_blank"
          >
            {message}
          </ReactMarkdown>
        </BannerText>
      </Container>
    </ContainerBackground>
  );
};
