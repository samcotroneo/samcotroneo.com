export class Experience {
  role: string;
  company: string;
  date: string;
  description: string;
  skills: string[];

  constructor(
    role: string,
    company: string,
    date: string,
    description: string,
    skills: string[]
  ) {
    this.role = role;
    this.company = company;
    this.date = date;
    this.description = description;
    this.skills = skills;
  }
}
