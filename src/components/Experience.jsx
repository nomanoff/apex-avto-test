import styled from "styled-components";
import { FaFileAlt } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

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

const FeatureCard = styled(motion.div)`
  // faqat bu yerni o'zgartirdik
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
        {[...Array(3)].map((_, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <IconWrapper>
              {index === 0 && <FaFileAlt />}
              {index === 1 && <FaPalette />}
              {index === 2 && <FaBookOpen />}
            </IconWrapper>
            <CardTitle>
              {index === 0 && "Haqiqiy Amaliyot"}
              {index === 1 && "Chiroyli Dizayn"}
              {index === 2 && "20+ Mashqlar"}
            </CardTitle>
            <CardText>
              {index === 0 &&
                "Biz bilan haqiqiy imtihon kabi mashq qiling — test simulyatori."}
              {index === 1 &&
                "Toza va zamonaviy interfeys hamda silliq animatsiyalardan zavqlaning."}
              {index === 2 &&
                "700 dan ortiq savollardan o‘rganing va o‘z rivojlanishingizni kuzatib boring."}
            </CardText>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

export default Features;
