import { memo, useState, useEffect, useRef } from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import { FaCopy, FaTrash, FaInfoCircle, FaEdit } from "react-icons/fa";

const CustomNode = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{ width: "90px", height: "60px", position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <NodeToolbar
          isVisible={true}
          position={data.toolbarPosition}
          align={data.toolbarAlign}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FaCopy title="Copy" style={{ margin: "0 5px", cursor: "pointer", color: "black" }} />
          <FaTrash
            title="Delete"
            style={{ margin: "0 5px", cursor: "pointer", color: "black" }}
          />
          <FaInfoCircle
            title="Info"
            style={{ margin: "0 5px", cursor: "pointer", color: "black" }}
          />
          <FaEdit title="Edit" style={{ margin: "0 5px", cursor: "pointer", color: "black" }} />
        </NodeToolbar>
      )}
      <img
        src={data?.image}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -65%)",
        }}
      />
      <div
        style={{
          fontWeight: "bold",
          color: "black",
          width: "100%",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 120%)",
        }}
      >
        {data?.label}
      </div>
      <div
        style={{
          fontWeight: "lighter",
          color: "black",
          width: "100%",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 190%)",
        }}
      >
        {data?.sublabel}
      </div>
      {data?.label !== "Source" && (
        <Handle
          style={{ backgroundColor: data?.backgroundColor }}
          type="target"
          position={Position.Left}
        />
      )}
      <Handle
        style={{ backgroundColor: data?.backgroundColor }}
        type="source"
        position={Position.Right}
      />
    </div>
  );
};

export default memo(CustomNode);
