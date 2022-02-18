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


const less = document.querySelector(".seeless")
const addrev = document.querySelector(".add-rev")
const allrev = document.querySelector(".allrevs")
const revcont = document.querySelector(".review-cont")
const recbod = document.querySelector(".recbody")
const seemore = document.querySelector(".seemore")


less.onclick = function (){
    addrev.classList.toggle("show")
    allrev.classList.toggle("show")
    revcont.classList.toggle("long")
    recbod.classList.toggle("long")
    seemore.classList.toggle("hide")
    less.classList.toggle("show")
}

seemore.onclick = function(){
    addrev.classList.toggle("show")
    allrev.classList.toggle("show")
    revcont.classList.toggle("long")
    recbod.classList.toggle("long")
    seemore.classList.toggle("hide")
    less.classList.toggle("show")

}