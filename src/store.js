import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set(
      (state) => ({
        nodes: applyNodeChanges(changes, state.nodes),
      }),
      false,
      "onNodesChange"
    );
  },
  onEdgesChange: (changes) => {
    set(
      (state) => ({
        edges: applyEdgeChanges(changes, state.edges),
      }),
      false,
      "onEdgesChange"
    );
  },
  onConnect: (connection) => {
    set(
      (state) => ({
        edges: addEdge(connection, state.edges),
      }),
      false,
      "onConnect"
    );
  },
  setSelectedNodes: (nodes) => {
    set(
      (state) => ({
        nodes: state.nodes.map((node) => ({
          ...node,
          selected: nodes.includes(node.id),
        })),
      }),
      false,
      "setSelectedNodes"
    );
  },
  setSelectedEdges: (edges) => {
    set(
      (state) => ({
        edges: state.edges.map((edge) => ({
          ...edge,
          selected: edges.includes(edge.id),
        })),
      }),
      false,
      "setSelectedEdges"
    );
  },
  setNodes: (nodes) => {
    set(
      (state) => ({
        nodes,
      }),
      false,
      "setNodes"
    );
  },
  setEdges: (edges) => {
    set(
      (state) => ({
        edges,
      }),
      false,
      "setEdges"
    );
  },
}));

export default useStore;
