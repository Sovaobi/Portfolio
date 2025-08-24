document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("project-preview");
  const items = document.querySelectorAll(".project-list li");

  items.forEach(item => {
    item.addEventListener("mouseover", () => {
      const newSrc = item.dataset.image;
      preview.style.opacity = 0;

      setTimeout(() => {
        preview.src = newSrc;
        preview.style.opacity = 1;
      }, 200); // Temps de transition
    });
  });
});




//SECTION 3 VIDEO//

// Mute toggle
const muteBtn = document.getElementById("mute-toggle");
const video = document.getElementById("showreel");

muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
});

// Scroll reveal animation
const videoSection = document.querySelector(".video-section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        videoSection.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(videoSection);


//CARROUSSEL MOB//

document.addEventListener('DOMContentLoaded', () => {
  const projectItems = document.querySelectorAll('.project-list li');
  const carouselContainer = document.querySelector('.projects-carousel-mobile');
  const dotsContainer = document.querySelector('.carousel-dots-mobile');

  let currentSlide = 0;
  const slides = [];

  projectItems.forEach((item, index) => {
    const imageSrc = item.dataset.image;
    const mainText = item.querySelector('.project-main')?.textContent || '';
    const subText = item.querySelector('.project-sub')?.textContent || '';
    const link = item.querySelector('a')?.getAttribute('href');

    // Crée une slide
    const slide = document.createElement(link ? 'a' : 'div');
    slide.classList.add('carousel-slide');
    if (index === 0) slide.classList.add('active');
    if (link) slide.href = link;

    slide.innerHTML = `
      <img src="${imageSrc}" alt="${mainText}">
      <span class="project-main">${mainText}</span>
      <span class="project-sub">${subText}</span>
    `;

    carouselContainer.appendChild(slide);
    slides.push(slide);

    // Crée un dot
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      showSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dotsContainer.children[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
  }
});
