let pash = new URLSearchParams(location.search);

let id  = pash.get("teacherId");


async function getData() {
    try{
        let res = await axios.get(`https://692458a93ad095fb8473d421.mockapi.io/teachers/${id}`);
        
        let res2 = await axios.get(`https://692458a93ad095fb8473d421.mockapi.io/teachers/${id}/sutudents`);
        console.log(res2.data);
    }catch(err){
        console.log(err);
    }
}
getData();