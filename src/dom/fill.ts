import { addressItems, InputType, inputTypes } from "../entity/Entity";
import { UserDataReader } from "../entity/User";
import { classify } from "./classifier";
import { extract } from "./extractor";

const $ = document.querySelectorAll.bind(document);

export function listFormControls(): Array<Element> {
  const formCandidates = Array.from($("form *"));
  return formCandidates.filter((x) => isFormControl(x));
}

export function isFormControl(element: Element): boolean {
  const tagName = element.tagName.toLowerCase();
  const type = (element.getAttribute("type") || "").toLowerCase() as InputType;
  if (
    !(tagName === "input" && inputTypes.includes(type)) &&
    tagName !== "select"
  ) {
    return false;
  }
  return true;
}

export function fillForm(
  formControls: Array<Element>,
  forMoving: boolean = true
) {
  console.log("filling form. moving mode:", forMoving);
  const userData = new UserDataReader();
  userData.readFromJson("");

  formControls.forEach((element: Element) => {
    const estimated = classify(extract(element as HTMLElement));
    if (!estimated) return;
    if (forMoving && !addressItems.has(estimated.itemNameType)) return;
    (element as HTMLInputElement).value = userData.get(estimated.itemNameType);
  });
}
