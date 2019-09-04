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

const postPath = `${__dirname}/../posts`
const distPath = `${__dirname}/../public`

const posts: Post[] = fs.readdirSync(postPath).map(filename => {
  const md = fs.readFileSync(`${postPath}/${filename}`, "utf-8")
  const postHeader = getPostHeader(md)
  const html = getHtml(md)
  return { filename: filename.replace(/\.md$/, ""), postHeader, contents: html }
})

loadTemplate("index.ejs", { posts })
  .then(str => fs.promises.writeFile(`${distPath}/index.html`, str))
  .catch(err => console.error(err))

posts.forEach(post => {
  const dirPath = `${distPath}/${post.filename}`
  fs.promises
    .mkdir(dirPath)
    .then(() => loadTemplate("post.ejs", { post }))
    .then(str => fs.promises.writeFile(`${dirPath}/index.html`, str))
    .catch(err => console.error(err))
})

function getPostHeader(md: string): Record<string, string> {
  const yamlNode = (unified()
    .use(parse)
    .use(frontmatter)
    .parse(md) as Parent).children.find(node => node.type === "yaml")
  return yamlNode && yaml.safeLoad(yamlNode.value as string)
}

function getHtml(md: string): string {
  const contents = unified()
    .use(parse)
    .use(frontmatter)
    .use(remarkHtml)
    .processSync(md).contents as string
  return contents
}

function loadTemplate(path: string, data: Record<string, any>) {
  return ejs.renderFile(`${__dirname}/../ejs/${path}`, data, {
    root: `${__dirname}/../ejs`,
  })
}
