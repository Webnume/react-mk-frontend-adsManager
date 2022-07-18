import { useQueryClient, useMutation } from "react-query";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Dialog,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CreativeService from "../services/CreativeService";
import { useEffect, useState } from "react";

const CreativeFormAddFormat = ({ creative }: any) => {
  const [display, setDisplay] = useState(false);
  const [creativ, setCreativ] = useState({ ...creative });
  const [formData, setFormData] = useState({
    width: "",
    height: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(CreativeService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["creative", creativ.id]);
      // queryClient.invalidateQueries("creatives");
      setDisplay(false);
    },
  });

  const addFormat = (_e: any) => {
    setDisplay(true);
    setCreativ( { ...creative } );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCreativ({ ...creativ, formats: [...creativ.formats, formData] });
    setSubmitted(true);
    setDisplay(false);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value.trim()),
    });
  };

  const handleCancel = () => {
    setDisplay(false);
  };

  useEffect(() => {
    
  }, [creativ]);

  
  useEffect(() => {
    if (formData.width && formData.height) {
      mutate(creativ);
      setSubmitted(false);
      setFormData({ width: "", height: "" });
    }
  }, [submitted]);

  if (isLoading) return <>"Saving your changes ..."</>;
  return (
    // <form onSubmit={handleSubmit}>
    <div>
      <IconButton size="small" color="primary" onClick={addFormat}>
        <Add />
      </IconButton>
      {display && (
        <Grid
          zIndex="modal"
          style={{
            backgroundColor: "#132337",
            position: "absolute",
            top: "45vh",
            left: "0",
            margin: "0 5vw",
            width: "90vw",
          }}
        >
          {/* <form> */}
          <Dialog onClose={handleCancel} open={display}>
            <Grid
              container
              style={{ marginTop: 16, marginBottom: 16 }}
              spacing={3}
            >
              <Grid item xs={3} />
              <Grid item xs={6}>
                <Paper elevation={8} style={{ padding: 16 }}>
                  <Grid
                    container
                    alignItems="center"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Grid item xs={8}>
                      <TextField
                        name="width"
                        margin="normal"
                        label="Width"
                        // value={formData.width}
                        onChange={handleChange}
                        type="number"
                        autoFocus
                      />
                      <TextField
                        name="height"
                        margin="normal"
                        label="height"
                        // value={formData.height}
                        onChange={handleChange}
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={3} />

              <Grid item xs={3} />
              <Grid item xs={6} container spacing={3} justifyContent="center">
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Ajouter un format
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                  >
                    Annuler
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Dialog>
          {/* </form> */}
        </Grid>
      )}
    </div>
  );
};
export default CreativeFormAddFormat;
