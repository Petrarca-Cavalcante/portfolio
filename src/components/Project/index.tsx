import {
  Project as ProjectWrapper,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
}

interface projectType {
  id: number,
  name: string,
  html_url: string,
  description: string,
  homepage: string
}
type projectsType = projectType[]

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);
  const selectedProjects: projectsType = [
    {
      id: 1,
      name: "BiblioteKa",
      homepage: "https://biblioteka-77uf.onrender.com/api/docs/swagger-ui/#/",
      description: "O BandKamp é um sistema gerenciador de bibliotecas, desenvolvido em Django para permitir a organização e empréstimos de livros de forma eficiente e facilitada. Principais tecnologias: Django, Python-dotenv, e gunicorn(deploy pode entrar e modo repouso, então póde demorar um pouco pra carregar)",
      html_url: "https://github.com/M5-T14-G41/projeto-backend"
    },
    {
      id: 2,
      name: "KenzieBurguer",
      homepage: "https://hamburgueria-ver2.vercel.app/",
      description: "Projeto que simula um site de pedidos de uma hamburgueria, contando com login, carrinho e feed de produtos. Tecnologias:  React, TypeScript, styled components, React router dom, Context e bibliotecas   conhecidas como, react-hook-form e yup entre outras.",
      html_url: "https://github.com/Kenzie-Academy-Brasil-Developers/hamburgueria-ver2"
    },
    {
      id: 3,
      name: "Close Worker",
      homepage: "https://close-work.vercel.app/home",
      description: "Projeto realizado em equipe que visa a aproximação de fornecedores de serviços diversos e clientes de locais próximos. Com a primeira etapa de desenvolvimento focada na área de Jacarepaguá-RJ. Tecnologias: React, TypeScript, styled components, React router dom, Context e bibliotecas   conhecidas como, react-hook-form e yup entre outras.",
      html_url: "https://github.com/closeWorker/closeWork"
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      const data: Response = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos`
      )

      const json = await data.json();

      setRepositories(json);

      if (!data.ok) {
        throw data;
      }
      return json;
    };
    fetchData();
  }, []);

  return (
    <>
      {selectedProjects.map((project) => (
        < ProjectWrapper key={project.id} >
          <Text
            as="h2"
            type="heading3"
            css={{ marginBottom: "$3" }}
            color="grey1"
          >
            {project.name}
          </Text>
          < Text type="body1" color="grey2" >
            {project.description}
          </Text >
          <ProjectLinks>
            <ProjectLink target="_blank" href={project.html_url}>
              <FaGithub /> Github Code
            </ProjectLink>
            {project.homepage && (
              <ProjectLink target="_blank" href={project.homepage}>
                <FaShare /> Aplicação
              </ProjectLink>
            )}
          </ProjectLinks>

        </ProjectWrapper >
      ))}
      {repositories?.map((repository) => (
        < ProjectWrapper key={repository.id} >
          <Text
            as="h2"
            type="heading3"
            css={{ marginBottom: "$3" }}
            color="grey1"
          >
            {repository.name}
          </Text>

          {
            repository.language && (
              <ProjectStack>
                <Text type="body2">Linguagem:</Text>
                <ProjectStackTech>
                  <Text color="brand1" type="body2">
                    {repository.language}
                  </Text>
                </ProjectStackTech>
              </ProjectStack>
            )
          }

          < Text type="body1" color="grey2" >
            {repository.description}
          </Text >
          <ProjectLinks>
            <ProjectLink target="_blank" href={repository.html_url}>
              <FaGithub /> Github Code
            </ProjectLink>
            {repository.homepage && (
              <ProjectLink target="_blank" href={repository.homepage}>
                <FaShare /> Aplicação
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectWrapper >
      ))}
    </>
  );
};

