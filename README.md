# cat town collective

a community-powered, open-source dashboard of adoptable cats. contributors can add entries via the web form (which writes to a pending queue) or by opening a GitHub PR to `data/cats.json`.

## how to contribute
1. **open a GitHub PR**: edit `data/cats.json` and add a new object following the existing structure.
2. **use the Contribute page**: submit through the form; maintainers will review pending submissions.

### JSON template
```json
{
  "name": "",
  "age": "",
  "desc": "",
  "image": "https://",
  "status": "available",
  "tags": [""]
}
