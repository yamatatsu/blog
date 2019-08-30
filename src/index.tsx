import fs from "fs"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { Parent } from "unist"
import unified from "unified"
import parse from "remark-parse"
import yaml from "js-yaml"
// @ts-ignore
import frontmatter from "remark-frontmatter"
// @ts-ignore
import remark2react from "remark-react"

import { Post } from "./type"
import Home from "./pages/Home"
import PostPage from "./pages/Post"

const filenames = fs.readdirSync(`${__dirname}/../posts`)

const posts = filenames.map<Post>(filename => {
  const md = fs.readFileSync(`${__dirname}/../posts/${filename}`, "utf-8")

  const yamlNode = (unified()
    .use(parse)
    .use(frontmatter)
    .parse(md) as Parent).children.find(node => node.type === "yaml")
  const postHeader = yamlNode && yaml.safeLoad(yamlNode.value as string)

  const contents = unified()
    .use(parse)
    .use(frontmatter)
    .use(remark2react)
    .processSync(md).contents as string

  return { filename: filename.replace(/\.md$/, ""), postHeader, contents }
})

render("index", <Home posts={posts} />)

posts.forEach(post => {
  render(post.filename, <PostPage post={post} />)
})

function render(name: string, element: React.ReactElement) {
  fs.writeFileSync(
    `${__dirname}/../public/${name}.html`,
    "<!doctype html>" + renderToStaticMarkup(element)
  )
}
