import { useQuery } from "react-query";
import CreativeT from "../types/CreativeT";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import CreativeService from "../services/CreativeService";
import { date } from "../utils/dateFormat";
import CreativeForm from "../shared/CreativeForm";
import { useState } from "react";

export default function CreativeDetails({ creativeId }: any): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, error, data, isFetching } = useQuery<CreativeT[], Error>(
    ["creative", creativeId],
    async () => {
      return CreativeService.findById(creativeId);
    },
    { enabled: !!creativeId }
  );

  if (isLoading) return <>{"Loading..."}</>;

  if (error) return <>{"An error has occurred: " + error.message}</>;
  if (!creativeId) {
    return <>Select a Creative</>;
  }

  const creative: any = data;
  return (
    <div>
      {isEditing ? (
        <CreativeForm creative={creative} setIsEditing={setIsEditing} />
      ) : (
        <Grid container style={{ marginTop: 16, marginBottom: 16 }} spacing={3}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Paper style={{ padding: 16 }} elevation={8}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Typography variant="h6" paragraph>
                    {creative.title}
                  </Typography>
                  <Typography paragraph>{creative.description}</Typography>
                  <Typography paragraph>{creative.content}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={0} style={{ padding: 16 }}>
                    <Typography paragraph variant="subtitle2">
                      Créé par{" "}
                      {creative.createdBy.firstName +
                        " " +
                        creative.createdBy.lastName}
                    </Typography>
                    <Typography paragraph variant="subtitle2">
                      Dernière modification le {date(creative.lastModified)}
                    </Typography>
                  </Paper>

                  <Paper elevation={2}>
                    <List>
                      {creative.contributors.map(
                        (contributor: {
                          id: string;
                          firstName: string;
                          lastName: string;
                        }) => {
                          return (
                            <ListItem key={contributor.id}>
                              <ListItemIcon>
                                <Person />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  contributor.firstName +
                                  " " +
                                  contributor.lastName
                                }
                              />
                            </ListItem>
                          );
                        }
                      )}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>

            <Grid item xs={3} />
            <Grid item xs={6} container spacing={3} justifyContent="center">
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Annuler" : "Modifier"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
