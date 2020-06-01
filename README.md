# PR changed path detection

> Node.js action to detect if path changed.

## Inputs

### `path`

**Required** The path to detect.

## Outputs

### `changed`

Whether or not change in files in the path.

## Example usage

```yaml
- name: Detect changes in demo/
  uses: jimengio/pr-file-change-action@master
  id: demo
  with:
    path: demo/

- name: Test dashboard
  if: steps.demo.outputs.changed == 'true'
  run: echo run demo...
```
