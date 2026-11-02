import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 40px;

  @media (max-width: 768px) {
    grid-gap: 30px;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 35px 40px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  ${({ theme }) => theme.mixins.boxShadow};
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);

  @media (max-width: 768px) {
    padding: 30px 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-6px);
      border-color: rgba(100, 255, 218, 0.3);
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
    }
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 20px;

    .folder {
      color: var(--green);
      svg {
        width: 32px;
        height: 32px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 20px;
            height: 20px;
            margin-top: -3px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }

        &:hover,
        &:focus {
          color: var(--green);
        }
      }
    }
  }

  .project-overline {
    margin: 0 0 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    margin: 0 0 20px;
    color: var(--lightest-slate);
    font-size: clamp(22px, 4vw, 28px);
    font-weight: 600;

    a {
      color: inherit;
      &:hover {
        color: var(--green);
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.6;
    margin-bottom: 25px;

    p {
      margin: 0;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0;
    margin: auto 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--green);
      background-color: var(--navy);
      padding: 4px 10px;
      border-radius: var(--border-radius);
      border: 1px solid var(--lightest-navy);
      white-space: nowrap;
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github } = frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-top">
                  <div className="folder">
                    <Icon name="Folder" />
                  </div>
                  <div className="project-links">
                    {github && (
                      <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                        <Icon name="GitHub" />
                      </a>
                    )}
                    {external && (
                      <a
                        href={external}
                        aria-label="External Link"
                        className="external"
                        target="_blank"
                        rel="noreferrer">
                        <Icon name="External" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="project-overline">Featured Project</p>

                <h3 className="project-title">
                  {external ? (
                    <a href={external} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                  ) : (
                    title
                  )}
                </h3>

                <div
                  className="project-description"
                  dangerouslySetInnerHTML={{ __html: html }}
                />

                {tech && tech.length > 0 && (
                  <ul className="project-tech-list">
                    {tech.map((techName, idx) => (
                      <li key={idx}>{techName}</li>
                    ))}
                  </ul>
                )}
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
