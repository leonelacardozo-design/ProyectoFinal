import React from "react";
import Carousel from "../components/Carousel";
import InfoCard from "../components/InfoCard";
import StatsCard from "../components/StatsCard";

export default function Home() {
  return (
    <div style={styles.page}>
      <Carousel />

      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>Una sonrisa también es dignidad</h2>

        <p style={styles.aboutText}>
          Somos una organización que realiza actividades emprendedoras de
          impacto social donde predomina nuestra vocación hacia el servicio a la
          comunidad. Tenemos un enfoque que combina prevención, educación,
          acceso a servicios y políticas de salud, con el objetivo de integrar
          la salud bucal dentro de una cobertura sanitaria comunitaria de manera
          gratuita y personalizada.
        </p>

        <p style={styles.aboutText}>
          La Organización Mundial de la Salud enfatiza que la salud bucodental
          ha sido históricamente descuidada, pero la mayoría de las enfermedades
          pueden prevenirse y tratarse eficazmente mediante los recursos
          necesarios.
        </p>

        <p style={styles.aboutText}>
          Promover hábitos saludables y facilitar el acceso a productos de
          higiene es una forma concreta de construir una sociedad más justa e
          inclusiva.
        </p>

        <p style={styles.aboutText}>
          Por este motivo nuestro público objetivo son aquellos que por sus
          condiciones económicas, sociales y/o de salud son quienes más lo
          requieren: niños en edad escolar, niños con capacidades especiales,
          adolescentes liceales, estudiantes universitarios, jubilados y
          pensionistas.
        </p>

        <p style={styles.aboutText}>
          Realizamos jornadas barriales gratuitas para atención de personas con
          escasos o bajos recursos económicos haciendo revisiones, extracciones,
          limpiezas y consultas gratuitamente. Los fondos recaudados ayudan a
          financiar becas para estudiantes avanzados y recién egresados en el
          campo de la odontología quienes aportan su servicio a la comunidad de
          la mano de profesionales habilitados por el MSP ganando práctica y
          aportando talento a la sociedad.
        </p>
      </section>

      <section style={styles.cardsContainer}>
        <InfoCard
          title={
            <a
              href="https://enciclopediauniversal.com/impacto-social/"
              target="_blank"
              rel="noreferrer"
              className="infoCardLink"
            >
              ▶Organización de impacto social◀
            </a>
          }
          text="Ofrecemos productos y servicios especiales, algunos con descuentos para diferentes sectores de la comunidad para financiar nuestro proyecto de impacto social. Brindamos educación para salud en escuelas, además de ofrecer becas de pasantías para estudiantes de carreras de odontología y afines."
          images={[
            "https://centropremoden.com/wp-content/uploads/2022/05/habitos-hilo.jpg",
            "https://www.joya.life/wp-content/uploads/2021/07/Cuidado-dental-en-los-ninos-consejos-para-dientes-sanos.jpg",
            "https://www.emergencydentistsusa.com/wp-content/uploads/down-syndrome-dentists-1024x768.jpg",
          ]}
        />

        <InfoCard
          title={
            <a
              href="https://montevideo.gub.uy/tipo/area-tematica/inclusion-social/fortalecimiento-barrial"
              target="_blank"
              rel="noreferrer"
              className="infoCardLink"
            >
              ▶Campañas barriales◀
            </a>
          }
          text="Jornadas de revisión, extracción, limpiezas y consultas gratuitas en municipios barriales una vez al mes donde participan estudiantes y egresados. Nuestro fin es brindar servicio a la comunidad para aquellas personas carentes de recursos que necesitan una solución inmediata a sus problemas odontológicos."
          images={[
            "https://newdentistblog.ada.org/wp-content/uploads/2015/10/Ellen-Thrailkill.png",
            "https://i.pinimg.com/736x/b2/8c/1e/b28c1ee096012f553e12924cbc399420.jpg",
            "https://media.defense.gov/2008/May/29/2000614368/-1/-1/0/080525-F-1262C-002.JPG",
          ]}
        />

        <InfoCard
          title={
            <a
              href="https://odon.edu.uy/sitio/saludcolectiva/#1725027645472-411f9483-2a3d"
              target="_blank"
              rel="noreferrer"
              className="infoCardLink"
            >
              ▶Pasantes y profesionales◀
            </a>
          }
          text="Además de contar con personal habilitado por el MSP nuestro equipo se conforma también por estudiantes avanzados y egresados. Fomentamos el amor por el servicio, valoramos la vocación del servir a aquellos que más necesitan de atención sanitaria con la mejor calidad y empatía posible."
          images={[
            "https://www.uandes.cl/wp-content/uploads/2018/04/odontologia-uandes-slide-3.jpeg",
            "https://www.casher.es/recurso/pagina/imagen/dentista_alicante.jpg",
            "https://www.ulatina.edu.pa/wp-content/uploads/2024/03/MicrosoftTeams-image-7-scaled.jpg",
          ]}
        />
      </section>

      <section style={styles.statsContainer}>
        <StatsCard
          number="▶Revista Latinoamericana de Bioética◀"
          text="Haz click en el enlace para saber más sobre la salud bucal como derecho humano y bien ético."
          link="http://scielo.org.co/scielo.php?script=sci_arttext&pid=S1657-47022017000100003"
        />

        <StatsCard
          number="▶La salud bucal a lo largo del curso de vida◀"
          text="Clickea el enlace para saber más sobre la importancia del cuidado de tu salud bucal."
          link="https://www.youtube.com/watch?v=bDq2Um7XKPg"
        />

        <StatsCard
          number="▶El acceso a la salud es un derecho◀"
          text="Video explicativo acerca de la salud como derecho que defiende la dignidad humana de las personas."
          link="https://www.youtube.com/watch?v=_fWlUbA5EVo"
        />

        <StatsCard
          number="▶20 de marzo Día mundial de la salud bucal◀"
          text="Conoce más acerca del día mundial de la salud bucal."
          link="https://www.youtube.com/watch?v=DnQOekEP8ao"
        />
      </section>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f0f9ff",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
  },

  aboutSection: {
    width: "90%",
    maxWidth: "1000px",
    margin: "2rem auto",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  },

  sectionTitle: {
    color: "#32d5d5",
    marginBottom: "1rem",
    textAlign: "center",
    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
  },

  aboutText: {
    color: "#475569",
    lineHeight: "1.8",
    marginBottom: "1rem",
    textAlign: "justify",
    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
  },

  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    width: "90%",
    maxWidth: "1200px",
    margin: "3rem auto",
    alignItems: "stretch",
  },

  statsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1.5rem",
    width: "90%",
    margin: "0 auto 4rem auto",
  },

  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,.08)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  bannerSection: {
    width: "100%",
    marginTop: "2rem",
  },

  bannerImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },
};
