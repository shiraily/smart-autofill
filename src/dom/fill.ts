import { InputType, inputTypes } from "../entity/Entity";
import { UserDataReader } from "../entity/User";
import {
  calcScores,
  finalizeAddressItems,
  isAddressItem,
  Score,
} from "./classifier";
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

  const addressItems = filterAddressItems(formControls);
  const newScore = finalizeAddressItems(addressItems.map((i) => i[1]));

  addressItems.forEach(([element, _], i) => {
    (element as HTMLInputElement).value = userData.get(
      newScore[i].itemNameType
    );
  });
}

export function filterAddressItems(
  formControls: Array<Element>
): [Element, Score[]][] {
  return formControls
    .map((element: Element) => {
      return [element, calcScores(extract(element as HTMLElement))] as [
        Element,
        Score[]
      ];
    })
    .filter(([_, scores]) => {
      return isAddressItem(scores);
    });
}
