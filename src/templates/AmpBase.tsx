import React, { FunctionComponent } from "react"
import * as Amp from "react-amphtml"
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from "react-amphtml/setup"

const ampScripts = new AmpScripts()

type Props = {}

const BodyContent: FunctionComponent = () => (
  <AmpScriptsManager ampScripts={ampScripts}>
    <div>
      <h1>やまたつ Blog</h1>
      <Amp.AmpImg
        specName="default"
        src="/images/profile-pic.png"
        width={120}
        height={120}
        alt="yamatatsu"
      />
      <Amp.AmpAccordion />
    </div>
  </AmpScriptsManager>
)

export default function AmpBase(props: Props) {
  return (
    <Amp.Html>
      <head>
        {headerBoilerplate("/")}
        <title>やまたつ Blog</title>
        {ampScripts.getScriptElements()}
      </head>
      <body>
        <BodyContent />
      </body>
    </Amp.Html>
  )
}
