import fs from "fs"
import ejs from "ejs"
import { Parent } from "unist"
import unified from "unified"
import parse from "remark-parse"
import yaml from "js-yaml"
// @ts-ignore
import frontmatter from "remark-frontmatter"
// @ts-ignore
import remarkHtml from "remark-html"

import { Post } from "./type"

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
    .use(remarkHtml)
    .processSync(md).contents as string

  return { filename: filename.replace(/\.md$/, ""), postHeader, contents }
})

loadTemplate("index.ejs", { posts })
  .then(str => {
    fs.writeFileSync(`${__dirname}/../public/index.html`, str)
  })
  .catch(err => console.error(err))

posts.forEach(post => {
  loadTemplate("post.ejs", { post })
    .then(str => {
      fs.mkdirSync(`${__dirname}/../public/${post.filename}`, {
        recursive: true,
      })
      fs.writeFileSync(
        `${__dirname}/../public/${post.filename}/index.html`,
        str
      )
    })
    .catch(err => console.error(err))
})

function loadTemplate(path: string, data: Record<string, any>) {
  return ejs.renderFile(`${__dirname}/../ejs/${path}`, data, {
    root: `${__dirname}/../ejs`,
  })
}
