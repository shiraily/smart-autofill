
const $ = document.querySelectorAll.bind(document);

export function fillForm() {
  console.log("filling form");
  $("form input[type=text]").forEach((element: any) => {
    element.value = "test";
  });
}
