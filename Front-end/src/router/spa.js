/** @format */

class SpaRouter {
  constructor() {
    this.currentPage = "home";
    this.pages = {
      home: () => this.renderHome(),
      features: () => this.renderFeatures(),
      about: () => this.renderAbout(),
    };
  }

  init() {
    this.setupRouting();
    this.renderHome();
  }

  setupRouting() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-route]");
      if (link) {
        e.preventDefault();
        const route = link.dataset.route;
        this.navigateTo(route);
      }
    });

    window.addEventListener("popstate", () => {
      const route = window.location.hash.slice(1) || "home";
      this.loadPage(route);
    });
  }

  navigateTo(route) {
    if (this.currentPage === route) return;

    const mainContent = document.querySelector(".main-container");
    mainContent.classList.add("fade-out");

    setTimeout(() => {
      this.loadPage(route);
      mainContent.classList.remove("fade-out");
      mainContent.classList.add("fade-in");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }

  loadPage(route) {
    this.currentPage = route;
    window.location.hash = route;
    const renderer = this.pages[route] || this.pages.home;
    renderer();
  }

  renderHome() {
    const container = document.querySelector(".main-container");
    container.innerHTML = `
      <header class="hero-section fade-in-down">
        <h1>Dicoding Learning Buddy</h1>
        <p>Platform pembelajaran AI-powered untuk mengakselerasi skill development Anda.</p>
        <nav class="nav-buttons">
          <a href="#features" data-route="features" class="nav-link">Lihat Fitur →</a>
          <a href="#about" data-route="about" class="nav-link secondary">Tentang Kami →</a>
        </nav>
      </header>

      <section class="features-section" id="features">
        <h2 class="section-title fade-in-up" style="animation-delay: 0.1s">
          Fitur Unggulan
        </h2>
        <div class="features-grid">
          <div class="feature-card fade-in-up" style="animation-delay: 0.2s">
            <h3>Fitur A</h3>
            <p>Smart Assessment - Sistem assessment interaktif yang mengukur pemahaman Anda secara real-time dengan AI-powered feedback.</p>
            <a href="#features" data-route="features" class="feature-btn">Pelajari Lebih Lanjut</a>
          </div>
          <div class="feature-card fade-in-up" style="animation-delay: 0.3s">
            <h3>Fitur B</h3>
            <p>Interactive Chat - Chatbot cerdas siap membantu menjawab pertanyaan kapan saja dengan penjelasan detail dan rekomendasi.</p>
            <a href="#features" data-route="features" class="feature-btn">Pelajari Lebih Lanjut</a>
          </div>
          <div class="feature-card fade-in-up" style="animation-delay: 0.4s">
            <h3>Fitur C</h3>
            <p>Roadmap Generator - Buat roadmap pembelajaran personal yang dinamis sesuai skill dan tujuan karir Anda.</p>
            <a href="#features" data-route="features" class="feature-btn">Pelajari Lebih Lanjut</a>
          </div>
        </div>
      </section>

      <section class="about-section" id="about">
        <h2 class="section-title fade-in-up" style="animation-delay: 0.1s">
          Tentang Learning Buddy
        </h2>
        <div class="about-grid">
          <div class="about-card fade-in-up" style="animation-delay: 0.2s">
            <div class="card-icon"></div>
            <h3>Inovasi</h3>
            <p>Platform pembelajaran dengan teknologi AI terdepan.</p>
          </div>
          <div class="about-card fade-in-up" style="animation-delay: 0.3s">
            <div class="card-icon"></div>
            <h3>Edukasi</h3>
            <p>Kualitas terbaik dalam setiap konten pembelajaran.</p>
          </div>
          <div class="about-card fade-in-up" style="animation-delay: 0.4s">
            <div class="card-icon"></div>
            <h3>Inspirasi</h3>
            <p>Memberdayakan setiap siswa untuk mencapai impian mereka.</p>
          </div>
        </div>
      </section>
    `;

    this.triggerHomeCardAnimations();
    this.setupRippleEffect();
  }

  renderFeatures() {
    const container = document.querySelector(".main-container");
    container.innerHTML = `
      <header class="hero-section fade-in-down">
        <a href="#home" data-route="home" class="back-link">← Kembali</a>
        <h1>Fitur Unggulan</h1>
        <p>Jelajahi semua fitur canggih Learning Buddy</p>
      </header>

      <section class="features-detail-section">
        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="card-head"><h3>Fitur A - Smart Assessment</h3></div>
          <p>Sistem assessment interaktif yang mengukur pemahaman Anda secara real-time dengan AI-powered feedback yang personal dan actionable.</p>
          <div class="feature-tags">
            <span class="tag">AI-Powered</span>
            <span class="tag">Real-time</span>
            <span class="tag">Personal</span>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="card-head"><h3>Fitur B - Interactive Chat</h3></div>
          <p>Chatbot cerdas yang siap membantu menjawab pertanyaan Anda kapan saja. Dapatkan penjelasan detail, tips belajar, dan rekomendasi kursus yang tepat.</p>
          <div class="feature-tags">
            <span class="tag">24/7 Available</span>
            <span class="tag">Smart Reply</span>
            <span class="tag">Contextual</span>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon"></div>
          <div class="card-head"><h3>Fitur C - Roadmap Generator</h3></div>
          <p>Buat roadmap pembelajaran yang dipersonalisasi berdasarkan skill Anda saat ini dan target karir yang ingin dicapai. Update otomatis seiring progress Anda.</p>
          <div class="feature-tags">
            <span class="tag">Personalized</span>
            <span class="tag">Dynamic</span>
            <span class="tag">Adaptive</span>
          </div>
        </div>
      </section>
    `;

    this.animateFeatureCards();
  }

  renderAbout() {
    const container = document.querySelector(".main-container");
    container.innerHTML = `
      <header class="hero-section fade-in-down">
        <a href="#home" data-route="home" class="back-link">← Kembali</a>
        <h1>Tentang Learning Buddy</h1>
        <p>Mengenal lebih jauh tentang misi dan visi kami</p>
      </header>

      <section class="about-hero fade-in-up">
        <div class="about-hero-content">
          <h2>Kami Membangun Masa Depan Pendidikan</h2>
          <p>Learning Buddy adalah platform revolusioner yang mengubah cara Anda belajar dengan teknologi AI terdepan dan mentoring personal yang disesuaikan dengan kebutuhan unik Anda.</p>
        </div>
        <div class="about-hero-stats">
          <div class="stat-item">
            <div class="stat-number">50K+</div>
            <div class="stat-label">Active Learners</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">10K+</div>
            <div class="stat-label">Courses</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">95%</div>
            <div class="stat-label">Success Rate</div>
          </div>
        </div>
      </section>

      <section class="about-mission-vision fade-in-up">
        <div class="mission-card">
          <div class="mission-header">
            <div class="mission-icon"></div>
            <h3>Misi Kami</h3>
          </div>
          <p>Kami percaya bahwa setiap individu berhak mendapatkan akses ke pendidikan berkualitas tinggi yang dipersonalisasi. Learning Buddy hadir untuk membantu Anda menemukan jalur pembelajaran yang paling efektif sesuai dengan kecepatan dan gaya belajar Anda sendiri.</p>
        </div>

        <div class="vision-card">
          <div class="vision-header">
            <div class="vision-icon"></div>
            <h3>Visi Kami</h3>
          </div>
          <p>Menjadi platform pembelajaran yang paling inovatif dan terpercaya di Asia Tenggara, dengan memberdayakan jutaan learner untuk mencapai potensi penuh mereka melalui teknologi AI yang canggih dan konten berkualitas premium.</p>
        </div>
      </section>

      <section class="about-values fade-in-up">
        <h2 class="section-title">Nilai-Nilai Kami</h2>
        <div class="values-grid">
          <div class="value-card value-card-1 fade-in-up">
            <div class="value-icon"></div>
            <h3>Inovasi</h3>
            <p>Kami terus berinovasi dengan teknologi terbaru untuk memberikan pengalaman belajar yang tak tertandingi.</p>
            <div class="value-accent"></div>
          </div>

          <div class="value-card value-card-2 fade-in-up">
            <div class="value-icon"></div>
            <h3>Kualitas</h3>
            <p>Setiap konten dikurasi oleh expert industri untuk memastikan relevansi dan akurasi terkini.</p>
            <div class="value-accent"></div>
          </div>

          <div class="value-card value-card-3 fade-in-up">
            <div class="value-icon"></div>
            <h3>Komunitas</h3>
            <p>Bergabunglah dengan ribuan learner yang saling mendukung dalam perjalanan belajar mereka.</p>
            <div class="value-accent"></div>
          </div>

          <div class="value-card value-card-4 fade-in-up">
            <div class="value-icon"></div>
            <h3>Kesuksesan</h3>
            <p>Ratusan alumni telah berhasil meraih posisi impian mereka melalui Learning Buddy.</p>
            <div class="value-accent"></div>
          </div>
        </div>
      </section>

      <section class="about-team fade-in-up">
        <h2 class="section-title">Tim Kami</h2>
        <p class="team-subtitle">Dipimpin oleh para expert dari Dicoding dengan pengalaman puluhan tahun di industri tech</p>
        <div class="team-grid">
          <div class="team-member fade-in-up">
            <div class="member-avatar"></div>
            <h3>Rafi Ananda</h3>
            <p class="member-role">Founder & CEO</p>
            <p class="member-bio">Visioner dalam pendidikan teknologi dengan 10+ tahun pengalaman</p>
          </div>

          <div class="team-member fade-in-up">
            <div class="member-avatar"></div>
            <h3>Sarah Putri</h3>
            <p class="member-role">CTO</p>
            <p class="member-bio">AI & Machine Learning expert, alumni top tech companies</p>
          </div>

          <div class="team-member fade-in-up">
            <div class="member-avatar"></div>
            <h3>Budi Santoso</h3>
            <p class="member-role">Head of Content</p>
            <p class="member-bio">Kurator konten dengan track record mengajar di universitas ternama</p>
          </div>
        </div>
      </section>

      <section class="about-cta fade-in-up">
        <h2>Siap Memulai Perjalanan Belajar Anda?</h2>
        <p>Bergabunglah dengan ribuan learner yang telah bertransformasi bersama Learning Buddy</p>
        <a href="#home" data-route="home" class="cta-button">Kembali ke Beranda</a>
      </section>
    `;
  }

  animateFeatureCards() {
    const cards = Array.from(
      document.querySelectorAll(".features-detail-section .feature-card")
    );
    cards.forEach((c) => {
      c.classList.remove("is-visible", "shimmer", "animate-shine");
    });

    cards.forEach((card, i) => {
      const delay = i * 120;
      setTimeout(() => {
        card.classList.add("is-visible");

        card.classList.add("shimmer");

        requestAnimationFrame(() => card.classList.add("animate-shine"));

        setTimeout(() => {
          card.classList.remove("shimmer", "animate-shine");
        }, 1100);
      }, 180 + delay);
    });

    cards.forEach((card, i) => {
      const head = card.querySelector(".card-head");
      const p = card.querySelector("p");
      if (head) head.style.transitionDelay = `${0.18 + i * 0.08}s`;
      if (p) p.style.transitionDelay = `${0.26 + i * 0.08}s`;
    });
  }

  setupRippleEffect() {
    const buttons = document.querySelectorAll(".feature-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;

        const ripple = document.createElement("span");
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  triggerHomeCardAnimations() {
    const cards = Array.from(
      document.querySelectorAll(".features-grid .feature-card")
    );

    cards.forEach((card, i) => {
      const delay = 100 + i * 150;
      setTimeout(() => {
        card.classList.add("is-visible");

        card.classList.add("shimmer");
        requestAnimationFrame(() => card.classList.add("animate-shine"));
        setTimeout(() => {
          card.classList.remove("shimmer", "animate-shine");
        }, 1100);
      }, delay);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const router = new SpaRouter();
  router.init();
});
