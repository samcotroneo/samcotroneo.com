export class Project {
  title: string;
  description: string;
  link: string;
  technologies: string[];

  constructor(
    title: string,
    description: string,
    link: string,
    technologies: string[]
  ) {
    this.title = title;
    this.description = description;
    this.link = link;
    this.technologies = technologies;
  }
}
