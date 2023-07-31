export default function(content) {
    const heading = document.createElement("h1");
    heading.textContent = "Menu";

    content.append(heading);
}