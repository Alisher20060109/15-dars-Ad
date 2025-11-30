let teachersCard = document.getElementById("tichers-card");
let form = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let addTicher = document.getElementById("addTicher");
let pagination = document.getElementById("pagenishn");
let pageNumberEl = document.getElementById("page-number");
let sortName = document.getElementById("sort-name");

let search = document.getElementById("search");
let searchValue = "";
let sortNameValue = "";
let currentEditID = null;

let currentPage = 1;
const limit = 12;
const API = "https://692458a93ad095fb8473d421.mockapi.io/sutudents  ";

let tObj = {
  name: form.name.value,
  avatar: form.avatar.value,
  profession: form.profession.value,
  age: form.age.value,
  Chemistry: form.experience.value,
  Rating: form.rating.value,
  Coins: form.coins.value,
  Phone: form.phone.value,
  Email: form.email.value,
  Telegram: form.telegram.value,
  LinkedIn: form.linkedIn.value,
  Gender: form.gender.checked,
};

/* ===========================
 SEARCH EVENT
=========================== */
search.addEventListener("input", function (e) {
  searchValue = e.target.value.trim().toLowerCase();
  currentPage = 1;
  getData(teachersCard, searchValue);
});

/* ===========================
 SORT EVENT
=========================== */
sortName.addEventListener("change", function (e) {
  sortNameValue = e.target.value;
  getData(teachersCard, searchValue);
});

/* ===========================
 GET DATA
=========================== */
async function getData(content, searchValue = "") {
  try {
    content.innerHTML = "";
    let res = await axios.get(API);
    let data = res.data;

    // 🔍 search filtering
    if (searchValue) {
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchValue) ||
          item.profession.toLowerCase().includes(searchValue)
      );
    }

    // 🔽 sort
    if (sortNameValue === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortNameValue === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    // 📄 pagination
    let totalCount = data.length;
    let totalPages = Math.ceil(totalCount / limit);

    let start = (currentPage - 1) * limit;
    let end = start + limit;
    let pageData = data.slice(start, end);

    /* ===========================
    CARD RENDER
    =========================== */
    pageData.forEach((el) => {
      content.innerHTML += `
   <div class="bg-[#0d153e] w-full max-w-[350px] rounded-3xl p-6 flex flex-col items-center gap-5 text-white shadow-xl border border-[#1f2b47]">
    
    <!-- Avatar -->
    <a href="./singl-card.html?sutudentsId=${el.id}" class="w-[130px] h-[130px]">
        <img class="w-full h-full rounded-full object-cover border-4 border-[#5b2cff] shadow-[0_0_30px_#5b2cff50]" 
            src="${el.avatar}" alt="">
    </a>

    <!-- Name -->
    <h2 class="text-2xl font-semibold">${el.name}</h2>

    <!-- Grade + years -->
    <div class="flex items-center gap-3">
        <span class="px-3 py-1 text-xs font-medium bg-[#18233f] text-blue-300 rounded-lg border border-blue-400">
            Grade ${el.Grade}
        </span>
        <p class="text-gray-300">${el.age}y</p>
    </div>

    <!-- Rating + Coins -->
    <div class="flex justify-between items-center w-full px-3">
        <div class="flex items-center gap-1 text-yellow-400 text-lg font-semibold">
            ⭐ <span>${el.Rating}</span>
        </div>

        <div class="flex items-center gap-1 text-[#fcd34d] text-lg font-semibold">
            🪙 <span>${el.Coins || 0}</span>
        </div>
    </div>

    <!-- Bar -->
    <div class="w-full h-2 bg-[#1e293b] rounded-full overflow-hidden">
        <div class="bg-gradient-to-r from-[#5b2cff] to-[#22d3ee] h-full" style="width:${
          el.Rating * 20
        }%"></div>
    </div>

    <!-- CONTACT -->
    <div class="flex flex-col gap-2 w-full text-sm text-gray-300 mt-2">
        <p class="flex gap-2 items-center"><img src="../assets/image/phone.svg" class="w-4"> ${
          el.Phone
        }</p>
        <p class="flex gap-2 items-center"><img src="../assets/image/emili.svg" class="w-4"> ${
          el.Email
        }</p>
        <p class="flex gap-2 items-center"><img src="../assets/image/telegram.svg" class="w-4"> ${
          el.Telegram
        }</p>
        <p class="flex gap-2 items-center"><img src="../assets/image/in.png" class="w-4"> ${
          el.LinkedIn
        }</p>
    </div>

    <!-- Buttons -->
    <div class="flex gap-3 pt-3">
        <button onclick="editTeacher(${el.id})"
            class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
            Edit
        </button>
        <button onclick="deleteTeacher(${el.id})"
            class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">
            Delete
        </button>
    </div>

</div>
      `;
    });

    pageNumberEl.textContent = `${currentPage} / ${totalPages}`;
  } catch (err) {
    console.log(err);
  }
}

/* ===========================
 PAGINATION
=========================== */
function nextPage() {
  currentPage++;
  getData(teachersCard, searchValue);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    getData(teachersCard, searchValue);
  }
}

/* ===========================
 MODAL OCHISH / YOPISH
=========================== */
outerModal.addEventListener("click", () => {
  outerModal.classList.add("hidden");
});

form.addEventListener("click", (e) => e.stopPropagation());

/* ===========================
 ADD TEACHER
=========================== */
addTicher.addEventListener("click", () => {
  currentEditID = null;
  form.reset();
  outerModal.classList.remove("hidden");
});

/* ===========================
 FORM SUBMIT
=========================== */
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let tObj = {
    name: form[0].value,
    avatar: form[1].value,
    profession: form[2].value,
    age: form[3].value,
    experience: form[4].value,
    rating: form[5].value,
    phone: form[6].value,
    email: form[7].value,
    telegram: form[8].value,
  };

  if (!currentEditID) {
    await axios.post(API, tObj); // ⬅️ yangi student
  } else {
    await axios.put(`${API}/${currentEditID}`, tObj); // ⬅️ edit
  }

  outerModal.classList.add("hidden");
  getData(teachersCard); // re-render only once
});

/* ===========================
 DELETE
=========================== */
async function deleteTeacher(id) {
  await axios.delete(`${API}/${id}`);
  getData(teachersCard);
}

/* ===========================
 EDIT (FAQAT FORM DATA)
=========================== */
async function editTeacher(id) {
  const item = await axios.get(`${API}/${id}`);
  currentEditID = id;

  form[0].value = item.data.name;
  form[1].value = item.data.avatar;
  form[2].value = item.data.profession;
  form[3].value = item.data.age;
  form[4].value = item.data.experience;
  form[5].value = item.data.rating;
  form[6].value = item.data.phone;
  form[7].value = item.data.email;
  form[8].value = item.data.telegram;

  outerModal.classList.remove("hidden");
}

/* ===========================
 INITIAL LOAD
=========================== */
getData(teachersCard);
