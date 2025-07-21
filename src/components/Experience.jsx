import styled from "styled-components";
import { FaFileAlt } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

const FeaturesSection = styled.section`
  background-color: #cceeff;
  padding: 60px 20px;
  text-align: center;
`;

const Title = styled.h2`
color: black;
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const FeaturesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 100px;
  margin-top: 100px;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px 20px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  font-size: 40px;
  color: #007bff;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  color: #007bff;
  font-size: 20px;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  color: black;
  font-size: 16px;
  line-height: 1.5;
`;

const Features = () => {
  return (
    <FeaturesSection>
      <Title>Haqiqiy Amaliyot</Title>
      <FeaturesGrid>
        <FeatureCard>
          <IconWrapper>
            <FaFileAlt />
          </IconWrapper>
          <CardTitle>Haqiqiy Amaliyot</CardTitle>
          <CardText>
            Biz bilan haqiqiy imtihon kabi mashq qiling — test simulyatori.
          </CardText>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <FaPalette />
          </IconWrapper>
          <CardTitle>Chiroyli Dizayn</CardTitle>
          <CardText>
            Toza va zamonaviy interfeys hamda silliq animatsiyalardan zavqlaning.
          </CardText>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <FaBookOpen />
          </IconWrapper>
          <CardTitle>20+ Mashqlar</CardTitle>
          <CardText>
            700 dan ortiq savollardan o‘rganing va o‘z rivojlanishingizni kuzatib boring.
          </CardText>
        </FeatureCard>
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default Features;
