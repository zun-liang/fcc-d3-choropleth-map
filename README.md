# freeCodeCamp - Visualize Data with a Choropleth Map

This is a solution to the [Visualize Data with a Choropleth Map](https://www.freecodecamp.org/learn/data-visualization/data-visualization-projects/visualize-data-with-a-choropleth-map) on freeCodeCamp.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- View United States Educational Attainment in the map
- Interact with the map to find out the percentage of adults age 25 and older with a bachelor's degree or higher in each county

### Screenshot

<table>
  <tr>
    <td>
      <img src="./public/screenshots/screenshot-desktop-default.png" alt="screenshot desktop default" style="width: 300px" />
    </td>
  </tr>
</table>

### Links

- Live Site URL: [here](https://zun-liang.github.io/fcc-d3-choropleth-map)

## My process

### Built with

- HTML
- CSS
- TypeScript
- D3.js
- Vite
- Mobile-first workflow

### What I learned

- How to draw a US map using d3.js and topojson-client
- How to add link in d3.js
- nullish coalescing operator (??)
- How to create a clickable link in svg - `<tspan>`, `<a>`, `xlink:href`
- How to fetch data in d3.js - d3.json()
- How to resize svg in d3.js - viewBox

### Helpful Resources

- [How to draw a US map](https://observablehq.com/@jeantimex/how-to-draw-a-us-map)
- [topojson-client](https://github.com/topojson/topojson-client?tab=readme-ov-file)
- [Why Use viewBox](https://observablehq.com/@uw-info474/why-use-viewbox)
- [Nullish coalescing operator(??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
  >"The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand."

- [Paths](https://d3js.org/d3-geo/path)
- [xlink: href](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href)
- [tspan](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan)

## Author

- Website - [Zun Liang](https://zunldev.com/)
- GitHub - [@zun-liang](https://github.com/zun-liang)
- Frontend Mentor - [@zun-liang](https://www.frontendmentor.io/profile/zun-liang)
- freeCodeCamp - [@zun-liang](https://www.freecodecamp.org/zun-liang)
