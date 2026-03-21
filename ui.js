function setupExtensionUI() {
  const parent = document.querySelector(".quickAdd");
  if (!parent) return;

  addLoadAllFilmsButton(parent);
  addSortButton(parent);
}

function addSortButton(parent) {
  let asc = true;

  const btn = initializeButton(
    "",
    () => {
      sortFilmsByDuration(getFilmsList(), asc);
      asc = !asc;
      update();
    },
    "#FF6B00",
  );

  const update = () => {
    btn.textContent = `Сортировать по продолжительности ${asc ? "(по возр.)" : "(по убыв.)"}`;
    btn.title = asc ? "По возрастанию" : "По убыванию";
  };

  update();
  parent.appendChild(btn);
}

function addInputFields(filterPanelParentElement) {
  let [durationInputFieldFrom, durationInputFieldTo] =
    initializeFromToDurationInputFields();

  filterPanelParentElement.appendChild(durationInputFieldFrom);
  filterPanelParentElement.appendChild(durationInputFieldTo);
}

function addLoadAllFilmsButton(parent) {
  const btn = initializeButton("Загрузить все фильмы", loadAllFilms, "black");
  btn.title = "Загружает фильмы со всех страниц. Может занять некоторое время";
  parent.appendChild(btn);
}

function initializeButton(text, callback, color) {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = callback;

  button.style.cssText = `
    background:${color};
    color:#fff;
    border:none;
    border-radius:4px;
    padding:10px 20px;
    font-size:14px;
    font-weight:600;
    cursor:pointer;
    transition:.3s;
    box-shadow:0 2px 5px rgba(0,0,0,.2);
    margin:5px;
  `;

  return button;
}

function initializeFromToDurationInputFields() {
  const from = document.createElement("input");
  const to = document.createElement("input");

  from.placeholder = "От";
  to.placeholder = "До";

  return [from, to];
}
