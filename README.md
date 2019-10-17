# Data Vizualization Blocks (Experimental)

_Just another bundle of blocks plugin._

A bundle of blocks for quick and easy data visualizations. Experimental.

## Blocks

...

## Development

This is an experimental/playground repo. The setup's borrowed in some form from https://github.com/automattic/wpcom-blocks. Same development workflow (with `wpcom` replaced by `dataviz` where relevant), except blocks code and all the other relevant pieces (`editor.scss`, `style.scss`) now live under `src`.

### Installation

Install the build scripts with:

`yarn install`

### Development

Run the development build with watchers:

`yarn start`

### Production

Build the production files with:

`yarn build`

### Environment

Setup wordpress:

```sh
npm install && npm run build
npm run env install
npm run env start
```

And `localhost:8889` will be available as your WordPress site, using `admin` as user and `password` as password.

Stop the environment by:

```sh
npm run env stop
```
