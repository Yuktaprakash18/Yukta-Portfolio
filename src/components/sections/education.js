import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledEducationSection = styled.section`
  max-width: 900px;

  .education-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 25px;
    margin-top: 40px;
  }
`;

const StyledEducationCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.25);
    box-shadow: 0 15px 30px -15px var(--navy-shadow);
  }

  .card-top {
    margin-bottom: 25px;
  }

  .degree {
    font-size: var(--fz-xl);
    font-weight: 600;
    color: var(--lightest-slate);
    line-height: 1.3;
    margin-bottom: 8px;
  }

  .institution {
    font-size: var(--fz-md);
    color: var(--green);
    margin-bottom: 5px;
  }

  .card-bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .tag {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--light-slate);
    background-color: var(--navy);
    padding: 4px 10px;
    border-radius: var(--border-radius);
    border: 1px solid var(--lightest-navy);

    &.highlight {
      color: var(--green);
      border-color: rgba(100, 255, 218, 0.3);
    }
  }
`;

const Education = () => {
  const revealContainer = useRef(null);
  const revealCards = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const educationList = [
    {
      institution: 'ATME College of Engineering, Mysore',
      degree: 'B.E. Computer Science and Engineering',
      duration: '2022 – 2026',
      score: 'CGPA: 8.2 / 10',
    },
    {
      institution: 'Narayana e-Techno School, Chennai',
      degree: 'CBSE – PCMC',
      duration: '2019 – 2022',
      score: 'Percentage: 75%',
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
    revealCards.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledEducationSection id="education" ref={revealContainer}>
      <h2 className="numbered-heading">Education</h2>

      <div className="education-grid">
        {educationList.map((item, i) => (
          <StyledEducationCard key={i} ref={el => (revealCards.current[i] = el)}>
            <div className="card-top">
              <h3 className="degree">{item.degree}</h3>
              <p className="institution">{item.institution}</p>
            </div>

            <div className="card-bottom">
              <span className="tag">{item.duration}</span>
              <span className="tag highlight">{item.score}</span>
            </div>
          </StyledEducationCard>
        ))}
      </div>
    </StyledEducationSection>
  );
};

export default Education;
