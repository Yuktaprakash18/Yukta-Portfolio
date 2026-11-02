import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificationsSection = styled.section`
  max-width: 900px;

  .certifications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
    margin-top: 40px;
  }
`;

const StyledCertCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 25px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.25);
    box-shadow: 0 15px 30px -15px var(--navy-shadow);
  }

  .card-icon {
    color: var(--green);
    margin-bottom: 20px;

    svg {
      width: 28px;
      height: 28px;
    }
  }

  .cert-title {
    font-size: var(--fz-xl);
    font-weight: 600;
    color: var(--lightest-slate);
    line-height: 1.3;
    margin-bottom: 15px;
  }

  .cert-meta {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--light-slate);

    .issuer {
      color: var(--green);
    }
  }

  .badge {
    margin-top: 20px;
    align-self: flex-start;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--green);
    background-color: var(--navy);
    padding: 4px 10px;
    border-radius: var(--border-radius);
    border: 1px solid var(--lightest-navy);
  }
`;

const Certifications = () => {
  const revealContainer = useRef(null);
  const revealCards = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const certList = [
    {
      title: 'AI Fluency Framework & Foundations',
      issuer: 'Anthropic',
      date: 'July 2026',
      badge: 'Certified',
    },
    {
      title: 'Microsoft Luxor Workshop',
      issuer: 'Microsoft',
      date: null,
      badge: 'Participant',
    },
    {
      title: 'Smart India Hackathon (SIH)',
      issuer: 'Ministry of Education & AICTE',
      date: null,
      badge: 'Participant',
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
    <StyledCertificationsSection id="certifications" ref={revealContainer}>
      <h2 className="numbered-heading">Certifications &amp; Workshops</h2>

      <div className="certifications-grid">
        {certList.map((item, i) => (
          <StyledCertCard key={i} ref={el => (revealCards.current[i] = el)}>
            <div>
              <div className="card-icon">
                <Icon name="Bookmark" />
              </div>
              <h3 className="cert-title">{item.title}</h3>
              <div className="cert-meta">
                <span className="issuer">{item.issuer}</span>
                {item.date && <span> — {item.date}</span>}
              </div>
            </div>

            <div className="badge">{item.badge}</div>
          </StyledCertCard>
        ))}
      </div>
    </StyledCertificationsSection>
  );
};

export default Certifications;
