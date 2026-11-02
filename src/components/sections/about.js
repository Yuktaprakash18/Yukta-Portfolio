import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 850px;

  .inner {
    display: block;
  }
`;

const StyledText = styled.div`
  p {
    margin-bottom: 20px;
    color: var(--slate);
    font-size: var(--fz-lg);
    line-height: 1.6;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .highlight {
    color: var(--green);
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <p>
            Computer Science and Engineering graduate from ATME College of Engineering,
            Mysore, with a CGPA of 8.2/10. My technical interests include Python development,
            backend engineering, Artificial Intelligence, Machine Learning, and Generative AI.
          </p>

          <p>
            I have worked on projects involving RAG-based knowledge retrieval, AI agents,
            Text-to-SQL systems, computer vision, and secure authentication. I also gained practical
            experience through a Python with Data Science internship at Drive Torq Mission Tech
            Solutions.
          </p>

          <p>
            I am interested in opportunities where I can contribute to software development and
            AI-driven applications while continuously improving my technical skills.
          </p>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
