# ASP.NET Core MVC + Vue.js + TypeScript

## Summary
This is an example of one approach to using [Vue.js](https://vuuejs.org) with [TypeScript](https://www.typescriptlang.org) on [ASP.NET Core](https://dotnet.microsoft.com) MVC Razor Views. 

The same approach can be used for Razor Pages as well.

## Setup
```
npm install
```

## Run

VS Code: Press F5 to run the `.NET Core Launch (web)` launch configuration.

OR...

```
npm run build:dev

dotnet run
```

## Details
The goal of this example is to show one example of hwo o use Vue.js with existing ASP.NET Core MVC `.cshmtl` Views. This is achieved by using [webpack](https://webpack.js.org) to create javascript bundles for each ASP.NET MVC View that will include Vue.js. 

The project was created from a barebones dotnetcore mvc 5 application (`dotnet new mvc`) and a Vue.js application craeted using the vue-cli (`vue create app`). Webpack has been added and other configurations have been made. 

The project has the following basic structure which should look familiar from Vue.js and ASP.NET MVC apps.

### Basic Structure
```
Project Root
├── build
|   └── webpack.config.dev.js
├── Controllers (asp.net core mvc Controllers)
├── Models (asp.net core mvc Models)
├── src (Vue.js Source)
|   ├── components (Vue.js components)
|   |   ├── HelloWorld.vue
|   |   └── LayoutFooter.vue
|   ├── pages
|   |   ├── home
|   |   |   └── index.ts (Vue.js Application root for Home View)
|   |   └── layout
|   |       └── index.ts (Vue.js Application root for _Layout View)
|   └── store (Vuex store)
├── Views (asp.net core mvc Views)
├── package.json
└── tsconfig.json
```

Each page that includes Vue.js will have it's own corresponding `index.ts` that will be the root for a Vue.js application running on that page. In this context root does not mean the root of a URL structure. In this setup each page is it's own Vue.js application. No routing is used in this example. A Vuex store is included for refrence but is not used in this example.

Each MVC View must have an element which is used as the `el` option when initializing Vue. This element does not have to be the parent element in the Razor View but it can be if desired. This element should have a unique ID and for simplicity in this example the page name is used as the ID. (Note: This could lead to conflicts in larger applications if View names are not unique)

Each View has a script reference to it's corresponding Vue.js bundle in its `@section scripts`. The `asp-append-version="true"` attribute is used to help with cache busting for js files.

Shared Views can take advantage of this approach as well. An example is included with the `Footer.cshtml` View.

One thing to note when using Vue.js on a layout page is that you can not wrap the entire Layout as a Vue.js application. The reason is that any MVC View that renders under `@RenderBody` will include compoenents that are not knowns to the *layout* Vue.js Application. 

For this reason (and others such as bundle bloat from including Vue in multiple bundles which can't be avoided Single File Components) this approach should **not** be considered a final solution and more of a transition option for migrationg from Razor MVC Views to a pure Vue.js application.

One could consider bundling only at the MVC Layout level using distinct Layout Pages for pages that can be groups as a single application if desired. Plugins could also be used to manage registering components, Vuex Modules, etc. with additional work.

This example is **not** a final product and mearly shows one possible way to integrate Vue.js and ASP.NET MVC.

## Feedback + Issues
Please use the issues section of this repository for any questions, comments, concerns, issues, etc.

## Notice
This is a simple starting point for how to integrate Vue.js with ASP.NET MVC and is not production ready. 