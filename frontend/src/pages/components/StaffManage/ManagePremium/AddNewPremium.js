import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, TextField, Button, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";

import { addPremium } from "../../../../helper/premiumAPI";
import { Toaster, toast } from "react-hot-toast";

const validationSchema = Yup.object().shape({
  premiumName: Yup.string().required("Premium Name is required"),
  priceOriginal: Yup.number()
    .typeError("Price Origin must be a number")
    .required("Price Origin is required"),
  priceDiscount: Yup.number()
    .typeError("Price Discount must be a number")
    .required("Price Discount is required"),
  benefit: Yup.string().required("Benefit is required"),
  rules: Yup.string().required("Rules is required"),

  durationByMonth: Yup.number()
    .typeError("Duration by month must be a number")
    .required("Duration by month is required"),
});

function AddNewPremium() {
  const formik = useFormik({
    initialValues: {
      premiumName: "",
      priceOriginal: "",
      priceDiscount: "",
      benefit: "",
      rules: "",

      durationByMonth: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await addPremium({
          premiumname: values.premiumName,
          priceOriginal: values.priceOriginal,
          priceDiscount: values.priceDiscount,
          benefit: values.benefit,
          rules: values.rules,
          description: values.description,

          durationByMonth: values.durationByMonth,
        });

        if (response) {
          toast.success("Premium package added successfully");
          formik.resetForm();
        } else {
          toast.error("Failed to add premium package");
        }
      } catch (error) {
        console.error(error);
        toast.error(
          "Error occurred while adding the premium package. Please try again later."
        );
      }
    },
  });

  return (
    <div>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Toaster></Toaster>
        <div
          style={{
            textAlign: "center",
            position: "sticky",
            top: 100,
            color: "#333",
            fontSize: "24px",
            marginTop: "40px",
          }}
        >
          Add New Premium
        </div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Premium Name"
            type="text"
            fullWidth
            required
            sx={{ marginBottom: "10px" }}
            {...formik.getFieldProps("premiumName")}
            error={formik.touched.premiumName && formik.errors.premiumName}
            helperText={formik.touched.premiumName && formik.errors.premiumName}
          />
          <TextField
            label="Price Origin"
            type="number"
            fullWidth
            required
            multiline
            rows={4}
            sx={{ marginBottom: "10px" }}
            {...formik.getFieldProps("priceOriginal")}
            error={formik.touched.priceOriginal && formik.errors.priceOriginal}
            helperText={
              formik.touched.priceOriginal && formik.errors.priceOriginal
            }
          />
          <TextField
            label="Price Discount"
            type="number"
            required
            sx={styles.textField}
            {...formik.getFieldProps("priceDiscount")}
            error={formik.touched.priceDiscount && formik.errors.priceDiscount}
            helperText={
              formik.touched.priceDiscount && formik.errors.priceDiscount
            }
          />
          <TextField
            label="Benefit"
            type="text"
            fullWidth
            required
            multiline
            rows={4}
            sx={{ marginBottom: "10px" }}
            {...formik.getFieldProps("benefit")}
            error={formik.touched.benefit && formik.errors.benefit}
            helperText={formik.touched.benefit && formik.errors.benefit}
          />

          <TextField
            label="Rules"
            type="text"
            fullWidth
            required
            multiline
            rows={4}
            sx={{ marginBottom: "10px" }}
            {...formik.getFieldProps("rules")}
            error={formik.touched.rules && formik.errors.rules}
            helperText={formik.touched.rules && formik.errors.rules}
          />
          <FormControl component="fieldset">
            <TextField
              label="Duration by month"
              type="number"
              required
              sx={{ marginBottom: "10px" }}
              {...formik.getFieldProps("durationByMonth")}
              error={
                formik.touched.durationByMonth && formik.errors.durationByMonth
              }
              helperText={
                formik.touched.durationByMonth && formik.errors.durationByMonth
              }
            />
          </FormControl>

          <Button
            color="success"
            type="submit"
            variant="contained"
            sx={styles.button}
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
}

export default AddNewPremium;

const styles = {
  container: {
    marginTop: "2rem",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    marginBottom: "1rem",
    width: "100%",
  },
  button: {
    marginTop: "1rem",
    width: "100%",
  },
};
