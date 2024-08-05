import { expect, test } from "bun:test";
import { transformSync } from "@swc/core";

test("It should throw when trying to import from bar", () => {
  const input = `import { foo } from "bar";`;

  expect(() =>
    transformSync(input, {
      jsc: {
        experimental: {
          plugins: [
            [
              require.resolve(
                "./prevent-import/target/wasm32-wasi/release/prevent_import.wasm"
              ),
              {
                throwOnImport: ["bar"],
              },
            ],
          ],
        },
      },
    })
  ).toThrowError();
});

test("It should not throw when trying to import from foo", () => {
  const input = `import { foo } from "foo";`;

  expect(() =>
    transformSync(input, {
      jsc: {
        experimental: {
          plugins: [
            [
              require.resolve(
                "./prevent-import/target/wasm32-wasi/release/prevent_import.wasm"
              ),
              {
                throwOnImport: ["bar"],
              },
            ],
          ],
        },
      },
    })
  ).not.toThrowError();
});
