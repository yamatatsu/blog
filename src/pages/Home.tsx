import React from "react"
import * as Amp from "react-amphtml"

import AmpBase from "../templates/AmpBase"
import { Post } from "../type"

type Props = { posts: Post[] }

export default function Home(props: Props) {
  const { posts } = props
  return (
    <AmpBase
      canonical="https://blog.yamatatsu193.net/"
      body={() => (
        <div>
          <h1>やまたつ Blog</h1>
          <Amp.AmpImg
            specName="default"
            src="/images/profile-pic.jpg"
            width={120}
            height={120}
            alt="yamatatsu"
          />
          {posts.map(post => {
            const { filename, postHeader } = post
            const { title, date, description } = postHeader
            return (
              <a key={filename} href={`/${filename}.html`}>
                <div>title: {title}</div>
                <div>date: {date}</div>
                <div>description: {description}</div>
              </a>
            )
          })}
        </div>
      )}
    />
  )
}
