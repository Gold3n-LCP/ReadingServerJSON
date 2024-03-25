const getCrafts = async () => {
  try {
    return (await fetch("api/crafts/")).json();
  } catch (error) {
    console.log(error);
  }
};

const showCrafts = async () => {
  let crafts = await getCrafts();
  const craftList = document.getElementById("craft-list");
  craftList.innerHTML = "";
  console.log("Crafts: " + crafts);

  const craftImages = document.createElement("div");
  craftImages.classList.add("columns");
  craftImages.classList.add("image-container");

  const numCrafts = crafts.length;
  const numPerColumn = Math.ceil(numCrafts / 4);

  for (let i = 0; i < 4; i++) {
    const craftImagesContainer = document.createElement("div");
    craftImagesContainer.classList.add("column"); // Apply CSS class for column styling

    // Add images to the current column container
    for (
      let j = i * numPerColumn;
      j < Math.min((i + 1) * numPerColumn, numCrafts);
      j++
    ) {
      const img = document.createElement("img");
      img.src = "images/" + crafts[j].image;
      craftImagesContainer.appendChild(img);
    }
    craftList.append(craftImagesContainer);
  }
};

const getCraft = (craft) => {
  let superSection = document.createElement("section");
  superSection.setAttribute("class", "columns");

  let section1 = document.createElement("section");
  let img = document.createElement("img");
  img.src = "images/" + crafts[craft].image;
  section1.append(img);
  superSection.append(section1);

  let section2 = document.createElement("section");
  let h1 = document.createElement("h1");
  h1.innerText = craft.name;
  section2.append(h1);

  let h3 = document.createElement("h3");
  h3.innerText = craft.description;
  section2.append(h3);

  let h2 = document.createElement("h2");
  h2.innerText = "Supplies: ";
  section2.append(h2);

  let ul = document.createElement("ul");
  crafts.supplies.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    ul.append(li);
    console.log(item);
  });
  section2.append(ul);

  superSection.append(section2);

  return superSection;
};
//https://www.w3schools.com/w3css/w3css_modal.asp
document.querySelectorAll("img").forEach((img) => {
  img.onclick = (e) => {
    console.log("IMG CLICKED");
    img.innerHTML = "IMAGE";
    const craftId = img.getAttribute("data-craft-id");
    const craft = getCraft(craftId);

    if (craft) {
      const dialog = document.getElementById("dialog");
      dialog.style.display = "block";

      document.querySelector("#dialog-content img").src = img.src;

      const dialogDetails = document.querySelector("#dialog-details");

      dialogDetails.innerHTML = "";
      dialogDetails.appendChild(getCraftElement(craft));
    }
  };
});
showCrafts();
