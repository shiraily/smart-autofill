import { classify } from "./classifier";

const $ = document.querySelectorAll.bind(document);

export function fillForm() {
  console.log("filling form");
  $("form *").forEach((element: Element) => {
    // TODO set value
    (element as HTMLInputElement).value =
      classify(element as HTMLElement)?.name || "";
  });
}
