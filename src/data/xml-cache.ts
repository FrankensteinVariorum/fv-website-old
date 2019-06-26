// This class holds a cache of XML documents, fetching them from the web if they are not there
// Every piece of code uses this, so that we can load XMLs again and again without worried about performance
//
// NOTE: The cache contains parsed Documents. If you change the document, it's going to be changed everywhere.
// This is on purpose - as we add attributes and tags for pointer resolution.

export default class XmlCache {
    private  _xmls : Map<string, Document>;  // Map from URL to a parsed XML

    public constructor() {
        this._xmls = new Map<string, Document>();
    }

    public async getXML(url: string) {
        if (!this._xmls.has(url)) {
            await this.fetchXML(url);
        }

        return this._xmls.get(url)!; // The ! means we are cetain 'undefined' will not be returned
    }

    private parseXML(xml: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");
    
        return doc;
    }
    
    private async fetchXML(url:string) {
        const response = await fetch(url);
        const xml = await response.text();
    
        const doc = this.parseXML(xml);
        this._xmls.set(url, doc);

        return doc
    }
}