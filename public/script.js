const getCrafts = async () => {
  try {
    return (await fetch("api/crafts/")).json();
    console.log("api/crafts/").json();
    console.log("JSON CONTENTS");
  } catch (error) {
    console.log(errpr);
  }
};

const showCrafts = async () => {
  let crafts = await getCrafts();
  const craftList = document.getElementById("char-list");
  craftList.innerHTML = "";
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
