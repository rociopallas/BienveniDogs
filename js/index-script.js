const allBreedsURL = "https://dog.ceo/api/breeds/list/all";

async function getJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const fetchJson = await response.json();
    return fetchJson;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function createCard(imageURL) {
  const card = document.createElement("div");
  card.classList.add("col");
  card.innerHTML = `
    <div class="card shadow-sm">
        <img src="${imageURL}" alt="" class="bd-placeholder-img card-img-top" width="100%">
    </div>
`;
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  seeMoreDogsButton.setAttribute("style", "display: none");

  getJSON(allBreedsURL).then((data) => {
    for (const breed in data.message) {
      const newOption = document.createElement("option");
      newOption.value = breed;
      newOption.textContent = breed;
      inputGroupSelect04.appendChild(newOption);
    }
  });

  seeDogsButton.addEventListener("click", () => {
    seeMoreDogsButton.setAttribute("style", "display: none");
    getJSON("https://dog.ceo/api/breeds/image/random/6").then((data) => {
      dogContainer.innerHTML = "";
      data.message.forEach((imageURL) => {
        dogContainer.appendChild(createCard(imageURL));
      });
    });
    seeMoreDogsButton.setAttribute("style", "display: inline");
  });

  searchBreed.addEventListener("click", () => {
    seeMoreDogsButton.setAttribute("style", "display: none");
    const breed = inputGroupSelect04.value;
    const  breedURL = `https://dog.ceo/api/breed/${breed}/images/random/6`;
    getJSON(breedURL).then((data) => {
      dogContainer.innerHTML = "";
      data.message.forEach((imageURL) => {
        dogContainer.appendChild(createCard(imageURL));
      });
    });
    seeMoreDogsButton.setAttribute("style", "display: inline");
  });

  seeMoreDogsButton.addEventListener("click", () => {
    const breed = inputGroupSelect04.value;
    let moreDogURL = "";
    if (breed === "random") {
      moreDogURL = "https://dog.ceo/api/breeds/image/random/6";
    } else {
      moreDogURL = `https://dog.ceo/api/breed/${breed}/images/random/6`;
    }
    
    getJSON(moreDogURL).then((data) => {
      data.message.forEach((imageURL) => {
        dogContainer.appendChild(createCard(imageURL));
      });
    });
  });
});
