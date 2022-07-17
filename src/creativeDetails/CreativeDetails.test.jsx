import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreativeDetails from "./CreativeDetails";
import { QueryClient, QueryClientProvider } from "react-query";
import { CREATIVES } from "../mocks/fixtures";

const queryClient = new QueryClient();
const MockedCreativeItem = ({ creativeId }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CreativeDetails creativeId={creativeId} />
    </QueryClientProvider>
  );
};

describe("CreativeDetails", () => {
  it("should render creative items details", async () => {
    render(<MockedCreativeItem creativeId={CREATIVES[0].id}/>);
    expect(await screen.findByText(CREATIVES[0].title)).toBeInTheDocument();    
    expect(await screen.findByText(CREATIVES[0].description)).toBeInTheDocument();
    expect(await screen.findByText(CREATIVES[0].content)).toBeInTheDocument();
  });

});


