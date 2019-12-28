import React from "react";
import  Highlight, { defaultProps, Language } from "prism-react-renderer";

interface SyntaxHighlighterProps {
    lang: string
    children: string
}

export class SyntaxHighlighter extends React.Component<SyntaxHighlighterProps> {
    render() {
        const className: Language = this.props.lang as Language;

        const code: string = this.props.children ?? "";
        let node = (
            <Highlight {...defaultProps} code={code} language={className}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
                {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                    ))}
                </div>
                ))}
            </pre>
            )}
        </Highlight>
        );

        return node;
    }
}