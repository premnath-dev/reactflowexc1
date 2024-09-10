import React from "react";
import useStore from "../../store";

const Nodelist = () => {
  const { nodes } = useStore((state) => state);
  const nodesList = nodes.map((node) => {
    return node.data;
  });
  const nodeMap = new Map();

  nodesList.forEach((node) => {
    if (!nodeMap.has(node.label)) {
      nodeMap.set(node.label, node);
    }
  });
  const uniqueNodesSet = Array.from(nodeMap.values());
  const handleDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(node));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {uniqueNodesSet.map((node, i) => (
        <div
          key={`${node.id} ${i}`}
          draggable
          onDragStart={(event) => handleDragStart(event, node)}
          style={{
            padding: "2px",
            border: "1px solid #ccc",
            margin: "5px",
            backgroundColor: node.backgroundColor,
          }}
        >
          <img
            src={node.image}
            alt={node.label}
            style={{ width: "30px", height: "20px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Nodelist;
