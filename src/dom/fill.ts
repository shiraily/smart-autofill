import {
  categoryItems,
  CharWidth,
  InputType,
  inputTypes,
  ItemNameType,
  ItemTypeMap,
} from "../entity/Entity";
import { UserDataReader } from "../entity/User";
import { toFullWidth, toHalfWidth } from "../text/textUtil";
import {
  calcScores,
  Candidate,
  finalizeAddressItems,
  isAddressItem,
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

  const addressControls = filterAddressControls(formControls);
  /** 最終的なitemType */
  const finalScore = finalizeAddressItems(
    addressControls.map((i) => i[1].itemScore)
  );

  addressControls.forEach(([element, candidate], i) => {
    const itemNameType = finalScore[i].itemNameType;
    const charWidth = finalizeCharWidth(itemNameType, candidate);

    if (itemNameType === "after address") {
      const addressItems = categoryItems.get("address") || [];
      (element as HTMLInputElement).value = finalizeInputText(
        addressItems
          .slice(addressItems.indexOf(finalScore[i - 1].itemNameType) + 1)
          .map((item) => userData.get(item))
          .filter((i) => i)
          .join(" "),
        charWidth
      );
    } else {
      (element as HTMLInputElement).value = finalizeInputText(
        userData.get(finalScore[i].itemNameType),
        charWidth
      );
    }
  });
}

function finalizeInputText(text: string, charWidth: CharWidth): string {
  if (charWidth === "full") {
    return toFullWidth(text);
  } else if (charWidth === "half") {
    return toHalfWidth(text);
  }
  return text;
}

/**
 * 全角半角を最終決定する
 */
function finalizeCharWidth(
  itemNameType: string,
  candidate: Candidate
): CharWidth {
  const charWidthCandidates = (
    ItemTypeMap.get(itemNameType)?.charTypes?.[0]?.width || ["full"]
  ).map(
    (charWidth) =>
      [
        charWidth,
        candidate.charWidthScore.find((s) => s.charWidth === charWidth)
          ?.score || -1,
      ] as [CharWidth, number]
  );
  charWidthCandidates.sort((a, b) => b[1] - a[1]);
  // TODO 全角・半角を反映する
  return charWidthCandidates[0][0];
}

export function filterAddressControls(
  formControls: Array<Element>
): [Element, Candidate][] {
  return formControls
    .map((element: Element) => {
      return [element, calcScores(extract(element as HTMLElement))] as [
        Element,
        Candidate
      ];
    })
    .filter(([_, candidate]) => {
      return isAddressItem(candidate.itemScore);
    });
}
