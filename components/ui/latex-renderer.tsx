import React from "react";

import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

// Hardcoded delimiters, agreed upon by the team
const LATEX_START = "§§LATEX_START§§";
const LATEX_END = "§§LATEX_END§§";

interface LatexRendererProps {
  content: string;
}

const LatexRenderer = ({
  content,
}: LatexRendererProps) => {
  const parts = content.split(new RegExp(`(${LATEX_START}.*?${LATEX_END})`, "g"));
  console.log(content);

  return (
    <span>
      {parts.map((part, i) => {
        console.log(part);
        if (part.startsWith(LATEX_START) && part.endsWith(LATEX_END)) {
          // const latex = part.slice(LATEX_START.length, -LATEX_END.length).trim();
          const rawLatex = part.slice(LATEX_START.length, -LATEX_END.length).trim();
          const latex = rawLatex.startsWith('$') && rawLatex.endsWith('$')
            ? rawLatex.slice(1, -1)
            : rawLatex;
          return <InlineMath key={i} math={latex} />;
        } else {
          return <React.Fragment key={i}>{part}</React.Fragment>
        }
      })}
    </span>
  );
};

export default LatexRenderer;
