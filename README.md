# Data Visualization Blocks (Experimental)

A bundle of Gutenberg blocks for quick and easy data visualizations. Experimental.

## Available Blocks (dev)

Once the plugin is activated, a category `Dataviz Blocks` will appear in the block inserter.

- [Block for rendering simple Bar Charts](https://github.com/Automattic/dataviz-blocks/tree/master/src/blocks/bar-chart)

## Technical

This is an experimental repo. The setup has been borrowed (in some form) from https://github.com/automattic/wpcom-blocks. Similar development workflow (with `wpcom` replaced by `dataviz` where relevant). There are a few important differences: blocks and other relevant code (`editor.scss`, `style.scss`, etc.) now live under `src`, and blocks contain a `frontend` folder where all the JS required for the frontend are exposed. A separate build process compiles these into a separate bundle for serving on the frontend only (pressumably, these are the minimal code required to render the D3/SVG parts).

The folder structure is as follows:

```
src/
|–– blocks/
|–– components/
|–– styles/
    |–– editor.scss
    |–– style.scss
|–– utils/
|–– frontend.js
|–– index.js
```

For a single block, the structure is a typical block's, with styles contained in `styles` and frontend JS in `frontend`. `utils` includes code shared between the editor and the frontend e.g. `D3.js` code for rendering the charts/graphs.

```
block-name/
|–– frontend/
    |–– index.js
|–– styles/
    |–– editor.scss
    |–– style.scss
|–– utils/
|–– edit.js
|–– index.js
|–– index.php
|–– save.js
```

[demo-d3](https://github.com/Automattic/dataviz-blocks/tree/master/src/blocks/demo-d3) demonstrates the above rendering a simple SVG with D3.js in both editor & frontend. The frontend code only loads the bare minimum required D3 routines.

### Development

Install the build scripts with:

`yarn install`

Run the development build with JS/SASS watchers:

`yarn start`

### Production

Install the build scripts (if haven't done already):

`yarn install`

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
