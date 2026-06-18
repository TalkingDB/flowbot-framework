import * as d3 from 'd3';

export interface Node extends d3.SimulationNodeDatum {
    id: string;
    img?: string;
}

export interface Edge extends d3.SimulationLinkDatum<Node> {
    source: Node | string;
    target: Node | string;
    relation?: string;
}