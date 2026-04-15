import React, { useState, useEffect, useRef } from "react";
import {
  LuCode,
  LuMail,
  LuLinkedin,
  LuExternalLink,
  LuGithub,
  LuMenu,
  LuX,
  LuDownload,
  LuArrowUp,
  LuPlay,
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll progress and show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        "A modern full-stack online ticketing platform for events, concerts, sports, and entertainment. The application provides seamless ticket purchasing, event management, and real-time seat selection with server-side rendering capabilities.",
      tech: [
        "Java",
        "Spring Boot",
        "Angular",
        "TypeScript",
        "PayPal API",
        "MySQL",
      ],
      link: "https://github.com/igormarkovic11/online-ticketing-service",
      image: "🎫",
    },
    {
      title: "Football Club Management Platform",
      description:
        "A modern, responsive website for FK Novo Doba football club built with React, TypeScript, and Firebase. The site features real-time match updates, player rosters, league standings, news management, and a comprehensive admin dashboard.",
      tech: [
        "React",
        "TypeScript",
        "Vite",
        "Firebase",
        "Vercel",
        "Tailwind CSS",
        "PWA",
      ],
      link: "https://github.com/igormarkovic11/fknovodoba",
      image: "⚽",
      demoLink: "https://fknovodoba.vercel.app/",
    },
    {
      title: "Booking Service (Salon / Appointment)",
      description:
        "A modern, responsive barber shop booking application built with Angular 18, Firebase, and Angular Material. The application provides a seamless booking experience for clients and comprehensive management tools for administrators.",
      tech: ["Angular", "TypeScript", "Angular Material", "Firebase", "PWA"],
      link: "https://github.com/igormarkovic11/booking",
      image: "📅",
      demoLink: "https://booking-ashen-nine.vercel.app",
    },
    {
      title: "Student Administration System (Student Project)",
      description:
        "A comprehensive student administration system (Studentska Služba) for educational institutions. This full-stack application manages student records, courses, exams, grades, and administrative tasks with separate interfaces for students, professors, and administrators.",
      tech: ["Java", "Spring Boot", "Angular", "TypeScript", "MySQL"],
      link: "https://github.com/igormarkovic11/eObrazovanje",
      image: "🎓",
    },
    {
      title: "E‑Government Module",
      description:
        "Engineered a high-performance data aggregation and reporting module for a collaborative E-Government ecosystem. Orchestrated seamless inter-service communication using Docker to ensure environment consistency.",
      tech: ["Docker", "Angular", "REST API", "Microservices"],
      link: "#",
      image: "🏛️",
    },
    {
      title: "Slagalica Mobile Game (Student Project)",
      description:
        "An Android quiz game application inspired by the popular Serbian TV show ''Slagalica''. The app features multiple game types, real-time multiplayer functionality, and a comprehensive scoring system.",
      tech: ["Java", "Android", "Android Studio", "Firebase", "Gradle"],
      link: "https://github.com/igormarkovic11/android",
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
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Email handler with fallback for desktop
  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = "igormarkovic53@gmail.com";

    // Try to open email client
    window.location.href = `mailto:${email}`;

    // Fallback: Copy to clipboard after short delay (for desktop users)
    setTimeout(() => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(email)
          .then(() => {
            alert(`Email copied to clipboard: ${email}`);
          })
          .catch(() => {
            console.log("Could not copy email");
          });
      }
    }, 100);
  };

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
      {/* Scroll Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: "3px",
          background: "linear-gradient(90deg, #a78bfa, #ec4899)",
          zIndex: 1000,
          transition: "width 0.1s ease",
        }}
      />

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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(167, 139, 250, 0.4)",
            zIndex: 999,
            transition: "all 0.3s ease",
            animation: "fadeIn 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow =
              "0 6px 28px rgba(167, 139, 250, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(167, 139, 250, 0.4)";
          }}
        >
          <LuArrowUp size={24} />
        </button>
      )}

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
              aria-label="Toggle menu"
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
              top: "70px",
              left: 0,
              right: 0,
              background: "rgba(5, 5, 20, 0.98)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid rgba(138, 43, 226, 0.2)",
              padding: "1rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              zIndex: 99,
              animation: "slideDown 0.3s ease-out",
              maxHeight: "calc(100vh - 70px)",
              overflowY: "auto",
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

        {/* Hero Section */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: isMobile ? "6rem 1.5rem 2rem" : "2rem",
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
                flexWrap: "wrap",
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
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "center",
                    }}
                  >
                    {/* Existing View Project Link */}
                    <a
                      href={project.link}
                      target="_blank"
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
                        e.currentTarget.style.color = "#c4b5fd";
                        e.currentTarget.style.gap = "0.8rem";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#a78bfa";
                        e.currentTarget.style.gap = "0.5rem";
                      }}
                    >
                      View Project <LuExternalLink size={16} />
                    </a>

                    {/* Conditional Visit Demo Link */}
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "#ffffff",
                          background:
                            "linear-gradient(135deg, #6d28d9 0%, #a78bfa 100%)",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.filter = "brightness(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.filter = "brightness(1)";
                        }}
                      >
                        Visit Demo <LuPlay size={16} />
                      </a>
                    )}
                  </div>
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
                onClick={handleEmailClick}
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

              <button
                onClick={() =>
                  window.open(
                    "https://igormarkovic11.github.io/resume.pdf",
                    "_blank",
                  )
                }
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
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(167, 139, 250, 0.1)";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow =
                    "0 8px 24px rgba(167, 139, 250, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <LuDownload size={20} />
                Download CV
              </button>
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
