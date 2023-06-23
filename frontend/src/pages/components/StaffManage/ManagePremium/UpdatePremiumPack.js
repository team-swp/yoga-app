import React, { useEffect } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getPremium, updatePremium } from "../../../../helper/premiumAPI";
import { Toaster, toast } from "react-hot-toast";

const UpdatePremiumPack = () => {
  const classesId = useParams();

  useEffect(() => {
    fetchPremium();
  }, []);

  const fetchPremium = async () => {
    try {
      const response = await getPremium();
      const premium = response.data.find((obj) => obj._id === classesId.id);
      formik.setValues(premium);
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = Yup.object().shape({
    premiumname: Yup.string().required("Premium Name is required"),
    priceOriginal: Yup.number()
      .required("Price Origin is required")
      .positive("Price Origin must be a positive number"),
    priceDiscount: Yup.number()
      .required("Price Discount is required")
      .positive("Price Discount must be a positive number"),
    benefit: Yup.string().required("Benefit is required"),
    rules: Yup.string().required("Rules is required"),
    description: Yup.string().required("Description is required"),
    durationByMonth: Yup.number()
      .required("Duration by month is required")
      .positive("Duration by month must be a positive number"),
  });

  const formik = useFormik({
    initialValues: {
      premiumname: "",
      priceOriginal: "",
      priceDiscount: "",
      benefit: "",
      rules: "",
      description: "",
      durationByMonth: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updatePremium({
          _id: classesId.id,
          ...values,
        });

        if (response) {
          toast.success("Updated premium package success");
        } else {
          toast.error("Failed to update premium");
        }
      } catch (error) {
        console.error(error);
        toast.error(
          "Error occurred while updating the premium. Please try again later."
        );
      }
    },
  });

  return (
    <div>
      <Header />
      <Container
        maxWidth="sm"
        style={{ marginTop: "4rem", marginBottom: "4rem" }}
      >
        <Toaster />
        <div
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "24px",
            marginTop: "40px",
          }}
        >
          Update Premium Pack
        </div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Premium Name"
            type="text"
            fullWidth
            required
            {...formik.getFieldProps("premiumname")}
            error={formik.touched.premiumname && formik.errors.premiumname}
            helperText={formik.touched.premiumname && formik.errors.premiumname}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Price Origin"
            type="number"
            fullWidth
            required
            multiline
            rows={4}
            {...formik.getFieldProps("priceOriginal")}
            error={formik.touched.priceOriginal && formik.errors.priceOriginal}
            helperText={
              formik.touched.priceOriginal && formik.errors.priceOriginal
            }
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Price Discount"
            type="number"
            fullWidth
            required
            {...formik.getFieldProps("priceDiscount")}
            error={formik.touched.priceDiscount && formik.errors.priceDiscount}
            helperText={
              formik.touched.priceDiscount && formik.errors.priceDiscount
            }
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Benefit"
            type="text"
            fullWidth
            required
            multiline
            rows={4}
            {...formik.getFieldProps("benefit")}
            error={formik.touched.benefit && formik.errors.benefit}
            helperText={formik.touched.benefit && formik.errors.benefit}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Rules"
            type="text"
            fullWidth
            required
            multiline
            rows={4}
            {...formik.getFieldProps("rules")}
            error={formik.touched.rules && formik.errors.rules}
            helperText={formik.touched.rules && formik.errors.rules}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Description"
            type="text"
            fullWidth
            required
            multiline
            rows={4}
            {...formik.getFieldProps("description")}
            error={formik.touched.description && formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Duration by month"
            type="number"
            fullWidth
            required
            multiline
            rows={4}
            {...formik.getFieldProps("durationByMonth")}
            error={
              formik.touched.durationByMonth && formik.errors.durationByMonth
            }
            helperText={
              formik.touched.durationByMonth && formik.errors.durationByMonth
            }
            style={{ marginBottom: "10px" }}
          />

          <Button
            color="success"
            type="submit"
            variant="contained"
            style={{ marginTop: "1rem", width: "100%" }}
          >
            SUBMIT
          </Button>

          <Link
            to="/staffmanage"
            style={{
              marginBlock: "30px",
              float: "right",
              backgroundColor: "grey",
              border: "none",
              color: "white",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Cancel
          </Link>
        </form>
      </Container>
    </div>
  );
};

export default UpdatePremiumPack;
