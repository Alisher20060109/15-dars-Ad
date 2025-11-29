let teachersCard = document.getElementById("tichers-card");
let form = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let addTicher = document.getElementById("addTicher");
let pagination = document.getElementById("pagenishn");
let pageNumberEl = document.getElementById("page-number");
let sortName = document.getElementById("sort-name");
let sortNameValue = "default";

sortName.addEventListener("change", function (e) {
  e.preventDefault();
  sortNameValue = e.target.value;
  getData(teachersCard);
});

let currentPage = 1;
const limit = 12;
const API = "https://692458a93ad095fb8473d421.mockapi.io/teachers";

async function getData(content) {
  try {
    content.innerHTML = "";

    // barcha datani olish
    let all = await axios.get(API);
    let data = all.data;

    // sort qilish
    if (sortNameValue === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortNameValue === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }
    // default — sort qilinmaydi

    // pagination
    let totalCount = data.length;
    let totalPages = Math.ceil(totalCount / limit);

    // slice bilan sahifalash
    let start = (currentPage - 1) * limit;
    let end = start + limit;
    let pageData = data.slice(start, end);

    // card yasash
    pageData.forEach((el) => {
      content.innerHTML += `
    <div class="bg-[#0f1a3a] w-full max-w-[350px] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-lg hover:scale-[1.03] duration-300">

    <a href="./singl.html?teacherId=${el.id}" class="w-[110px] h-[110px]">
        <img class="w-full h-full rounded-full object-cover  border-3 border-pink-800 shadow-[0_0_20px] shadow-blue-500 " src="${el.avatar}" alt="">
    </a>

    <h2 class="text-white text-xl font-semibold">${el.name}</h2>

    <span class="px-3 py-1 text-sm rounded-full bg-[#1e293b] text-blue-300">
        ${el.profession}
    </span>

    <div class="flex gap-[10px]"> <h1 class="text-gray-100">Age: ${el.age}</h1> <h1 class="text-gray-100">Exp: ${el.experience}</h1> </div>

    
    <h1 class="text-gray-100">⭐ ${el.rating}</h1>

    <div class="flex flex-col gap-2 text-gray-300 text-sm ">
        <p class="flex items-center gap-[10px]"><img class="w-[15px] h-[15px]" src="../assets/image/phone.svg" alt=""> ${el.phone}</p>
        <p class="flex items-center gap-[10px]" ><img class="w-[15px] h-[15px]" src="../assets/image/emili.svg" alt=""> ${el.email}</p>
        <p class="flex items-center gap-[10px]" ><img class="w-[15px] h-[15px]" src="../assets/image/telegram.svg" alt=""> ${el.telegram}</p>
        <p class="flex items-center gap-[10px]" ><img class="w-[15px] h-[15px]" src="../assets/image/in.png" alt=""> ${el.linkedin}</p>
    </div>

    <div class="flex gap-4 pt-3">
        <button onclick="editTeacher(${el.id})"
            class="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700">
             Edit
        </button>
        <button onclick="deleteTeacher(${el.id})"
            class="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700">
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

function nextPage() {
  currentPage++;
  getData(teachersCard);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    getData(teachersCard);
  }
}

getData(teachersCard);

outerModal.addEventListener("click", () => {
  outerModal.classList.add("hidden");
});
form.addEventListener("click", (e) => e.stopPropagation());

addTicher.addEventListener("click", () => {
  currentEditID = null;
  form.reset();
  outerModal.classList.remove("hidden");
  editTeacher(id);
});

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
    await axios.post(API, tObj);
  } else {
    await axios.put(`${API}/${currentEditID}`, tObj);
  }

  outerModal.classList.add("hidden");
  getData(teachersCard);
});

async function deleteTeacher(id) {
  await axios.delete(`${API}/${id}`);
  getData(teachersCard);
}

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

  getData(teachersCard);
}
