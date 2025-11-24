let teachersCard = document.getElementById("tichers-card");

async function gitData() {
  try {
    let res = await axios.get(
      "https://692458a93ad095fb8473d421.mockapi.io/teachers"
    );
    console.log(res.data);

    res.data.map((el) => {
      content.innerHTML += `
            <div  class="bg-gray-800 max-w-[400px] flex flex-col items-center justify-center gap-5 p-[30px] cursor-pointer rounded-[20px]">
                <img class="w-[100px] rounded-[50px]" src="${el.avatar}" alt="">
                <h1 class="text-gray-100">${el.name}</h1>
                <h1 class="text-gray-100">${el.profession}</h1>
                <div class="flex gap-[10px]">
                    <img class="w-[20px]" src="../assets/image/student-alt.png" alt="">
                    <h1 class="text-gray-100">${el.age}</h1>
                    <img class="w-[20px]" src="../assets/image/users.png" alt="">
                    <h1 class="text-gray-100">${el.experience}</h1>
                </div>
                <div class="flex gap-2">
                    <img class="w-[20px]  " src="../assets/image/star.png" alt="">
                    <h1 class="text-gray-100">${el.rating}</h1>
                </div>
                <div>
                    <div class="flex gap-2 pt-[10px]">
                        <img class="w-[20px]" src="../assets/image/phone.svg" alt="">
                        <h1 class="text-gray-100">${el.phone}</h1>
                    </div>
                    <div class="flex gap-2 pt-[10px]">
                        <img class="w-[20px]" src="../assets/image/emili.svg" alt="">
                        <h1 class="text-gray-100">${el.emile}</h1>
                    </div>
                    <div class="flex gap-2 pt-[10px]">
                        <img class="w-[20px]" src="../assets/image/telegram.svg" alt="">
                        <h1 class="text-gray-100">${el.telegram}</h1>
                    </div>
                    <div class="flex gap-2 pt-[10px]">
                        <img class="w-[20px]" src="../assets/image/in.png" alt="">
                        <h1 class="text-gray-100">${el.emile}</h1>
                    </div>

                </div>
                <div>
                    <div class="flex">
                        <button class="flex">
                            <img class="w-[20px]" src="../assets/image/edit.svg" alt="">
                            <h1 class="text-gray-100">Edit</h1>
                        </button>
                        <button class="flex">
                            <img class="w-[20px]" src="../assets/image/delet.svg" alt="">
                            <h1 class="text-gray-100">Delet</h1>
                        </button>
                    </div>
                </div>
            </div>
            `;
    });
  } catch (err) {
    console.log(err);
  }
}
gitData(teachersCard);
