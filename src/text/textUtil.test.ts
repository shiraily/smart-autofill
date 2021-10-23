import { normalize } from "./textUtil";

describe("Normalize text", () => {
  const testCases = [
    ["firstName", "first name"],
    ["first_name", "first name"],
    ["first-name", "first name"],
    ["block__first-name", "block first name"],
    ["first-Name", "first name"],
    ["", ""],
    [null, ""],
  ] as [string, string][];
  test.each(testCases)("normalize %s", (input: string, expected: string) => {
    expect(normalize(input)).toEqual(expected);
  });
});
