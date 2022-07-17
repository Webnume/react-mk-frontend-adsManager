import { useQueryClient, useMutation } from "react-query";
import { Switch } from "@mui/material";
import CreativeService from "../services/CreativeService";
import { useState } from "react";

const CreativeFormSwitch = ({ creative }: any) => {
  const [checked, setChecked] = useState(creative.enabled);
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(CreativeService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["creative", creative.id]);
    },
  });

  const toggleChecked = () => {
    mutate({ ...creative, enabled: !checked });
    setChecked((prev: any) => !prev);
  };

  if (isLoading) return <>"Saving your changes ..."</>;

  return (
    <Switch
      checked={creative.enabled}
      value={checked}
      onClick={toggleChecked}
    />
  );
};
export default CreativeFormSwitch;
