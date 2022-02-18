// function goSearch() {

//     const filt = document.getElementById('searchfield');
//     const sbtn = document.getElementById('srch');

//     console.log(filt.value);
//     var tag = filt.value;
//     const point = `/search/${tag}`;
//     console.log(point);

//     // sbtn.addEventListener("click", () => {

//     fetch(point, {
//         method: "GET"
//     }).then(res => window.location.href = `/search/${tag}`).catch(err =>
//         console.log(err))


// }





function goSearch() {

    const filt = document.getElementById('searchfield');

    const val = filt.value;
    window.location.href = `http://localhost:7113/search?search=${val}`;
}



const filt = document.getElementById('searchfield');
filt.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        const val = filt.value;
        window.location.href = `http://localhost:7113/search?search=${val}`;
    }
})