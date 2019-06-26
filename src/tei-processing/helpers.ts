
export function evaluateXPath(doc: Document, xpath: string): Node[] {
    const resolver = doc.createNSResolver(doc.documentElement);
    const xpathResult = doc.evaluate(xpath, doc, resolver);
    const nodes: Node[] = [];

    let node = xpathResult.iterateNext();
    while(node) {
        nodes.push(node);
        node = xpathResult.iterateNext();
    }

    return nodes;
}
