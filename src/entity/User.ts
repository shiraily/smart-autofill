import { settings } from "../../secret_example";
import { CharType, ItemNameType } from "./Entity";

/** 分類結果を保持するためのエンティティ */
export interface InputResult {
  itemNameType: ItemNameType;
  charType: CharType;
}

export class UserDataReader {
  dataMap: Map<ItemNameType, string>;

  constructor() {
    this.dataMap = new Map<ItemNameType, string>();
  }

  // FIXME: Do not use ts file. Use secret instead.
  readFromJson(json: string) {
    this.readFromTS();
    /* const jsonData = JSON.parse(json);
    for (let value in jsonData) {
      this.dataMap.set(value, jsonData[value] as string);
    }*/
  }

  /**
   * only for debug
   */
  readFromTS() {
    const jsonData = settings;
    for (let value in jsonData) {
      this.dataMap.set(value, jsonData[value] as string);
    }
  }

  get(type: ItemNameType): string {
    return this.dataMap.get(type) || "";
  }
}
