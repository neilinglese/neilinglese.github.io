/**
 * Portfolio JavaScript
 * Handles project showcase, navigation, and interactions
 */

class Portfolio {
  constructor() {
    this.projects = [];
    this.activeProject = null;
    this.activeProjectIndex = 0;
    this.activeMediaIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.init();
  }

  async init() {
    await this.loadProjects();
    this.setupNavigation();
    this.setupScrollEffects();
    this.renderProjects();
    this.setupProjectDetail();
    this.setupMobileSwipe();
    this.setupContactForm();
  }

  // ==================== DATA LOADING ====================

  async loadProjects() {
    try {
      const response = await fetch("data/projects.json");
      const data = await response.json();
      this.projects = data.projects;
    } catch (error) {
      console.error("Error loading projects:", error);
      // Fallback to hardcoded projects if JSON fails
      this.projects = this.getDefaultProjects();
    }
  }

  getDefaultProjects() {
    return [
      {
        id: "sportslock",
        name: "SportsLock",
        description:
          "A revolutionary daily fantasy sports application built for a Chicago startup. Features real-time game updates, player statistics, and an intuitive betting interface.",
        technologies: ["Xamarin", "C#", "Azure SQL", "XAML"],
        category: "Mobile App",
        media: [
          { type: "image", src: "images/portfolio/sportslock/slOne.png" },
          { type: "image", src: "images/portfolio/sportslock/slTwo.png" },
          { type: "image", src: "images/portfolio/sportslock/slThree.png" },
          { type: "image", src: "images/portfolio/sportslock/slFour.png" },
        ],
        thumbnail: "images/portfolio/sportslock/slOne.png",
      },
      {
        id: "monologues",
        name: "Monologues",
        description:
          "A digital artist book bringing the Four Monologues to an interactive digital format. Features elegant typography, smooth animations, and immersive reading experience.",
        technologies: ["Ionic", "Angular", "Firebase", "CSS"],
        category: "Web App",
        media: [
          { type: "image", src: "images/portfolio/monologues/mOne.png" },
          { type: "image", src: "images/portfolio/monologues/mTwo.png" },
          { type: "image", src: "images/portfolio/monologues/mThree.png" },
          { type: "image", src: "images/portfolio/monologues/mFour.png" },
        ],
        thumbnail: "images/portfolio/monologues/mOne.png",
      },
      {
        id: "rhythmrain",
        name: "Rhythm Rain",
        description:
          "An innovative mobile rhythm game that syncs with your own music library. Features dynamic gameplay that adapts to any song's tempo and beats.",
        technologies: ["C#", ".NET", "Unity"],
        category: "Game",
        media: [
          { type: "image", src: "images/portfolio/rhythmrain/GameOne.png" },
          { type: "image", src: "images/portfolio/rhythmrain/GameTwo.png" },
          { type: "image", src: "images/portfolio/rhythmrain/GameThree.png" },
        ],
        thumbnail: "images/portfolio/rhythmrain/GameOne.png",
      },
      {
        id: "viewchicago",
        name: "View Chicago",
        description:
          "A self-guided architectural tour application developed in collaboration with the AIA and Columbia College. Features GPS navigation, audio guides, and detailed building information.",
        technologies: ["Swift", "iOS", "Firebase", "MapKit"],
        category: "Mobile App",
        media: [
          { type: "image", src: "images/portfolio/viewchicago/vcOne.png" },
          { type: "image", src: "images/portfolio/viewchicago/vcTwo.png" },
          { type: "image", src: "images/portfolio/viewchicago/vcThree.png" },
          { type: "image", src: "images/portfolio/viewchicago/vcFour.png" },
        ],
        thumbnail: "images/portfolio/viewchicago/vcOne.png",
      },
      {
        id: "marksramek",
        name: "Mark Sramek Portfolio",
        description:
          "A clean, professional portfolio website designed to showcase creative work. Features smooth animations, responsive design, and an elegant gallery system.",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "Website",
        media: [
          { type: "image", src: "images/portfolio/marksramek/msOne.png" },
        ],
        thumbnail: "images/portfolio/marksramek/msOne.png",
      },
    ];
  }

  // ==================== NAVIGATION ====================

  setupNavigation() {
    const navbar = document.querySelector(".navbar");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Scroll effect for navbar
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    // Mobile menu toggle
    navToggle?.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu on link click
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle?.classList.remove("active");
        navMenu?.classList.remove("active");
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          const offset = 80;
          const targetPosition =
            target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // ==================== SCROLL EFFECTS ====================

  setupScrollEffects() {
    // Scroll progress bar
    const scrollProgress = document.querySelector(".scroll-progress");

    window.addEventListener("scroll", () => {
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = `${scrolled}%`;
      }
    });

    // Intersection observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe elements with fade-in effect
    document
      .querySelectorAll(".service-card, .project-card, .skill-category")
      .forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
      });
  }

  // ==================== PROJECTS ====================

  renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    container.innerHTML = "";

    this.projects.forEach((project, index) => {
      const card = this.createProjectCard(project, index);
      container.appendChild(card);
    });

    // Setup project navigation arrows
    this.setupProjectNav();

    // Auto-select first project to show detail
    if (this.projects.length > 0) {
      this.selectProject(this.projects[0]);
    }
  }

  setupProjectNav() {
    const container = document.getElementById("projects-container");
    const leftBtn = document.getElementById("projects-nav-left");
    const rightBtn = document.getElementById("projects-nav-right");

    if (!container || !leftBtn || !rightBtn) return;

    const scrollAmount = 200; // Pixels to scroll per click

    // Update arrow visibility based on scroll position
    const updateArrows = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      leftBtn.disabled = scrollLeft <= 0;
      rightBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 1;
    };

    // Initial state
    updateArrows();

    // Scroll event listener
    container.addEventListener("scroll", updateArrows);

    // Arrow click handlers
    leftBtn.addEventListener("click", () => {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Update on window resize
    window.addEventListener("resize", updateArrows);
  }

  createProjectCard(project, index) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.projectId = project.id;

    card.innerHTML = `
            <img 
                src="${project.thumbnail}" 
                alt="${project.name}" 
                class="project-image"
                loading="lazy"
            >
            <div class="project-info">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.name}</h3>
            </div>
        `;

    card.addEventListener("click", () => this.selectProject(project));

    return card;
  }

  // ==================== PROJECT DETAIL ====================

  setupProjectDetail() {
    // Detail is always visible, no close button needed
    // Add swipe indicators for mobile
    this.createSwipeIndicators();
  }

  createSwipeIndicators() {
    const projectDetail = document.getElementById("project-detail");
    if (!projectDetail) return;

    // Create indicators container
    const indicatorsHtml = `
      <div class="swipe-indicators" id="swipe-indicators"></div>
      <div class="swipe-hint">
        <span>Swipe to browse projects</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 6 15 12 9 18"></polyline>
        </svg>
      </div>
    `;
    projectDetail.insertAdjacentHTML("beforeend", indicatorsHtml);
  }

  updateSwipeIndicators() {
    const container = document.getElementById("swipe-indicators");
    if (!container) return;

    container.innerHTML = this.projects
      .map(
        (_, index) =>
          `<div class="swipe-dot ${
            index === this.activeProjectIndex ? "active" : ""
          }"></div>`
      )
      .join("");
  }

  selectProject(project) {
    // Find and store the project index
    this.activeProjectIndex = this.projects.findIndex(
      (p) => p.id === project.id
    );

    // Update active states on cards
    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("active", card.dataset.projectId === project.id);
    });

    this.activeProject = project;
    this.activeMediaIndex = 0;

    // Update swipe indicators for mobile
    this.updateSwipeIndicators();

    const gallery = document.getElementById("detail-gallery");
    const category = document.getElementById("detail-category");
    const title = document.getElementById("detail-title");
    const description = document.getElementById("detail-description");
    const tech = document.getElementById("detail-tech");
    const links = document.getElementById("detail-links");

    // Animate content change
    const detailInfo = document.querySelector(".detail-info");
    detailInfo.style.opacity = "0";
    detailInfo.style.transform = "translateX(20px)";

    setTimeout(() => {
      // Set content
      category.textContent = project.category;
      title.textContent = project.name;
      description.textContent = project.description;

      // Set tech tags
      tech.innerHTML = project.technologies
        .map((t) => `<span class="tech-tag">${t}</span>`)
        .join("");

      // Set links (if any)
      links.innerHTML = "";
      if (project.liveUrl) {
        links.innerHTML += `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary">View Live</a>`;
      }
      if (project.githubUrl) {
        links.innerHTML += `<a href="${project.githubUrl}" target="_blank" class="btn btn-outline">View Code</a>`;
      }

      // Build gallery
      this.buildGallery(project, gallery);

      // Fade in new content
      detailInfo.style.transition = "all 0.3s ease";
      detailInfo.style.opacity = "1";
      detailInfo.style.transform = "translateX(0)";
    }, 150);
  }

  buildGallery(project, container) {
    const media = project.media || [{ type: "image", src: project.thumbnail }];

    container.innerHTML = `
            <div class="gallery-main">
                ${this.createMediaElement(media[0])}
            </div>
            ${
              media.length > 1
                ? `
                <div class="gallery-thumbs">
                    ${media
                      .map(
                        (item, index) => `
                        <div class="gallery-thumb ${
                          index === 0 ? "active" : ""
                        }" data-index="${index}">
                            ${
                              item.type === "video"
                                ? `<img src="${
                                    item.poster || item.src
                                  }" alt="Thumbnail ${index + 1}">`
                                : `<img src="${item.src}" alt="Thumbnail ${
                                    index + 1
                                  }">`
                            }
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `
                : ""
            }
        `;

    // Setup thumbnail clicks
    container.querySelectorAll(".gallery-thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const index = parseInt(thumb.dataset.index);
        this.setActiveMedia(index, media, container);
      });
    });
  }

  createMediaElement(mediaItem) {
    if (mediaItem.type === "video") {
      return `
                <video controls poster="${mediaItem.poster || ""}">
                    <source src="${mediaItem.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
    } else if (mediaItem.type === "youtube") {
      return `
                <iframe 
                    src="https://www.youtube.com/embed/${mediaItem.videoId}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="width: 100%; aspect-ratio: 16/9;">
                </iframe>
            `;
    } else {
      return `<img src="${mediaItem.src}" alt="${
        this.activeProject?.name || "Project image"
      }">`;
    }
  }

  setActiveMedia(index, media, container) {
    this.activeMediaIndex = index;

    const mainContainer = container.querySelector(".gallery-main");
    mainContainer.innerHTML = this.createMediaElement(media[index]);

    container.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });
  }

  // ==================== MOBILE SWIPE ====================

  setupMobileSwipe() {
    const projectDetail = document.getElementById("project-detail");
    if (!projectDetail) return;

    const minSwipeDistance = 50;

    projectDetail.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    projectDetail.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(minSwipeDistance);
      },
      { passive: true }
    );
  }

  handleSwipe(minSwipeDistance) {
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    if (swipeDistance < 0) {
      // Swiped left - next project
      this.nextProject();
    } else {
      // Swiped right - previous project
      this.prevProject();
    }
  }

  nextProject() {
    if (this.projects.length === 0) return;

    let nextIndex = this.activeProjectIndex + 1;
    if (nextIndex >= this.projects.length) {
      nextIndex = 0; // Wrap to first
    }
    this.selectProject(this.projects[nextIndex]);
  }

  prevProject() {
    if (this.projects.length === 0) return;

    let prevIndex = this.activeProjectIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.projects.length - 1; // Wrap to last
    }
    this.selectProject(this.projects[prevIndex]);
  }

  // ==================== CONTACT FORM ====================

  setupContactForm() {
    const form = document.getElementById("contact-form");

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;

      submitBtn.innerHTML = "<span>Sending...</span>";
      submitBtn.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          this.showNotification(
            "Message sent successfully! I'll get back to you soon.",
            "success"
          );
          form.reset();
        } else {
          throw new Error("Failed to send");
        }
      } catch (error) {
        this.showNotification(
          "Failed to send message. Please try again or email directly.",
          "error"
        );
      } finally {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
      }
    });
  }

  showNotification(message, type = "info") {
    // Remove existing notification
    document.querySelector(".notification")?.remove();

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 1rem 1.5rem;
            background: ${type === "success" ? "#059669" : "#dc2626"};
            color: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideInRight 0.3s ease;
        `;

    // Add animation keyframes
    if (!document.getElementById("notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.style.animation = "slideOutRight 0.3s ease forwards";
        setTimeout(() => notification.remove(), 300);
      });

    // Auto close
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = "slideOutRight 0.3s ease forwards";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new Portfolio());
} else {
  new Portfolio();
}
