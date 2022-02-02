function goSearch() {

    const filt = document.getElementById('searchfield');
    const sbtn = document.getElementById('srch');

    console.log(filt.value);
    var tag = filt.value;
    const point = `/search/${tag}`;
    console.log(point);

    // sbtn.addEventListener("click", () => {

    fetch(point, {
        method: "GET"
    }).then(res => window.location.href = `/search/${tag}`).catch(err =>
        console.log(err))


    // fetch(point).then(res => console.log(res.json())).catch(err => console.log(err));

    // });

    // filt.forEach(fil => {

    //     var tag = fil.value;
    //     const point = `/search/${tag}`;
    //     console.log(tag);

    //     fil.addEventListener("keyup", function (event) {

    //         if (event.keyCode == 13) {
    //             fetch(point, {
    //             method: "GET"
    // }).then(res => window.location.href = `/search/${tag}`).catch(err =>
    //     console.log(err))   

    // }
    //     })


    // })
}