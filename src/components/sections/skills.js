import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledSkillsSection = styled.section`
  max-width: 1000px;

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 20px;
    margin-top: 40px;
  }
`;

const StyledSkillCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  position: relative;
  padding: 25px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  border: 1px solid transparent;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.3);
  }

  .category-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: var(--fz-lg);
    font-weight: 600;
    color: var(--lightest-slate);

    &:before {
      content: '▹';
      margin-right: 10px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
    }
  }

  .skills-tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      color: var(--light-slate);
      background-color: var(--navy);
      border: 1px solid var(--lightest-navy);
      border-radius: var(--border-radius);
      padding: 5px 10px;
      transition: var(--transition);

      &:hover {
        color: var(--green);
        border-color: var(--green);
        transform: translateY(-2px);
      }
    }
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const revealCards = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const skillCategories = [
    {
      title: 'AI / ML & Generative AI',
      skills: [
        'Generative AI',
        'Large Language Models (LLMs)',
        'AI Agents',
        'Retrieval-Augmented Generation (RAG)',
        'Prompt Engineering',
        'Machine Learning',
        'Natural Language Processing (NLP)',
        'Computer Vision',
        'Vector Embeddings',
        'Semantic Search',
        'YOLOv8',
        'Scikit-learn',
      ],
    },
    {
      title: 'Programming Languages',
      skills: ['Python', 'Java (Basic)', 'C'],
    },
    {
      title: 'Software Engineering & Backend',
      skills: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Problem Solving',
        'Debugging',
        'Testing',
        'Git',
        'GitHub',
        'Flask',
        'FastAPI',
        'Spring Boot',
        'REST APIs',
      ],
    },
    {
      title: 'Frontend Development',
      skills: ['React.js', 'HTML', 'CSS'],
    },
    {
      title: 'Data & Databases',
      skills: ['SQL', 'MySQL', 'MongoDB', 'Pandas', 'NumPy', 'Matplotlib'],
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
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Technical Skills</h2>

      <div className="skills-grid">
        {skillCategories.map((category, i) => (
          <StyledSkillCard key={i} ref={el => (revealCards.current[i] = el)}>
            <h3 className="category-title">{category.title}</h3>
            <ul className="skills-tag-list">
              {category.skills.map((skill, j) => (
                <li key={j}>{skill}</li>
              ))}
            </ul>
          </StyledSkillCard>
        ))}
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
