import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: calc(var(--nav-height) + 70px) 0 0;
  box-sizing: border-box;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 1.1;
  }

  .headline {
    margin-top: 12px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-xs), 3vw, var(--fz-md));
    letter-spacing: 0.05em;
  }

  p {
    margin: 20px 0 0;
    max-width: 650px;
    line-height: 1.6;
    color: var(--slate);
  }

  .cta-container {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 45px;
    flex-wrap: wrap;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .resume-btn {
    ${({ theme }) => theme.mixins.bigButton};
    background-color: transparent;
    border: 1px solid var(--slate);
    color: var(--light-slate);

    &:hover,
    &:focus {
      border-color: var(--green);
      color: var(--green);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Yukta Prakash.</h2>;
  const three = <h3 className="big-heading">I build intelligent software solutions.</h3>;
  const headline = (
    <div className="headline">
      Computer Science Graduate | Software Developer | AI/ML &amp; Generative AI 
    </div>
  );
  const four = (
    <p>
      Computer Science and Engineering graduate with hands-on experience in Python,
    software development, Machine Learning, Generative AI, and Large Language Models.
    Interested in building intelligent applications, AI-powered agents, and practical
    software solutions. Currently seeking opportunities in Software Engineering,
    Python Development, and AI/ML.
    </p>
  );
  const five = (
    <div className="cta-container">
      <a className="email-link" href="/#projects">
        Explore My Work
      </a>
      <a
        className="resume-btn"
        href="/Yukta_Prakash_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer">
        Download Resume
      </a>
    </div>
  );

  const items = [one, two, three, headline, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
