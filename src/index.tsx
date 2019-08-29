import fs from "fs"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"

import Home from "./pages/Home"

const html = "<!doctype html>" + renderToStaticMarkup(<Home />)

console.info(html)

fs.writeFileSync(`${__dirname}/../public/index.html`, html)
