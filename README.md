# Hello world JavaScript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log. To learn how this action was built, see "[Creating a JavaScript action](https://help.github.com/en/articles/creating-a-javascript-action)" in the GitHub Help documentation.

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
