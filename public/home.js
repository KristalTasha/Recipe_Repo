const cattype = document.querySelectorAll('.cat-food');

cattype.forEach(catt => {

    const catte = catt.innerHTML;
    const endpoint = `/category/${catte}`;

    // console.log(catte);

    catt.addEventListener("click", () => {
        fetch(endpoint, {
            method: "GET"
        }).then(res => window.location.href = `/category/${catte}`).catch(err =>
            console.log(err))

    })
})

