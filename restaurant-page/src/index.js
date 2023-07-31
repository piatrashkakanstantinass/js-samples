import "./style.css"
import home from "./home";
import contact from "./contact";
import menu from "./menu";

const content = document.querySelector("#content");

function loadPage(contentFn) {
    content.textContent = "";
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
    contentFn(content);
}

loadPage(home);

const tabMenu = document.createElement("nav");
const tabs = document.createElement("ul");
tabMenu.append(tabs);

class ContentTab {
    constructor(name, contentFn) {
        this.element = document.createElement("li");
        this.element.textContent = name;
        this.element.onclick = () => {
            loadPage(contentFn);
            console.log("click 2")
            this.element.setAttribute("data-selected", "1");
        };
    }
}

tabMenu.onclick = () => {
    Array.from(document.querySelectorAll("nav ul li")).forEach(e => {
        e.classList.remove("selected");
    });
    let selected = document.querySelector("li[data-selected]");
    if (selected) {
        selected.removeAttribute("data-selected");
        selected.classList.add("selected");
    }
};

const homeTab = new ContentTab("Home", home);
homeTab.element.classList.add("selected");
const menuTab = new ContentTab("Menu", menu);
const contactTab = new ContentTab("Contact", contact);
tabs.append(homeTab.element, menuTab.element, contactTab.element);

document.querySelector("body").insertBefore(tabMenu, content);