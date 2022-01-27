import { FormControlTag, InputType, inputTypes } from "../entity/Entity";
import { classify } from "./classifier";

const $ = document.querySelectorAll.bind(document);

export function listFormControls(): Array<Element> {
  const formCandidates = Array.from($("form *"));
  return formCandidates.filter((x) => isFormControl(x));
}

function isFormControl(element: Element): boolean {
  const type = (element.getAttribute("type") || "").toLowerCase() as InputType;
  const tagName = element.tagName.toLowerCase() as FormControlTag;
  if (
    !(tagName === "input" && inputTypes.includes(type)) &&
    tagName !== "select"
  ) {
    return false;
  }
  return true;
}

export function fillForm(formControls: Array<Element>) {
  console.log("filling form");
  formControls.forEach((element: Element) => {
    // TODO set value
    (element as HTMLInputElement).value =
      classify(element as HTMLElement)?.name || "";
  });
}
