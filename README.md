# App
> Frontend: React + TypeScript + TailwindCSS + Vite
> Backend: 

## Description:

Frontend app

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


<br />

## 🚀 LIVE

## 📺 DEMO

![](https://github.com/Philight/currency-convertor/blob/main/preview/preview.gif)

## 🖋️ SKETCH

<a href="https://www.figma.com/file/Aaj7iLk7g8CH1y1nmu8qkx/%5B-sketch-%5D-flight-radar?type=design&node-id=0%3A1&mode=design&t=GpQFyxeMb9vyphKD-1" target="_blank">[ Figma ] Design document</a>

<br />

## 🧰 BUILT WITH

### ⛰️ FRONTEND

- React.js [ *Hooks, Refs, Context, Reducer* ]
- HTML
- CSS [ *TailwindCSS* ]
- Javascript [ *Typescript* ]
- Framer Motion

### 💠 PLUGINS & TOOLS

- eslint, Prettier
- formik, yup
- axios

### 🏗️ BUILD & DEPLOYMENT

- vite
- git [ *GitHub* ]

<br />

## ⚙️ AVAILABLE SCRIPTS

In the project directory, you can run:

```
npm run start
```

```
npm run dev
```

```
npm run build
```

```
npm run preview
```

```
npm run format
```

```
npm run type:check
```