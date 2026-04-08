import React, { useState, useEffect, useRef } from "react";
import {
  LuCode,
  LuMail,
  LuLinkedin,
  LuExternalLink,
  LuGithub,
  LuMenu,
  LuX,
} from "react-icons/lu";

// --- Star class (outside component) ---
class Star {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    this.z = Math.random() * this.width;
    this.prevZ = this.z;
  }

  update(speed) {
    this.prevZ = this.z;
    this.z -= speed;
    if (this.z <= 0) this.reset();
  }

  draw(ctx) {
    const sx = (this.x - this.width / 2) * (this.width / this.z);
    const sy = (this.y - this.height / 2) * (this.width / this.z);
    const x = sx + this.width / 2;
    const y = sy + this.height / 2;

    const prevSx = (this.x - this.width / 2) * (this.width / this.prevZ);
    const prevSy = (this.y - this.height / 2) * (this.width / this.prevZ);
    const prevX = prevSx + this.width / 2;
    const prevY = prevSy + this.height / 2;

    const size = Math.max(0, (1 - this.z / this.width) * 2);
    const opacity = Math.max(0, 1 - this.z / this.width);

    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = size;
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = `rgba(200, 220, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const Portfolio = () => {
  const canvasRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Starfield animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let stars = Array.from({ length: 200 }, () => new Star(width, height));
    let animationFrameId;
    const speed = 1.5;

    const render = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      stars.forEach((star) => {
        star.update(speed);
        star.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: 200 }, () => new Star(width, height));
    };

    window.addEventListener("resize", handleResize);
    render();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ----- CV‑BASED CONTENT -----
  const projects = [
    {
      title: "Ticketing Service (Bachelor's Thesis)",
      description:
        "Football club ticketing system with PayPal integration. Built with Spring Boot (backend) and Angular (frontend). RESTful architecture, secure transactions.",
      tech: ["Spring Boot", "Angular", "PayPal API", "MySQL"],
      link: "#",
      image: "🎫",
    },
    {
      title: "Football Club Management Platform",
      description:
        "High‑performance platform with live match commentary, roster management, league standings, and admin dashboard. Built with React, Vite, Firebase, deployed on Vercel.",
      tech: ["React", "Vite", "Firebase", "Vercel", "PWA"],
      link: "#",
      image: "⚽",
    },
    {
      title: "Booking Service (Salon / Appointment)",
      description:
        "Appointment scheduling system with user time‑slot selection and admin panel. Focus on clean, structured design.",
      tech: ["Angular", "Firebase", "PWA"],
      link: "#",
      image: "📅",
    },
    {
      title: "Hospital Management Desktop App (Student Project)",
      description:
        "Full CRUD operations for doctors, patients, medical records, and appointments. Built with .NET (WPF).",
      tech: [".NET", "WPF", "C#", "SQL Server"],
      link: "#",
      image: "🏥",
    },
    {
      title: "E‑Government Module (Student Project)",
      description:
        "Statistics Department module with data aggregation and reporting. Containerised with Docker, inter‑service communication.",
      tech: ["Docker", "Angular", "Team Collaboration"],
      link: "#",
      image: "🏛️",
    },
    {
      title: "Slagalica Mobile Game (Student Project)",
      description:
        "Android quiz app with word puzzles and math challenges, real‑time scoring and state management.",
      tech: ["Java", "Android Studio"],
      link: "#",
      image: "📱",
    },
  ];

  const techStack = {
    Languages: ["Java", "C#", "TypeScript", "JavaScript", "HTML5", "CSS3"],
    Frameworks: ["Spring Boot", ".NET", "Angular", "React"],
    Databases: ["MySQL", "MS SQL Server", "PostgreSQL"],
    Tools: ["Docker", "Android Studio", "Scrum", "Git", "Vite", "Firebase"],
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMenuOpen(false); // close mobile menu after click
    }
  };

  // Nav links array for reuse
  const navLinks = ["home", "about", "projects", "tech", "contact"];

  return (
    <div
      style={{
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
        background:
          "linear-gradient(to bottom, #050514 0%, #0a0a1e 50%, #1a0a2e 100%)",
        color: "#e0e0ff",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Glow effects */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          right: "10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          left: "15%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(75, 0, 130, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
          zIndex: 0,
          pointerEvents: "none",
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Navigation */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(10px)",
            background: "rgba(5, 5, 20, 0.7)",
            borderBottom: "1px solid rgba(138, 43, 226, 0.2)",
            zIndex: 100,
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Igor Marković
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div style={{ display: "flex", gap: "2rem" }}>
              {navLinks.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  style={{
                    background: "none",
                    border: "none",
                    color: activeSection === section ? "#a78bfa" : "#e0e0ff",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                    textTransform: "capitalize",
                    transition: "all 0.3s ease",
                    position: "relative",
                    padding: "0.5rem 0",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#a78bfa")}
                  onMouseLeave={(e) =>
                    (e.target.style.color =
                      activeSection === section ? "#a78bfa" : "#e0e0ff")
                  }
                >
                  {section}
                  {activeSection === section && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "linear-gradient(90deg, #a78bfa, #ec4899)",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Hamburger Button */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "#e0e0ff",
                cursor: "pointer",
                fontSize: "1.8rem",
                display: "flex",
                alignItems: "center",
                fontFamily: "inherit",
              }}
            >
              {isMenuOpen ? <LuX size={28} /> : <LuMenu size={28} />}
            </button>
          )}
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobile && isMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: "70px", // adjust based on nav height
              left: 0,
              right: 0,
              background: "rgba(5, 5, 20, 0.95)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(138, 43, 226, 0.2)",
              padding: "1rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              zIndex: 99,
            }}
          >
            {navLinks.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeSection === section ? "#a78bfa" : "#e0e0ff",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "capitalize",
                  padding: "0.5rem 0",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                {section}
              </button>
            ))}
          </div>
        )}

        {/* Hero Section (unchanged) */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div style={{ maxWidth: "800px" }}>
            <div
              style={{
                fontSize: "1.2rem",
                color: "#a78bfa",
                marginBottom: "1rem",
                fontWeight: "500",
                animation: "slideDown 0.8s ease-out",
                animationDelay: "0.2s",
                animationFillMode: "both",
              }}
            >
              Hello, I'm
            </div>
            <h1
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: "800",
                marginBottom: "1.5rem",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1.1",
                animation: "slideDown 0.8s ease-out",
                animationDelay: "0.4s",
                animationFillMode: "both",
                letterSpacing: "-0.03em",
              }}
            >
              Software Engineer
            </h1>
            <p
              style={{
                fontSize: "1.3rem",
                color: "#b8b8d8",
                marginBottom: "3rem",
                lineHeight: "1.6",
                animation: "slideDown 0.8s ease-out",
                animationDelay: "0.6s",
                animationFillMode: "both",
                fontWeight: "300",
              }}
            >
              Crafting elegant solutions to complex problems.
              <br />
              Passionate about clean code and innovative technology.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                animation: "slideDown 0.8s ease-out",
                animationDelay: "0.8s",
                animationFillMode: "both",
              }}
            >
              <button
                onClick={() => scrollToSection("projects")}
                style={{
                  padding: "1rem 2.5rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  background:
                    "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 32px rgba(167, 139, 250, 0.3)",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 12px 40px rgba(167, 139, 250, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 8px 32px rgba(167, 139, 250, 0.3)";
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                style={{
                  padding: "1rem 2.5rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  background: "transparent",
                  color: "#a78bfa",
                  border: "2px solid #a78bfa",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(167, 139, 250, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* About Section (includes Education) */}
        <section
          id="about"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 2rem",
          }}
        >
          <div style={{ maxWidth: "900px", width: "100%" }}>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "800",
                marginBottom: "3rem",
                background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              About Me
            </h2>
            <div
              style={{
                background: "rgba(138, 43, 226, 0.05)",
                backdropFilter: "blur(10px)",
                borderRadius: "24px",
                padding: "3rem",
                border: "1px solid rgba(167, 139, 250, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#d0d0e8",
                  marginBottom: "1.5rem",
                  fontWeight: "300",
                }}
              >
                Developer with a strong desire to grow and a proactive approach
                to solving complex problems. I am a fast learner who is
                passionate about understanding the full scope of software
                development. I am eager to apply my dedication and openness to
                feedback within a forward‑thinking team.
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#d0d0e8",
                  marginBottom: "1.5rem",
                  fontWeight: "300",
                }}
              >
                I specialise in full‑stack development, with solid experience in
                Spring Boot, .NET, Angular, and React. I enjoy building secure,
                well‑structured applications – from e‑commerce and ticketing
                systems to mobile games and hospital management software.
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.8",
                  color: "#d0d0e8",
                  marginBottom: "1.5rem",
                  fontWeight: "300",
                }}
              >
                When I'm not coding, I play football, basketball, video games,
                or chess. I also like contributing to open‑source and exploring
                new technologies.
              </p>

              {/* Education section inside About */}
              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(167, 139, 250, 0.3)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#a78bfa",
                    marginBottom: "1rem",
                  }}
                >
                  Education
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  <div>
                    <strong>Faculty of Technical Sciences, Novi Sad</strong>
                    <br />
                    Software and Information Technologies (2019–2025)
                  </div>
                  <div>
                    <strong>High School "Mihajlo Pupin", Bijeljina</strong>
                    <br />
                    Computer Technician (2015–2019)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          style={{
            minHeight: "100vh",
            padding: "4rem 2rem",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "800",
                marginBottom: "3rem",
                background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              Featured Projects
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(138, 43, 226, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "2rem",
                    border: "1px solid rgba(167, 139, 250, 0.2)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    animation: "fadeIn 0.6s ease-out",
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(167, 139, 250, 0.3)";
                    e.currentTarget.style.borderColor =
                      "rgba(167, 139, 250, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor =
                      "rgba(167, 139, 250, 0.2)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "4rem",
                      marginBottom: "1rem",
                      textAlign: "center",
                    }}
                  >
                    {project.image}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                      color: "#ffffff",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#b8b8d8",
                      marginBottom: "1.5rem",
                      lineHeight: "1.6",
                      fontWeight: "300",
                    }}
                  >
                    {project.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          padding: "0.4rem 0.8rem",
                          background: "rgba(167, 139, 250, 0.15)",
                          color: "#c4b5fd",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: "500",
                          border: "1px solid rgba(167, 139, 250, 0.3)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#a78bfa",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#c4b5fd";
                      e.target.style.gap = "0.8rem";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#a78bfa";
                      e.target.style.gap = "0.5rem";
                    }}
                  >
                    View Project <LuExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section
          id="tech"
          style={{
            minHeight: "100vh",
            padding: "4rem 2rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "800",
                marginBottom: "3rem",
                background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                letterSpacing: "-0.02em",
              }}
            >
              Technology Stack
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "2rem",
              }}
            >
              {Object.entries(techStack).map(
                ([category, technologies], index) => (
                  <div
                    key={category}
                    style={{
                      background: "rgba(138, 43, 226, 0.05)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "20px",
                      padding: "2rem",
                      border: "1px solid rgba(167, 139, 250, 0.2)",
                      animation: "fadeIn 0.6s ease-out",
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: "both",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        marginBottom: "1.5rem",
                        color: "#a78bfa",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <LuCode size={20} />
                      {category}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.8rem",
                      }}
                    >
                      {technologies.map((tech, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "0.8rem 1rem",
                            background: "rgba(167, 139, 250, 0.08)",
                            borderRadius: "10px",
                            color: "#d0d0e8",
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            border: "1px solid rgba(167, 139, 250, 0.15)",
                            transition: "all 0.3s ease",
                            cursor: "default",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background =
                              "rgba(167, 139, 250, 0.15)";
                            e.target.style.borderColor =
                              "rgba(167, 139, 250, 0.4)";
                            e.target.style.transform = "translateX(5px)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background =
                              "rgba(167, 139, 250, 0.08)";
                            e.target.style.borderColor =
                              "rgba(167, 139, 250, 0.15)";
                            e.target.style.transform = "translateX(0)";
                          }}
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 2rem",
          }}
        >
          <div
            style={{ maxWidth: "700px", width: "100%", textAlign: "center" }}
          >
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "800",
                marginBottom: "2rem",
                background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              Let's Connect
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#b8b8d8",
                marginBottom: "3rem",
                lineHeight: "1.6",
                fontWeight: "300",
              }}
            >
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginBottom: "3rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:igormarkovic53@gmail.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "1rem 2rem",
                  background: "rgba(167, 139, 250, 0.1)",
                  color: "#a78bfa",
                  textDecoration: "none",
                  borderRadius: "12px",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(167, 139, 250, 0.2)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(167, 139, 250, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(167, 139, 250, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <LuMail size={24} />
                Email Me
              </a>
              <a
                href="https://github.com/igormarkovic11"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "1rem 2rem",
                  background: "rgba(167, 139, 250, 0.1)",
                  color: "#a78bfa",
                  textDecoration: "none",
                  borderRadius: "12px",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(167, 139, 250, 0.2)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(167, 139, 250, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(167, 139, 250, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <LuGithub size={24} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/igor-markovi%C4%87-38b9912b2/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "1rem 2rem",
                  background: "rgba(167, 139, 250, 0.1)",
                  color: "#a78bfa",
                  textDecoration: "none",
                  borderRadius: "12px",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(167, 139, 250, 0.2)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(167, 139, 250, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(167, 139, 250, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <LuLinkedin size={24} />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: "2rem",
            textAlign: "center",
            borderTop: "1px solid rgba(167, 139, 250, 0.2)",
            background: "rgba(5, 5, 20, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p
            style={{
              color: "#888899",
              fontSize: "0.9rem",
              fontWeight: "300",
            }}
          >
            © 2026 Igor Marković. Designed & Built with passion.
          </p>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
