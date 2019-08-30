import React, { FunctionComponent } from "react"
import * as Amp from "react-amphtml"
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from "react-amphtml/setup"

const ampScripts = new AmpScripts()

type Props = { canonical: string; body: FunctionComponent }

const AmpBase: FunctionComponent<Props> = props => {
  const { canonical, body: Body } = props
  return (
    <Amp.Html>
      <head>
        {headerBoilerplate(canonical)}
        <title>やまたつ Blog</title>
        {ampScripts.getScriptElements()}
      </head>
      <body>
        <AmpScriptsManager ampScripts={ampScripts}>
          <Body></Body>
        </AmpScriptsManager>
      </body>
    </Amp.Html>
  )
}

export default AmpBase
