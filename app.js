/** a block displaying date and time */
var lastUpdateBlock = document.querySelector("#lastUpdateBlock");
/** contsiner of blocks of letters */
var container = document.querySelector("#packageContainer");
/** blocks of letters */
var packagesBlock = document.querySelectorAll(".packages");

/** append html to letters container */
let showPackages = () => {
    // show DOM
    const nullRoomNum = 99999;
    packages
        .sort((a, b) => {
            a.room ||= nullRoomNum;
            b.room ||= nullRoomNum;
            if (a.room > b.room) return 1;
            else if (a.room < b.room) return - 1;
            return 0;
        })
        .forEach(package => {
            let templateHTML = `
<div class="package">
    ${package.to ? "<span class='to'>" + package.to + "</span>" : ""}
    ${package.from ? "<span class='from'>" + package.from + "</span>" : ""}
    ${(package.room && package.room != nullRoomNum) ? "<span class='room'>" + package.room + "</span>" : ""}
    ${package.color ? "<span class='color'>" + package.color + "</span>" : ""}
</div>
`;
            container.insertAdjacentHTML("beforeend", templateHTML);
        });
}

window.onload = function () {
    lastUpdateBlock.innerHTML = lastUpdate;
    showPackages();
};

// register service worker
navigator.serviceWorker.register('service-worker.js', { scope: "." });