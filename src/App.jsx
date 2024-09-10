import React, { useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
} from "@xyflow/react";
import "./App.css";
import "@xyflow/react/dist/style.css";
import CustomNode from "./components/CustomNodes";
import SelectedNodesToolbar from "./components/SelectedNodesToolbar";
import { useShallow } from 'zustand/react/shallow';
import AddNodeButton from "./components/AddNode";

import useStore from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});


const App = () => {
  const addNodeButtonRef = useRef();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  return (
    <div className="App">
      <AddNodeButton  ref={addNodeButtonRef} />
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
