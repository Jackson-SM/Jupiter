'use client';

import { motion, Variants } from 'framer-motion';
import {
  WorkspaceCard,
  WorkspaceType,
} from '../molecules/WorkspaceCard';

export const WorkspaceContent = () => {
  const listVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const workspaces: WorkspaceType[] = [
    {
      title: 'Projetos Pessoais',
      description:
        'Projetos pessoais que estou trabalhando no momento e que são importantes para mim e para o meu crescimento profissional e pessoal como desenvolvedor de software e como pessoa em geral.',
    },
    {
      title: 'Profissional',
      description:
        'Projetos para clientes e empresas que estou trabalhando no momento e fazendo parte da minha rotina de trabalho como desenvolvedor de software.',
    },
    {
      title: 'Estudos',
      description:
        'Projetos de estudo e aprendizado geral para melhorar minhas habilidades e conhecimentos em Matemática, Química e Física, além de outras áreas de conhecimento. Também inclui projetos de estudo de idiomas.',
    },
  ];

  return (
    <motion.ul
      className="grid grid-cols-auto-fill gap-2"
      variants={listVariants}
      initial="hidden"
      animate="show"
    >
      {workspaces.map((workspace, index) => {
        return (
          <WorkspaceCard
            workspace={workspace}
            key={workspace.title + index}
          />
        );
      })}
    </motion.ul>
  );
};
