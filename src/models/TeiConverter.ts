import React from 'react';
import TeiElement from '../tei-components/TeiElement';

interface ReactCompInfo {
        // reactCompClass: string;
        tag: string;
        props: string[];
}

interface ReactValueCompInfo {
        // reactCompClass: string;
        tag: string;
        valueProps: [];
}

export class TeiConverter {
        private static _comps : Map<string, ReactCompInfo>;
        private static teiElement = TeiElement;
        private static index = 0;
        public elementsList =[];

        constructor() {
                TeiConverter._comps = new Map<string, ReactCompInfo>();
                TeiConverter.fillComps();
        }

        private static fillComps() { 
                // const componentsClass: any = {
                //         'app': {reactCompClass: 'TeiApp', props: ['id']} as ReactCompInfo,
                //         'rdgGrp': {reactCompClass: 'TeiRdgGrp', props: ['id', 'n']} as ReactCompInfo,
                //         'rdg': {reactCompClass: 'TeiRdg', props: ['wit']} as ReactCompInfo,
                //         'seg': {reactCompClass: 'TeiSeg', props: ['id']} as ReactCompInfo, // 'part'
                // };
                const componentsClass: any = {
                        'app': {tag: 'app', props: ['id']} as ReactCompInfo,
                        'rdgGrp': {tag: 'rdgGrp', props: ['id', 'n']} as ReactCompInfo,
                        'rdg': {tag: 'rdg', props: ['wit']} as ReactCompInfo,
                        'seg': {tag: 'seg', props: ['id', 'part']} as ReactCompInfo,
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
                        return {[prop]: val};
                });

                return {
                        // reactCompClass: compInfo.reactCompClass,
                        tag: compInfo.tag,
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

                                // return create react element
                                var props: any = {
                                        tag: valueComponent.tag,
                                        key: TeiConverter.index++,
                                        key1: TeiConverter.index,
                                };
                                
                                for (var a of Object.values(valueComponent.valueProps)) {
                                        for (let key in (a as any)) {
                                                props[key] = a[key];
                                        }
                                }
                                console.log("props=", props);
                                
                                (this.elementsList as any).push(React.createElement(TeiConverter.teiElement, props));
                                // return this.elementsList;
                                // return React.createElement(valueComponent.reactCompClass, props);
                                // return React.createElement(TeiConverter.teiElement, props);
                        } 
                }
        }
}

export function tryConverter(node: Node) {
        var converter = new TeiConverter();
        converter.teiToReactElement(node);
        console.log("tryConverter result:", converter.elementsList);
        return converter.elementsList;
}