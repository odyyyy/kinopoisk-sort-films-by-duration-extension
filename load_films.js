const getFilmsList = () =>
  Array.from(document.querySelectorAll("#itemList .item"));

function loadFilmsFromSpecificPage(pageIndex) {
  const url = new URL(location.href);
  url.searchParams.set("page", pageIndex);

  fetch(url)
    .then((r) => r.text())
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const films = doc.querySelectorAll("#itemList .item");
      const container = document.getElementById("itemList");
      if (!films.length || !container) return;

      const fragment = document.createDocumentFragment();

      films.forEach((film) => {
        const img = film.querySelector("img.poster");
        if (img) {
          const realSrc = img.getAttribute("title");
          if (realSrc?.startsWith("http")) {
            img.src = realSrc;
            img.title = film.querySelector(".name")?.innerText || "";
          }
        }
        fragment.appendChild(film);
      });

      container.appendChild(fragment);
    })
    .catch(() => {});
}

function loadAllFilms() {
  const total = countAmountOfFilmsPages();
  for (let i = 2; i <= total; i++) loadFilmsFromSpecificPage(i);
}

function countAmountOfFilmsPages() {
  const total =
    parseInt(
      document.querySelector(".pagesFromTo")?.textContent.split(" ").at(-1),
    ) || 0;

  const limit =
    parseInt(new URL(location.href).searchParams.get("limit")) || 25;

  return Math.ceil(total / limit);
}
