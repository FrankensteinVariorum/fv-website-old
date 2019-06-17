import React from 'react';

interface ReactCompInfo {
        reactCompClass: string;
        props: string[];
}

interface ReactValueCompInfo {
        reactCompClass: string;
        valueProps: [];
}

export class TeiConverter {
        private static _comps : Map<string, ReactCompInfo>;

        constructor() {
                TeiConverter._comps = new Map<string, ReactCompInfo>();
                TeiConverter.fillComps();
        }

        private static fillComps() {
                const componentsClass: any = {
                        'app': {reactCompClass: 'TeiApp', props: ['id']} as ReactCompInfo,
                        'rdgGrp': {reactCompClass: 'TeiRdgGrp', props: ['id', 'n']} as ReactCompInfo,
                        'rdg': {reactCompClass: 'TeiRdg', props: ['wit']} as ReactCompInfo,
                        'seg': {reactCompClass: 'TeiSeg', props: ['id']} as ReactCompInfo, // 'part'
                };

                for (let key in componentsClass) {
                        TeiConverter._comps.set(key, componentsClass[key]);
                }
        }

        private getComp(tag: string): ReactCompInfo | undefined {
                if (!TeiConverter._comps.has(tag)) {
                    // throw new Error(`Can't find the component for ${tag}.`);
                    console.error(`Can't find component for ${tag}.`);
                    return undefined;
                }
        
                return TeiConverter._comps.get(tag)!;
        }

        private buildProperties(node: Node, compInfo: ReactCompInfo): ReactValueCompInfo {
                const nodeAttributes = (node as any).attributes;
        
                var valueProps = compInfo.props.map((prop) => {
                        var xmlProp = prop;
                        if (prop === 'id') {
                                xmlProp = 'xml:id';
                        }
                        if (!nodeAttributes[xmlProp]) {
                                console.error(`There is no property '${xmlProp}' in '${node.nodeName}' node.`);
                                return {};
                        }       
                        const val = nodeAttributes[xmlProp].nodeValue;
                        return {key: prop, value: val};
                });

                return {
                        reactCompClass: compInfo.reactCompClass,
                        valueProps
                } as ReactValueCompInfo;
        }

        public teiToReactElement(node: Node) {
                // create elements for all children
                if (node.hasChildNodes()) {
                        var children = node.childNodes;
                      
                        for (var i = 0; i < children.length; i++) {
                                this.teiToReactElement(children[i]);
                        }
                }

                // find reactCompInfo
                if (node.nodeType === 1) { // (no 3- #text node)
                        let compInfo: ReactCompInfo | undefined;
                        compInfo = this.getComp(node.nodeName);
                        
                        if (compInfo) {
                                // build properties
                                const valueComponent = this.buildProperties(node, compInfo);
                                console.log('valueComponent=', valueComponent);
                                // return create react element
                                return valueComponent;
                                // return React.createElement(valueComponent.reactCompClass, valueComponent.valueProps);
                                
                        } 
                }
        }
}

export function tryConverter(node: Node) {
        var converter = new TeiConverter();
        console.log("tryConverter result:", converter.teiToReactElement(node));
}