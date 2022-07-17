import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreativeItem from "./CreativeItem";
import { QueryClient, QueryClientProvider } from "react-query";
import { CREATIVES } from "../mocks/fixtures";

const queryClient = new QueryClient();
const MockedCreativeItem = ({ creativeId }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CreativeItem creativeId={creativeId} />
    </QueryClientProvider>
  );
};

describe("CreativeItem", () => {
  it("should render creative item", async () => {
    render(<MockedCreativeItem creativeId={CREATIVES[0].id}/>);
    expect(await screen.findByText(CREATIVES[0].title)).toBeInTheDocument();    
  });

});


