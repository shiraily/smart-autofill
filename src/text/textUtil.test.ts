import { normalize } from "./textUtil";

describe("Normalize text", () => {
  const testCases = [
    ["firstName", "first name"],
    ["firstName1", "first name 1"],
    ["first_name_1", "first name 1"],
    ["first-name-1", "first name 1"],
    ["first_Name_1", "first name 1"],
    ["block__first-name", "block first name"],
    ["block__firstName", "block first name"],
    ["first-Name", "first name"],
    ["postNoFirst", "post no first"],
    ["", ""],
    [null, ""],
  ] as [string, string][];
  test.each(testCases)("normalize %s", (input: string, expected: string) => {
    expect(normalize(input)).toEqual(expected);
  });
});
