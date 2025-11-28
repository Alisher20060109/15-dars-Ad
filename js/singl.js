let pash = new URLSearchParams(location.search);
let id = pash.get("teacherId");
let studentsCard = document.querySelector(".students-card");

async function getData() {
  try {
    let res = await axios.get(
      `https://692458a93ad095fb8473d421.mockapi.io/teachers/${id}`
    );

    let el = res.data; // teacher object

    studentsCard.innerHTML = `
        <div
            class="bg-[#0f1a3b] max-w-[450px] w-full rounded-xl flex flex-col items-center p-6 text-white shadow-lg space-y-4">
            <div class="relative">
                <img class="w-[140px] h-[140px] rounded-full object-cover border-4 border-blue-600 shadow-[0_0_15px] shadow-blue-500"
                    src="${el.avatar}" alt="Profile Avatar">
            </div>
            <div class="flex flex-col items-center space-y-1">
                <h1 class="text-[20px] font-semibold">${el.name}</h1>
                <span class="text-[13px] bg-gray-900 px-3 py-[2px] rounded-xl">
                    ${el.profession}
                </span>
            </div>
            <div class="w-full text-sm mt-2 space-y-3">

                <div class="flex justify-between border-b border-gray-600 pb-1">
                    <span>Age</span>
                    <span>${el.age} years</span>
                </div>

                <div class="flex justify-between border-b border-gray-600 pb-1">
                    <span>Experience</span>
                    <span>${el.experience} years</span>
                </div>

                <div class="flex justify-between border-b border-gray-600 pb-1">
                    <span>Gender</span>
                    <span>${el.gendr}</span>
                </div>

                <div class="flex justify-between">
                    <span>Rating</span>
                    <div class="flex items-center gap-1">
                        <span class="text-yellow-400 text-lg">★</span>
                        <span>${el.rating}</span>
                    </div>
                </div>
            </div>
            <button
                class="w-full cursor-pointer flex items-center justify-center gap-2 bg-gray-300   py-3 rounded-lg mt-4 transition">
                <img class="w-[18px]" src="../assets/image/edit.svg" alt="">
                <span class="text-lg font-medium text-gray-800">Edit Profile</span>
            </button>

        </div>

        <div class="bg-[#0f1a3b] max-w-[800px] w-full rounded-xl flex flex-col items-center p-6 text-white shadow-lg  ">
            <div class="flex justify-between items-center gap-57 mb-5 pb-3 border-b border-custom">
                <h3 class="text-sm font-semibold uppercase tracking-wider text-[18px] text-custom-muted">Contact Info</h3>
                <div class="bg-green-500 text-white text-xs px-3 py-1 rounded-full text-[18px]">Assigned Students (3)</div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div
                    class="contact-item  p-4 rounded-xl flex items-center gap-3 transition-all hover:bg-[#0f1a5a] hover:-translate-y-0.5">
                    <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-lg">
                       <img class="w-full p-2" src="../assets/image/phone.svg" alt="">
                    </div>
                    <div>
                        <h4 class="text-xs text-custom-muted mb-1">Phone</h4>
                        <p class="text-sm text-custom-light">${el.phone}</p>
                    </div>
                </div>
                <div
                    class="contact-item bg-custom-item p-4 rounded-xl flex items-center gap-3 transition-all hover:bg-[#0f1a5a] hover:-translate-y-0.5">
                    <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-lg">
                         <img class="w-full p-2" src="../assets/image/emili.svg" alt="">
                    </div>
                    <div>
                        <h4 class="text-xs text-custom-muted mb-1">Email</h4>
                        <p class="text-sm text-custom-light break-all"><a href="mailto:Tommie_Lebsack@yahoo.com"
                                class="text-custom-light hover:underline">${el.email}</a></p>
                    </div>
                </div>
                <div
                    class="contact-item bg-custom-item p-4 rounded-xl flex items-center gap-3 transition-all hover:bg-[#0f1a5a] hover:-translate-y-0.5">
                    <div class="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-lg">
                         <img class="w-full p-2" src="../assets/image/telegram.svg" alt="">
                    </div>
                    <div>
                        <h4 class="text-xs text-custom-muted mb-1">Telegram</h4>
                        <p class="text-sm text-custom-light"><a href="https://t.me/tommielebsack" target="_blank"
                                class="text-custom-light hover:underline">@${el.telegram}</a></p>
                    </div>
                </div>
                <div
                    class="contact-item bg-custom-item p-4 rounded-xl flex items-center gap-3 transition-all hover:bg-[#0f1a5a] hover:-translate-y-0.5">
                    <div class="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-lg">
                        <img class="w-full p-2" src="../assets/image/in.png" alt="">
                    </div>
                    <div>
                        <h4 class="text-xs text-custom-muted mb-1">LinkedIn</h4>
                        <p class="text-sm text-custom-light break-all"><a href="https://linkedin.com/in/tommie-lebsack"
                                target="_blank"
                                class="text-custom-light hover:underline">${el.emile}</a></p>
                    </div>
                </div>
            </div>
    `;
  } catch (err) {
    console.log(err);
  }
}

getData();
