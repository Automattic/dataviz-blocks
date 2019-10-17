# Data Visualization Blocks (Experimental)

_Just another bundle of blocks plugin._

A bundle of blocks for quick and easy data visualizations. Experimental.

## Blocks

...

## Development

This is an experimental/playground repo. The setup's borrowed (in some form) from https://github.com/automattic/wpcom-blocks. Same development workflow (with `wpcom` replaced by `dataviz` where relevant), except blocks and other relevant code (`editor.scss`, `style.scss`) now live under `src`.

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

If you need an environment to test the blocks, this plugin provides one. Execute:

```sh
npm install && npm run build # if you haven't yet
npm run env install
npm run env start
```

And `localhost:8889` will be available as your WordPress site, using `admin` as user and `password` as password.

Then, at the end of your coding session, you can stop the environment by:

```sh
npm run env stop
```
