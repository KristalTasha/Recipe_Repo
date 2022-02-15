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