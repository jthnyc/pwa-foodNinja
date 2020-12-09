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
    }
  });
});
