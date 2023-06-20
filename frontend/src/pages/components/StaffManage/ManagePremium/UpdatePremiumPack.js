import React, { useEffect, useState } from "react";

import {
    Container,
    TextField,
    Button,
    Typography,
    CircularProgress,


} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { getPremium, updatePremium } from "../../../../helper/premiumAPI";

function UpdatePremiumPack() {
    const [premium, setPremium] = useState({})
    const classesId = useParams();
    const [premiumName, setPremiumName] = useState("");
    const [priceOriginal, setpriceOriginal] = useState("");
    const [priceDiscount, setpriceDiscount] = useState("");
    const [benefit, setBenefit] = useState("");
    const [rules, setRules] = useState("");
    const [description, setDescription] = useState("");
    const [durationByMonth, setDurationByMonth] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [addSuccess, setAddSuccess] = useState(false);
    console.log(benefit);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);
        setAddSuccess(false);
        try {
            const response = await updatePremium({
                _id: classesId.id,
                premiumname: premiumName,
                priceOriginal: priceOriginal,
                priceDiscount: priceDiscount,
                benefit: benefit,
                rules: rules,
                description: description,

                durationByMonth: durationByMonth
            });

            if (response) {
                setAddSuccess(true);
                setTimeout(() => {
                    setAddSuccess(false);
                }, 3000);

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


    useEffect(() => {
        fetchPremium();
    }, []);

    async function fetchPremium() {
        try {
            const response = await getPremium();
            const premium = response.data.find((obj) => obj._id === classesId.id);
            setPremium(premium);
            console.log(premium);
            setPremiumName(premium.premiumname);
            setpriceOriginal(premium.priceOriginal);
            setpriceDiscount(premium.priceDiscount);
            setBenefit(premium.benefit);
            setRules(premium.rules)
            setDescription(premium.description)
            setDurationByMonth(premium.durationByMonth)
            // Set initial values for the input fields

        } catch (error) {
            console.error(error);
        }
    }
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
                    Update Premium Pack
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
                    <TextField
                        label="Description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ marginBottom: "10px" }}
                    />
                    <TextField
                        label="Duration by month"
                        type="number"
                        value={durationByMonth}
                        onChange={(e) => setDurationByMonth(e.target.value)}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{ marginBottom: "10px" }}
                    />




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

export default UpdatePremiumPack;
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
