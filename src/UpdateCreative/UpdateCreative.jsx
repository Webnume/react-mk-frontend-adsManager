import CreativeForm from "../shared/CreativeForm";
import { useQuery, useMutation } from "react-query";
import CreativeService from "../services/CreativeService";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateCreative() {
  const { id } = useParams();
  console.log("test:" + id);
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery(
    ["creative", { id }],
    CreativeService.findById(id),
    { enabled: !!id }
  );
  const { mutateAsync, isLoading: isMutating } = useMutation(
    CreativeService.update({ id, ...data }),
    { enabled: !!id }
  );
  const onFormSubmit = async (formData) => {
    await mutateAsync({ ...formData, id });
    navigate("/");
  };

  if (isLoading) return <>{"Loading..."}</>;

  if (error) return <>{"An error has occurred: " + error.message}</>;

  return (
    <>
      {console.log(data)}
      <span>Update Book</span>
      <CreativeForm
        defaultValues={data}
        onFormSubmit={onFormSubmit}
        isLoading={isMutating}
      />
    </>
  );
}
