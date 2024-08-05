# Prevent SWC import

Prevent packages from being bundled when using swc.

## Usage

```typescript
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
```