import React, { forwardRef, useImperativeHandle, useState } from "react";
import useStore from "../store";
import Modal from "./Modal/Modal";
import FormikForm from "./Form/FormikForm";
import { Position } from "@xyflow/react";

const AddNodeButton = forwardRef((props, ref) => {
  const addNode = useStore((state) => state.addNode);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (values) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: "custom",
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: {
        label: values.label,
        sublabel: values.sublabel,
        toolbarVisible: true,
        toolbarPosition: Position.Top,
        backgroundColor: values.color,
        image: values.image,
      },
      style: { backgroundColor: values.color },

    };
    addNode(newNode);
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal: () => {
      setIsModalOpen(true);
    },
    closeModal: () => {
      setIsModalOpen(false);
    },
  }));

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          height: 40,
          width: 40,
          margin: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="src/assets/plus.svg"
          alt="plus"
          style={{ width: 30, height: 30 }}
        />
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div>
            <h2>Add a New Node</h2>
            <FormikForm onSubmit={handleSubmit} />
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </Modal>
      )}
    </>
  );
});

export default AddNodeButton;
