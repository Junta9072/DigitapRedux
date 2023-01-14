function parseMarkdown(markdownText) {
  const htmlText = markdownText
    .replace(/^###### (.*$)/gim, "<h6>$1</h6>") //header
    .replace(/^##### (.*$)/gim, "<h5>$1</h5>") //header
    .replace(/^#### (.*$)/gim, "<h4>$1</h4>") //header
    .replace(/^### (.*$)/gim, "<h3>$1</h3>") //header
    .replace(/^## (.*$)/gim, "<h2>$1</h2>") //header
    .replace(/^# (.*$)/gim, "<h1>$1</h1>") //header
    .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>") //blockquote
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") //bold
    .replace(/\*(.*)\*/gim, "<i>$1</i>") //italics
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />") //img
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>") //anchor
    .replace(" {2,}", " </br> ") //line break
    .replace(/^\*\s(.*)$/gm, "<li>$1</li>") //unordered lists
    .replace(/^\*.*(?=\n|$)(?:\n|.)*\*.*$/gm, "<ul>$1</ul>")
    .replace(/^\d*\.\s[^\n]*(?=\d*\.\s)/gim, "<ol><li>$1</li></ol>"); //ordered lists

  return "<div>" + htmlText.trim() + "</div>";
}

export { parseMarkdown };
