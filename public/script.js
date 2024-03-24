const getCrafts = async () => {
  try {
    return await fetch("api/crafts/").json();
  } catch (error) {
    console.log(error);
  }
};

const showCrafts = async () => {
  let crafts = await getCrafts();
  const craftList = document.getElementById("craft-list");
  craftList.innerHTML = "CRAFTLIST";
  console.log("Crafts: " + crafts);
  crafts.forEach((craft) => {
    const craftSection = craft.sect;
    craftSection.craft = craft;
    craftList.append(craftSection);
  });
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
