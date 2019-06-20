import React, { ReactNode } from 'react';
import TeiReactElement from '../tei-components/TeiReactElement';

export class TeiConverter {
        private static TeiReactElement = TeiReactElement;
        private static index = 0;

        private buildProperties(node: Node): any {
                const nodeAttributes = (node as any).attributes;
                const valueProps: any = {};

                for (var i = 0; i < nodeAttributes.length; i++) {
                        let name = nodeAttributes[i].nodeName;
                        if (name === 'xml:id') {
                                name = 'id';
                        }
                        valueProps[name] = nodeAttributes[i].nodeValue;
                }

                return valueProps;
        }

        public teiToReactElement(node: Node, depth: number): ReactNode {  // Returns a single React element
                const reactChildren: ReactNode[] = [];
                // create elements for all children
                if (node.hasChildNodes()) {
                        // TODO: add texts (no new line text)
                        const children = Array.from(node.childNodes).filter(c => c.nodeType === 1); // (no 3- #text node, new line ?)

                        for (let i = 0; i < children.length; i++) {
                                const child = this.teiToReactElement(children[i], depth + 1);
                                reactChildren.push(child);
                        }
                }

                // build properties
                const valueComponent = this.buildProperties(node);

                // return create react element
                var props: any = {
                        tag: node.nodeName,
                        key: TeiConverter.index++,
                        x_depth: depth,
                        teiProps: valueComponent
                };
                if (valueComponent.id) {
                        props['id'] = valueComponent.id;
                }
                     
                const reactElement = React.createElement(TeiConverter.TeiReactElement, props, reactChildren); // Pass children

                return reactElement;
        }
}
