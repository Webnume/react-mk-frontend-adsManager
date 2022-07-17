import { useQuery } from "react-query";
import CreativeT from "../types/CreativeT";
import usePagination from "../hooks/Pagination";
import { Grid, List, Pagination, Paper } from "@mui/material";
import { useState } from "react";
import CreativeService from "../services/CreativeService";
import CreativeItem from "../creativeItem/CreativeItem";
import CreativeDetails from "../creativeDetails/CreativeDetails";

export default function CreativesList({
  setCreativeId,
  creativeId,
}: any): JSX.Element {
  const [page, setPage] = useState(1);
  const { isLoading, error, data, isFetching } = useQuery<CreativeT[], Error>(
    "creatives",
    async () => {
      return CreativeService.findAll();
    },
    { keepPreviousData: true }
  );
  const PER_PAGE = 5;
  const _DATA = usePagination(data ? data : [], PER_PAGE);
  const creatives = _DATA.currentData();

  if (isLoading) return <>{"Loading..."}</>;

  if (error) return <>{"An error has occurred: " + error.message}</>;
  if (!data) {
    console.error("No data here!");
    return <></>;
  }

  const checkIDinDB = (id: string) => {
    // check if id is in DB and return true or false
    return data.some((creative: CreativeT) => creative.id === id);
  };

  const count = Math.ceil(data.length / PER_PAGE);
  const handleChange = (_e: any, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div>
      <Grid container style={{ marginTop: 16, marginBottom: 16 }} spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Paper style={{ padding: 16 }} elevation={8}>
            <List>
              {creatives.map((creative, index) => (
                <div
                  onClick={() => setCreativeId(creative.id)}
                  key={creative.id}
                  // data-testid={`creative-item-${index}`}
                >
                  <CreativeItem
                    index={index}
                    creativesLength={creatives.length}
                    creativeId={creative.id}
                    style={{
                      fontWeight: creativeId === creative.id ? 600 : 400,
                    }}
                  />
                </div>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="center">
            <Grid item>
              <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {checkIDinDB(creativeId) && <CreativeDetails creativeId={creativeId} />}
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
