import React, { useMemo, useRef } from "react";
import { ReactFlow, Background } from "@xyflow/react";
import "./App.css";
import "@xyflow/react/dist/style.css";
import CustomNode from "./components/CustomNodes";
import CustomEdge from "./components/CustomEdge";
import SelectedNodesToolbar from "./components/SelectedNodesToolbar";
import { useShallow } from "zustand/react/shallow";
import AddNodeButton from "./components/AddNode";

import useStore from "./store";
import Nodelist from "./components/NodeList/Nodelist";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const App = () => {
  const addNode = useStore((state) => state.addNode);
  const addNodeButtonRef = useRef();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector)
  );
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ button: CustomEdge }), []);

  const handleDrop = (event) => {
    event.preventDefault();
    const nodeData = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    );
    const reactFlowBounds = event.target.getBoundingClientRect();

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `${+new Date()}`,
      type: "custom",
      position,
      data: nodeData,
      style: { backgroundColor: nodeData.backgroundColor },
    };

    addNode(newNode);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="App" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Nodelist />
        <AddNodeButton ref={addNodeButtonRef} />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background variant="dots" gap={12} size={1} />
        <SelectedNodesToolbar />
      </ReactFlow>
    </div>
  );
};

export default App;
