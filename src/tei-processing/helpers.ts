export function parseXML(xml: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");

    return doc;
}

export async function fetchXML(url:string) {
    const response = await fetch(url);
    const xml = await response.text();

    return parseXML(xml);
}

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
