import React, { FunctionComponent } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import * as Amp from "react-amphtml"
import {
  AmpScripts,
  AmpScriptsManager,
  headerBoilerplate,
} from "react-amphtml/setup"

type Props = { canonical: string; description: string; body: FunctionComponent }

const AmpBase: FunctionComponent<Props> = props => {
  const { canonical, description, body: Body } = props

  const ampScripts = new AmpScripts()

  const bodyContent = renderToStaticMarkup(
    <div>
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
    </div>
  )

  return (
    <Amp.Html>
      <head>
        {headerBoilerplate(canonical)}
        <title>やまたつ Blog</title>
        <meta name="Description" content={description}></meta>
        {ampScripts.getScriptElements()}
      </head>
      <body dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </Amp.Html>
  )
}

export default AmpBase