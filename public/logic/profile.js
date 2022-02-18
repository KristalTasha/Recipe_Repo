

function profSearch() {

    const profrec = document.getElementById('rec-search');
    const sbtn = document.getElementById('search-btn');

    console.log(profrec.value);
    var prec = profrec.value;
    const prpoint = `/search/${prec}`;
    console.log(prpoint);

    // sbtn.addEventListener("click", () => {

    fetch(prpoint, {
        method: "GET"
    }).then(res => window.location.href = `/profsearch/${prec}`).catch(err =>
        console.log(err))

}


// const addImg = document.querySelector('.upload');
// const idholder = document.querySelector('.id-holder');
// const theid = idholder.value;
// console.log(theid);

// addImg.addEventListener("change", () => {
//     fetch(`/add-image/${theid}`, {
//         method: "POST"
//     }).catch(err => console.log(err))
// })