import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreativesList from "./CreativesList";
import { QueryClient, QueryClientProvider } from "react-query";
import { CREATIVES } from "../mocks/fixtures";

const queryClient = new QueryClient();
const MockedCreativesList = ({ setCreativeId, creativeId }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CreativesList setCreativeId={setCreativeId} creativeId={creativeId} />
    </QueryClientProvider>
  );
};

describe("CreativesList", () => {
  it("should render creative items", async () => {
    render(<MockedCreativesList />);
    expect(await screen.findByText(CREATIVES[0].title)).toBeInTheDocument();
  });

  it("should render multiple creative items", async () => {
    render(<MockedCreativesList />);
    const titleElements = await screen.findAllByText(CREATIVES[0].title);
    expect(titleElements.length).toBe(5);
  });
});

describe("CreativesList Pagination", () => {
  it("should render Paginations", async () => {
    render(<MockedCreativesList />);
    const AllButtons = await screen.findAllByRole("button");
    expect(AllButtons.length).toBe(14);
  });
});
