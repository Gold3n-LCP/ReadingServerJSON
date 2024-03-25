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

//https://www.w3schools.com/w3css/w3css_modal.asp
document.querySelectorAll("section").forEach((section) => {
  section.onclick = (e) => {
    const craft = e.currentTarget.craft;
    const dialog = document.getElementById("dialog");

    dialog.style.display = "block";

    document.querySelector("#dialog-content img").src =
      e.currentTarget.querySelector("img").src;

    const dialogDetails = document.querySelector("#dialog-details");

    dialogDetails.innerHTML = "";
    dialogDetails.append(craft.expandedSect);
  };
});
showCrafts();
