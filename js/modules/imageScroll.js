export default class ImageScroll {
  constructor() {
    this.elements = document.querySelectorAll("[data-imageScroll]");
  }

  addImageScroll(element) {
    document.addEventListener("DOMContentLoaded", () => {
      const img = element.querySelector("img");
      const totalFrames = parseInt(element.getAttribute("data-frames")) || 1;
      const src = img.getAttribute("src");

      // Detecta número + extensão
      const match = src.match(/(\d+)(\.\w+)$/);
      const originalDigits = match[1].length;
      const extension = match[2];
      const basePath = src.replace(/(\d+)(\.\w+)$/, "");

      // Troca IMG por CANVAS
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.className = img.className;
      img.replaceWith(canvas);

      let frames = [];
      let width = 0;
      let height = 0;

      // ------------------------------------------
      // PRELOAD EXTREMAMENTE EFICIENTE
      // ------------------------------------------
      const preloadAllFrames = async () => {
        const promises = [];

        for (let i = 1; i <= totalFrames; i++) {
          promises.push(
            new Promise((resolve) => {
              const padded = String(i).padStart(originalDigits, "0");
              const url = `${basePath}${padded}${extension}`;

              const image = new Image();
              image.src = url;

              image.onload = () => {
                if (!width) {
                  width = image.width;
                  height = image.height;
                  canvas.width = width;
                  canvas.height = height;
                }
                resolve({ image, valid: true });
              };

              image.onerror = () => resolve({ image: null, valid: false });
            })
          );
        }

        const results = await Promise.all(promises);
        frames = results.filter((r) => r.valid).map((r) => r.image);

        if (frames.length === 0) {
          console.error("Nenhum frame válido encontrado.");
          return;
        }
      };

      // ------------------------------------------
      // INICIA O SCROLL
      // ------------------------------------------
      preloadAllFrames().then(() => {
        let start, end, sectionHeight;

        function setupScrollPoints() {
          sectionHeight = element.offsetHeight;
          start = element.offsetTop + window.innerHeight * 0.2;
          end = element.offsetTop + sectionHeight - window.innerHeight;
        }

        window.addEventListener("resize", setupScrollPoints);
        setupScrollPoints();

        let raf;

        const renderFrame = (n) => {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(frames[n], 0, 0, width, height);
        };

        // Desenha primeiro frame
        renderFrame(0);

        window.addEventListener("scroll", () => {
          if (raf) cancelAnimationFrame(raf);

          raf = requestAnimationFrame(() => {
            const scrollPos = window.scrollY;
            const range = end - start;

            let progress = (scrollPos - start) / range;
            progress = Math.min(Math.max(progress, 0), 1);

            const index = Math.round(progress * (frames.length - 1));

            renderFrame(index);
          });
        });
      });
    });
  }

  init() {
    this.elements.forEach((el) => this.addImageScroll(el));
  }
}
