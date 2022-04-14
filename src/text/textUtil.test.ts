import { normalize, toFullWidth } from "./textUtil";

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

describe("convert char width", () => {
  /*describe("to half width", () => {
    const toHalfTestCases = [
      ["099", "099"],
      ["０９９－０００１", "099-0001"],
      ["０９９−０００１", "099-0001"],
      ["東京都千代田区千代田1-1-1", "東京都千代田区千代田1-1-1"],
    ];
    test.each(toHalfTestCases)(
      "%s to half: %s",
      (input: string, expected: string) => {
        expect(toHalfWidth(input)).toEqual(expected);
      }
    );
  });*/
  describe("to full width", () => {
    const toFullTestCases = [
      ["099-0001", "０９９ー０００１"],
      ["東京都 千代田区 千代田 1-2-3", "東京都　千代田区　千代田　１ー２ー３"],
      ["東京都　千代田区千代田１−１−１", "東京都　千代田区千代田１ー１ー１"],
      ["東京都　千代田区千代田１ー１ー１", "東京都　千代田区千代田１ー１ー１"],
    ];
    test.each(toFullTestCases)(
      "%s to full: %s",
      (input: string, expected: string) => {
        expect(toFullWidth(input)).toEqual(expected);
      }
    );
  });
});
