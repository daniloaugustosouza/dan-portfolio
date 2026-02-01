export default function Projects() {
  return (
    <section id="projects" className="section">
      <h3 className="reveal">Projetos</h3>

      <div className="section-divider reveal"></div>

      <div className="cards reveal">
        <div className="card">
          <div className="card-figure">
            <img
              src="hair-station.png"
              alt="Hair Station projeto de app de barbearia"
            />
          </div>

          <div className="card-base">
            <h4>Hair Station</h4>
            <p>App de agendamento para barbearias, facilitando a marcação de horários.</p>
          </div>
        </div>


        <div className="card">
          <div className="card-figure">
            <img
              src="auris_2.png"
              alt="Auris projeto para pessoas com deficiência auditiva"
            />
          </div>

          <div className="card-base">
            <h4>Auris</h4>
            <p>
              Projeto de feira tecnológica para pessoas com deficiência
              auditiva
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
}
