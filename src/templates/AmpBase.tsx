import React, { FunctionComponent } from "react"
import * as Amp from "react-amphtml"
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from "react-amphtml/setup"

const ampScripts = new AmpScripts()

type Props = { canonical: string; description: string; body: FunctionComponent }

const AmpBase: FunctionComponent<Props> = props => {
  const { canonical, description, body: Body } = props
  return (
    <Amp.Html>
      <head>
        {headerBoilerplate(canonical)}
        <title>やまたつ Blog</title>
        <meta name="Description" content={description}></meta>
        {ampScripts.getScriptElements()}
      </head>
      <body>
        <AmpScriptsManager ampScripts={ampScripts}>
          <Body></Body>
        </AmpScriptsManager>
        <Amp.AmpAnalytics type="gtag" data-credentials="include">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                vars: {
                  gtag_id: "UA-146821060-1",
                  config: {
                    "UA-146821060-1": { groups: "default" },
                  },
                },
              }),
            }}
          />
        </Amp.AmpAnalytics>
      </body>
    </Amp.Html>
  )
}

export default AmpBase
