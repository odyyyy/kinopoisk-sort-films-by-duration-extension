function sortFilmsByDuration(films, asc = true) {
  const getMinutes = (el) =>
    parseInt(
      el.querySelector(".info")?.textContent.match(/(\d+)\s*мин/)?.[1],
    ) || Infinity;

  films.sort((a, b) =>
    asc ? getMinutes(a) - getMinutes(b) : getMinutes(b) - getMinutes(a),
  );

  const container = document.getElementById("itemList");
  container.replaceChildren(...films);
}
