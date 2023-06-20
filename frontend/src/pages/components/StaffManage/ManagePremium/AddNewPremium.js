import React, { useEffect, useState } from "react";

import {
    Container,
    TextField,
    Button,
    FormControl,
    Typography,
    CircularProgress,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,

} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { addPremium } from "../../../../helper/premiumAPI";

function AddNewPremium() {
    const [premiumName, setPremiumName] = useState("");
    const [priceOriginal, setpriceOriginal] = useState("");
    const [priceDiscount, setpriceDiscount] = useState("");
    const [benefit, setBenefit] = useState("");
    const [rules, setRules] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [durationByMonth, setDurationByMonth] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [addSuccess, setAddSuccess] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);
        setAddSuccess(false);
        try {
            const response = await addPremium({
                premiumname: premiumName,
                priceOriginal,
                priceDiscount,
                benefit,
                rules,
                description,
                status: status,
                durationByMonth
            });

            if (response) {
                setAddSuccess(true);
                setTimeout(() => {
                    setAddSuccess(false);
                }, 3000);
                setPremiumName("");
                setpriceOriginal("");
                setpriceDiscount("");
                setBenefit("");
                setRules("")
                setDescription("")
                setStatus("");
                setDurationByMonth("")
            } else {
                setErrorMessage("Failed to update course");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(
                "Error occurred while updating the course. Please try again later."
            );
        }
        setIsSubmitting(false);
    };
    return (
        <div>
            <Header />
            <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
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
                    {errorMessage && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "red",
                                color: "white",
                                padding: "10px",
                                borderRadius: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <CancelOutlinedIcon sx={{ mr: 1 }} />
                            <Typography variant="body1">{errorMessage}</Typography>
                        </div>
                    )}
                    {addSuccess && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#4caf50",
                                color: "white",
                                padding: "10px",
                                borderRadius: "8px",
                                marginBottom: "20px",
                            }}
                        >
                            <CheckCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
                            <Typography variant="body1">
                                Course updated successfully!
                            </Typography>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Premium Name"
                        type="text"
                        value={premiumName}
                        onChange={(e) => setPremiumName(e.target.value)}
                        fullWidth
                        required
                        sx={{ marginBottom: "10px" }}
                    />
                    <TextField
                        label="Price Origin"
                        type="number"
                        value={priceOriginal}
                        onChange={(e) => setpriceOriginal(e.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ marginBottom: "10px" }}
                    />
                    <TextField
                        label="Price Discount"
                        type="number"
                        name="price"
                        value={priceDiscount}
                        onChange={(event) => setpriceDiscount(event.target.value)}
                        required
                        sx={styles.textField}
                    />
                    <TextField
                        label="Benefit"
                        type="text"
                        value={benefit}
                        onChange={(e) => setBenefit(e.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ marginBottom: "10px" }}
                    />

                    <TextField
                        label="Rules"
                        type="text"
                        value={rules}
                        onChange={(e) => setRules(e.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ marginBottom: "10px" }}
                    />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Status</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status === "true"}
                                        onChange={(event) =>
                                            setStatus(event.target.checked ? "true" : "false")
                                        }
                                    />
                                }
                                label="Active"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status === "false"}
                                        onChange={(event) =>
                                            setStatus(event.target.checked ? "false" : "true")
                                        }
                                    />
                                }
                                label="Inactive"
                            />
                        </FormGroup>
                        <TextField
                            label="Duration by month"
                            type="number"
                            value={durationByMonth}
                            onChange={(e) => setDurationByMonth(e.target.value)}
                            fullWidth
                            required
                            sx={{ marginBottom: "10px" }}
                        />
                    </FormControl>

                    {isSubmitting ? (
                        <CircularProgress style={{ marginTop: "1rem" }} />
                    ) : (
                        <Button
                            color="success"
                            type="submit"
                            variant="contained"
                            sx={styles.button}
                        >
                            SUBMIT
                        </Button>
                    )}
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
                        Back
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
