import { useQueryClient, useMutation } from "react-query";
import { Button, Chip, Grid, Paper, TextField } from "@mui/material";
import CreativeService from "../services/CreativeService";
import { useEffect, useState } from "react";
import CreativeFormSwitch from "./CreativeFormSwitch";
import CreativeFormAddFormat from "./CreativeFormAddFormat";

const CreativeForm = ({ creative, setIsEditing }: any) => {
  const [fields, setFields] = useState({ ...creative });
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(CreativeService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["creative", creative.id]);
      queryClient.invalidateQueries("creatives");
      setIsEditing(false);
    },
  });
  const { mutateAsync } = useMutation(CreativeService.deleteById, {
    onSuccess: () => {
      queryClient.invalidateQueries("creatives");
      setIsEditing(false);
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(fields);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await mutateAsync(creative.id);
    setIsEditing(false);
  };

  useEffect(() => {
    setFields({ ...creative });
  }, [creative]);

  if (isLoading) return <>"Saving your changes ..."</>;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Grid container style={{ marginTop: 16, marginBottom: 16 }} spacing={3}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Paper elevation={8} style={{ padding: 16 }}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    name="title"
                    margin="normal"
                    label="Titre"
                    value={fields.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs container justifyContent="flex-end">
                  <Grid item>
                    <CreativeFormSwitch creative={creative} />
                  </Grid>
                </Grid>
              </Grid>

              <TextField
                name="description"
                margin="normal"
                fullWidth
                multiline
                minRows={3}
                label="Description"
                value={fields.description}
                onChange={handleChange}
              />

              <TextField
                name="content"
                margin="normal"
                fullWidth
                multiline
                minRows={10}
                label="Contenu"
                value={fields.content}
                onChange={handleChange}
              />

              <Grid container spacing={2} alignItems="center">
                {creative.formats.map((format: any) => (
                  <Grid item key={format.width + "x" + format.height}>
                    <Chip
                      label={format.width + "x" + format.height}
                      color="primary"
                    />
                  </Grid>
                ))}
                <Grid item>
                  <CreativeFormAddFormat creative={creative} />
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
                Sauvegarder
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleCancel}>
                Annuler
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleDelete}>
                Supprimer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};
export default CreativeForm;
