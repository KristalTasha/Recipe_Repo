//this is for the recipe page
//navigating to the category through th recipe page
const reccat = document.querySelectorAll('.redata');

reccat.forEach(recc => {

    const thereccat = recc.innerHTML;
    const anchor = `/category/${thereccat}`;

    // console.log(catte);

    recc.addEventListener("click", () => {
        fetch(anchor, {
            method: "GET"
        }).then(res => window.location.href = `/category/${thereccat}`).catch(err =>
            console.log(err))

    })
})