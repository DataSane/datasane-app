var arrowDetails = document.querySelector("#arrowDetail");
var summaryId = document.querySelector("#summaryId");

summaryId.addEventListener("click", () => {
    arrowDetails.classList.toggle("rotate");
})

