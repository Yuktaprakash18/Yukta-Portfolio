import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 650px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    margin-bottom: 20px;
  }

  p {
    color: var(--slate);
    font-size: var(--fz-lg);
    line-height: 1.6;
  }

  .location {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 15px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--green);
  }

  .contact-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .linkedin-link {
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

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I’m always open to discussing software development, AI/ML opportunities, and interesting
        technology projects. Feel free to connect.
      </p>

      <div className="location">
        <span>📍 Mysore, Karnataka, India</span>
      </div>

      <div className="contact-buttons">
        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
        <a
          className="linkedin-link"
          href="https://linkedin.com/in/yukta-prakash-68005b2bb"
          target="_blank"
          rel="noopener noreferrer">
          Connect on LinkedIn
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
