import React, { ReactNode } from 'react';
import TeiReactElement from '../tei-components/TeiReactElement';
import TeiReactText from '../tei-components/TeiReactText';

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
            for (let i = 0; i < node.childNodes.length; i++) {
                const childNode = node.childNodes[i];
                let childElement: ReactNode = undefined;
                if (childNode.nodeType === 1) {
                    childElement = this.teiToReactElement(childNode, depth + 1);
                } else if (childNode.nodeType === 3) {
                    let text = childNode.textContent || '';
                    text = text.trim();
                    if (text) {
                        childElement = React.createElement(TeiReactText, {
                            x_depth: depth + 1,
                            text: childNode.textContent || '',
                        });
                    }
                } else {
                    console.warn('Child node of unrecognizezd type: ', childNode);
                }

                if (childElement) {
                    reactChildren.push(childElement);
                }
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
