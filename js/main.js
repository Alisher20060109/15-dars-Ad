let teachersCard = document.getElementById("tichers-card");
let form = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let addTicher = document.getElementById("addTicher");
let pagination = document.getElementById("pagenishn");
let pageNumberEl = document.getElementById("page-number");

let currentPage = 1;
const limit = 12;
const API = "https://692458a93ad095fb8473d421.mockapi.io/teachers";

async function getData(content) {
  try {
    content.innerHTML = "";

    let all = await axios.get(API);
    let totalCount = all.data.length;
    let totalPages = Math.ceil(totalCount / limit);

    let res = await axios.get(`${API}?page=${currentPage}&limit=${limit}`);

    res.data.forEach((el) => {
      content.innerHTML += `
      <div class="bg-gray-800 max-w-[400px] flex flex-col hover:scale-105 duration-300 items-center justify-center gap-2 p-[30px] cursor-pointer rounded-[20px]">
          <a href="./singl.html?teacherId=${el.id}" class="w-[100px] h-[100px] pb-[90px]  ">
          <img class="w-[100px] h-[100px] rounded-[50px] object-cover border-3 border-pink-800   shadow-[0_0_15px] shadow-blue-500" src="${el.avatar}" alt="">
          </a>
          <h1 class="text-gray-100">${el.name}</h1>
          <h1 class="text-gray-100">${el.profession}</h1>
          
          <div class="flex gap-[10px]">
              <h1 class="text-gray-100">Age: ${el.age}</h1>
              <h1 class="text-gray-100">Exp: ${el.experience}</h1>
          </div>

          <h1 class="text-gray-100">⭐ ${el.rating}</h1>

          <p class="text-gray-100">${el.phone}</p>
          <p class="text-gray-100">${el.email}</p>
          <p class="text-gray-100">${el.telegram}</p>

          <div class="pt-[10px] flex gap-[15px]">
              <button onclick="editTeacher(${el.id})" class="bg-blue-700 px-[10px] py-[5px] rounded-[10px] text-white">
                  Edit
              </button>
              <button onclick="deleteTeacher(${el.id})" class="bg-red-700 px-[10px] py-[5px] rounded-[10px] text-white">
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
