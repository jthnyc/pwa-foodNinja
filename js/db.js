// offline data
db.enablePersistence().catch((err) => {
  if (err.code === "failed-precondition") {
    // probably multiple tabs open at once
    console.log("persistence failed");
  } else if (err.code === "unimplemented") {
    // lack of browser support
    console.log("persistence is not available");
  }
});

// real-time listener
db.collection("recipes").onSnapshot((snapshot) => {
  //   console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    // console.log(change.doc.data(), change.doc.id);
    if (change.type === "added") {
      // add document data to the web page
      renderRecipe(change.doc.data(), change.doc.id);
    }

    if (change.type === "removed") {
      // remove document data from the web page
      removeRecipe(change.doc.id);
    }
  });
});

// add new recipe
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection("recipes")
    .add(recipe)
    .catch((err) => console.log(err));

  form.title.value = "";
  form.ingredients.value = "";
});

// delete a recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.tagName === "I") {
    const id = e.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  }
});
