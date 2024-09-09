import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,/* 
  addEdge,
  useEdgesState,
  useNodesState, */
  Position,
} from "@xyflow/react";
import "./App.css";
import "@xyflow/react/dist/style.css";
import CustomNode from "./components/CustomNodes";
import SelectedNodesToolbar from "./components/SelectedNodesToolbar";
import { useShallow } from 'zustand/react/shallow';

import useStore from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: {
      label: "Source",
      sublabel: "Orders",
      toolbarVisible: true,
      toolbarPosition: Position.Top,
      backgroundColor: "#F7A52A",
      image: "src/assets/orange.svg",
    },
    position: { x: 100, y: 100 },
    style: { backgroundColor: "#F7A52A" },
  },
  {
    id: "2",
    type: "custom",
    data: {
      label: "Filter",
      sublabel: "Filter 1",
      toolbarVisible: true,
      toolbarPosition: Position.Top,
      backgroundColor: "#F5BC2A",
      image: "src/assets/yellow.svg",
    },
    position: { x: 250, y: 100 },
    style: { backgroundColor: "#F5BC2A" },
  },
  {
    id: "3",
    type: "custom",
    data: {
      label: "Join",
      sublabel: "Join 1",
      toolbarVisible: true,
      toolbarPosition: Position.Top,
      backgroundColor: "#FF8BB4",
      image: "src/assets/pink.svg",
    },
    position: { x: 400, y: 100 },
    style: { backgroundColor: "#FF8BB4" },
  },
  {
    id: "4",
    type: "custom",
    data: {
      label: "Router",
      sublabel: "Router 1",
      toolbarVisible: true,
      toolbarPosition: Position.Top,
      backgroundColor: "#A020F0",
      image: "src/assets/purple.svg",
    },
    position: { x: 550, y: 100 },
    style: { backgroundColor: "#A020F0" },
  },
  {
    id: "5",
    type: "custom",
    data: {
      label: "Transform",
      sublabel: "Transform 1",
      toolbarVisible: true,
      toolbarPosition: Position.Top,
      backgroundColor: "#40E0D0",
      image: "src/assets/teal.svg",
    },
    position: { x: 700, y: 100 },
    style: { backgroundColor: "#40E0D0" },
  },
  {
    id: "6",
    type: "custom",
    data: {
      label: "Target",
      sublabel: "Target 1",
      toolbarVisible: true,
      toolbarPosition: Position.Top,
      backgroundColor: "#07A260",
      image: "src/assets/green.svg",
    },
    position: { x: 850, y: 100 },
    style: { backgroundColor: "#07A260" },
  },
  {
    id: "7",
    type: "custom",
    data: {
      label: "Ship",
      sublabel: "Ship 1",
      toolbarVisible: true,
      toolbarPosition: Position.Top,
      backgroundColor: "#D4A4FC",
      image: "src/assets/magenta.svg",
    },
    position: { x: 1000, y: 100 },
    style: { backgroundColor: "#D4A4FC" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
  { id: "e6-7", source: "6", target: "7" },
];

const App = () => {
  /* const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  ); */

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  return (
    <div className="App">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background variant="dots" gap={12} size={1} />
        <SelectedNodesToolbar />
      </ReactFlow>
    </div>
  );
};

export default App;
