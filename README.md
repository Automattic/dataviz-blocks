# Data Visualization Blocks (Experimental)

_Just another bundle of blocks plugin._

A bundle of blocks for quick and easy data visualizations. Experimental.

## Blocks

Once plugin's activated, a new category `Dataviz Blocks` will show up in the Add Block popover. There is currently only a demo-d3 block there rendering a simple svg with d3 in both editor & frontend.

## Technical

This is an experimental/playground repo. The setup's borrowed (in some form) from https://github.com/automattic/wpcom-blocks. Same development workflow (with `wpcom` replaced by `dataviz` where relevant). There are a few important differences: blocks and other relevant code (`editor.scss`, `style.scss`, etc.) now live under `src`, and blocks contain a `frontend` folder where all the JS required for the frontend are exposed. A separate build process compiles these into a separate bundle for serving on the frontend only (pressumably these are the minimal code needed to render the svg/d3).

The folder structure is as follows:

```
src/
|–– blocks/
|–– components/
|–– shared/
|–– styles/
    |–– editor.scss
    |–– style.scss
|–– frontend.js
|–– index.js
```

where `shared` includes any standalone functions that are shared between the editor and the frontend. For a single block, the structure is a typical block's, with styles contained in `styles` and frontend JS in `frontend`:

```
block-name/
|–– frontend/
    |–– index.js
|–– styles/
    |–– editor.scss
    |–– style.scss
|–– edit.js
|–– index.js
|–– index.php
|–– save.js
```

[demo-d3](https://github.com/Automattic/dataviz-blocks/tree/master/src/blocks/demo-d3) demonstrates the above rendering a simple svg with d3 in both editor & frontend. The frontend code only loads the bare minimum required d3 routine.

### Development

Install the build scripts with:

`yarn install`

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
