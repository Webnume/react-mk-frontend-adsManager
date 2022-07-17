import CreativeT from "../types/CreativeT";
import {
  Avatar,
  Chip,
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CreativeFormSwitch from "../shared/CreativeFormSwitch";
import CreativeService from "../services/CreativeService";
import { useQuery } from "react-query";

export default function CreativeItem({
  index,
  creativeId,
  creativesLength,
  style,
}: any): JSX.Element {
  const { isLoading, error, data } = useQuery<CreativeT[], Error>(
    ["creative", creativeId],
    async () => {
      return CreativeService.findById(creativeId);
    },
    { enabled: !!creativeId }
  );

  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  if (isLoading) return <>{"Loading..."}</>;

  if (error) return <>{"An error has occurred: " + error.message}</>;
  if (!creativeId) {
    return <>Select a Creative</>;
  }

  const creative: any = data;
  return (
    <div>
      <ListItem
        secondaryAction={<CreativeFormSwitch creative={creative} />}
        divider={creativesLength ? index < creativesLength - 1 : false}
        button
      >
        <ListItemText
          primary={
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Typography variant="h6" style={style}>
                  {creative.title}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    margin: "0 15px",
                  }}
                >
                  {creative.contributors?.map((user: any) => (
                    <Avatar
                      key={user.id}
                      style={{ marginLeft: -16 }}
                      {...stringAvatar(user.firstName + " " + user.lastName)}
                    >
                    </Avatar>
                  ))}
                </div>
              </Grid>
              <Grid item xs={6}>
                {creative.formats?.map((format: any) => (
                  <Chip
                    style={{ margin: "0 5px" }}
                    key={`${format["width"]}x${format["height"]}`}
                    label={`${format["width"]}x${format["height"]}`}
                  />
                ))}
              </Grid>
            </Grid>
          }
        />
      </ListItem>
    </div>
  );
}
