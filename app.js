/**
 * a block displaying date and time
 * @type Element
 */
var lastUpdateBlock = document.querySelector("#lastUpdateBlock");
/**
 * contsiner of blocks of letters
 * @type Element
 */
var container = document.querySelector("#packageContainer");
/**
 * blocks of letters
 * @type NodeListOf<Element>
 */
var packagesBlock = document.querySelectorAll(".packages");

/**
 * parse markdown text to object array
 * @param {string} markdownTxt 
 * @returns {{from:string, to:string, room:string, color:string}[]}
 */
function parseMarkdownTextToObject(markdownTxt) {
    // trim and split lines
    let _packages = markdownTxt.trim().split(/[\r\n]{2,}/);

    // parse markdown text to object
    _packages = _packages.map(package => package.split(/[\r\n]+/));
    _packages.map(package => {
        package.map(attribute => {
            if (attribute.indexOf("From:") != -1) {
                package.from = attribute.trim().replace("From:", "");
            } else if (attribute.indexOf("To:") != -1) {
                package.to = attribute.trim().replace("To:", "");
            } else if (attribute.indexOf("Room:") != -1) {
                package.room = attribute.trim().replace("Room:", "");
            } else if (attribute.indexOf("Color:") != -1) {
                package.color = attribute.trim().replace("Color:", "");
            }
            return attribute;
        });
        return package;
    });
    return _packages;
}

/**
 * append html to letters container
 */
function showPackages() {
    //to package array
    let _packages = parseMarkdownTextToObject(packages);
    //show DOM
    _packages.forEach(o => {
        const html = `
<div class="package">
    ${o.to ? "<span class='to'>" + o.to + "</span>" : ""}
    ${o.from ? "<span class='from'>" + o.from + "</span>" : ""}
    ${o.room ? "<span class='room'>" + o.room + "</span>" : ""}
    ${o.color ? "<span class='color'>" + o.color + "</span>" : ""}
</div>
    `;
        container.insertAdjacentHTML("beforeend", html);
    });
}

window.onload = function () {
    lastUpdateBlock.innerHTML = lastUpdate;
    showPackages();
};

// register service worker
navigator.serviceWorker.register('service-worker.js', { scope: "." });