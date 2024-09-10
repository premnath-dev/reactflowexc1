import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormikForm.css";
const validationSchema = Yup.object({
  label: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  sublabel: Yup.string(),
  color: Yup.string(),
  image: Yup.mixed(),
});

const FormikForm = ({ onSubmit }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result;
        setFieldValue("image", dataURL ?? "");
        setPreviewImage(dataURL ?? "");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={{ label: "", sublabel: "", color: "", image: null }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="label">Label</label>
            <Field type="text" name="label" />
            <ErrorMessage
              name="label"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div>
            <label htmlFor="sublabel">Sublabel</label>
            <Field type="text" name="sublabel" />
            <ErrorMessage
              name="sublabel"
              component="div"
              style={{ color: "red" }}
            />
          </div>

          <div>
            <label htmlFor="color">Choose Color</label>
            <Field
              type="color"
              name="color"
              value={selectedColor}
              style={{ backgroundColor: selectedColor }}
              onChange={(event) => {
                setFieldValue("color", event.target.value);
                setSelectedColor(event.target.value); 
              }}
            />
            <ErrorMessage
              name="color"
              component="div"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => handleImageUpload(event, setFieldValue)}
            />
            <ErrorMessage
              name="image"
              component="div"
              className="error-message"
            />
          </div>

          {previewImage && (
            <div>
              <p>Image Preview:</p>
              <img
                src={previewImage}
                alt="Preview"
                style={{ backgroundColor: "black", width: "20px", height: "20px" }}
              />
            </div>
          )}

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
