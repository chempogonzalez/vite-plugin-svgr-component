# Vite svgr component plugin

<img src="https://img.shields.io/npm/v/vite-plugin-svgr-component?style=for-the-badge" />

> Vite zero-config customizable plugin to import SVG and transform it to a React component in a simple way.

## 🚀 Features
- 👌 **Zero-config**: built-in default configs for common use cases
- ✅ **Easy import**: Not aditional `?component` string needed
- ⚒️ **Configurable**: full ability to customize the behavior of the plugin
- ⚛️ **Transformed with SVGR**: [svgr](https://react-svgr.com/) library based to transform the svg to a React Component
- ⚡ **Optimized SVG**: Optimized with [SVGO](https://github.com/svg/svgo) plugin
- 🔑 **Fully typed**: written in Typescript and extends SVGR options with types

## 📦 Install
```bash
# NPM install as a devDepencency
npm i vite-plugin-svgr-component -D

# YARN install as a devDependency
yarn add vite-plugin-svgr-component -D
```

## 💻 Usage
Add `svgrComponent` plugin to `vite.config.js / vite.config.ts` and use it:

> By default it will transform all the `*.svg` files imported to a React component

```ts
/* vite.config.js / vite.config.ts */
import { svgrComponent } from 'vite-plugin-svgr-component';

export default {
  // ...
  plugins: [
    svgrComponent()
  ]
}
/*---------------------------------------------------------*/



/* React component file */
import CustomIcon from 'custom-icon.svg';

const Component = (props) => (
  <div>
    <CustomIcon />

    {/* You can add a title by default */}
    <CustomIcon title="custom svg title" />

    {/* Accesibility (A11y) title props linked to titleId prop */}
    <CustomIcon title="custom svg title" titleId="custom-icon"/>

  </div>
)
```

## 🛠️ Config
#### Change import pattern to be transformed
As it uses [micromatch](https://www.npmjs.com/package/micromatch) under the hood, you can set a string pattern to transform specific svg file imports
```ts
/* vite.config file */

export default {
  // ...
  plugins: [
    // Example: import HomeIcon from 'home-icon-embedded.svg'
    svgrComponent({ importStringPattern: '*-embedded.svg' })
  ]
}
```

#### Change SVGR options
As it uses [svgr](https://react-svgr.com/) under the hood, you can set all the available options to generate the react component. Here you have an example:
```ts
/* vite.config file */

export default {
  // ...
  plugins: [
    svgrComponent({
      svgrOptions: {
        ref: true, // Forward the ref to the root SVG tag.
        icon: true, // Replace SVG width and height with
                    // 1em to make SVG inherit text size.
        /* ... */
      }
    })
  ]
}
```

## Use with Typescript
If you use the plugin in a Typescript project you will `need the reference to the type definitions` to allow to use "title" and "titleId" in your SVGComponent
```ts
/* vite-env.d.ts (file) */
/// <reference types="vite-plugin-svgr-component/client" />
```



## 🔑 Full config
Check out the type declaration [src/index.ts](https://github.com/chempogonzalez/vite-plugin-svgr-component/blob/main/src/index.ts#L95-L118) with all the related types


> Created with Typescript! ⚡ and latin music 🎺🎵
