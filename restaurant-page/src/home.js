import RestaurantImg from "./restaurant.jpg";

export default function (content) {
    const image = new Image();
    image.src = RestaurantImg;
    image.width = 500;

    const heading = document.createElement("h1");
    heading.textContent = "Great Restaurant Name";

    const description = document.createElement("p");
    description.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, odio sequi? Praesentium, error doloribus harum ipsam reprehenderit sint laborum nulla dignissimos! Corrupti fugiat consequatur veniam saepe? Explicabo excepturi illo ex!";

    content.append(image, heading, description);
}