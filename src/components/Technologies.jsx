const techs = [
  "JavaScript",
  "Python",
  "Java",
  "Kotlin",
  "React",
  "Node.js",
  "HTML & CSS",
  "Figma",
  "Git",
  "MySQL",
  "PostgreSQL",
  "Docker"
];

export default function Technologies() {
  return (
    <section id="technologies" className="section reveal">
      <h3 className="reveal">Tecnologias</h3>
      <div className="section-divider reveal"></div>
      

      <ul className="technologies-list reveal">
        {techs.map((tech) => (
          <li key={tech} className="tech-item">
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}
