import React, { ComponentType } from "react"
import * as Amp from "react-amphtml"

import AmpBase from "../templates/AmpBase"
import { Post } from "../type"

type Props = { post: Post }

export default function Post(props: Props) {
  const { post } = props
  const { filename, contents, postHeader } = post
  return (
    <AmpBase
      canonical={`https://blog.yamatatsu193.net/${filename}`}
      description={postHeader.description}
      body={() => (
        <div>
          <a href="https://blog.yamatatsu193.net/">
            <h3>やまたつ Blog</h3>
          </a>
          <h1>{filename}</h1>
          <Amp.AmpImg
            specName="default"
            src="/images/profile-pic.jpg"
            width={24}
            height={24}
            alt="yamatatsu"
          />
          {contents}
        </div>
      )}
    />
  )
}
