export class Project {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];

  constructor(
    title: string,
    description: string,
    image: string,
    link: string,
    technologies: string[]
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.link = link;
    this.technologies = technologies;
  }
}
