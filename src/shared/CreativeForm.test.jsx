import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreativeForm from "./CreativeForm";
import { QueryClient, QueryClientProvider } from "react-query";
import { CREATIVES } from "../mocks/fixtures";

const queryClient = new QueryClient();
const mockedFunction = jest.fn();
const MockedCreativeForm = ({ creative, setIsEditing }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CreativeForm creative={creative} setIsEditing={setIsEditing} />
    </QueryClientProvider>
  );
};

describe("CreativeForm", () => {
  it("should render form with save, delete and cancel buttons", async () => {
    render(
      <MockedCreativeForm creative={CREATIVES[0]} setIsEditing={mockedFunction} />
    );

    expect(
      await screen.findByRole("button", {
        name: "Sauvegarder",
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", {
        name: "Annuler",
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", {
        name: "Supprimer",
      })
    ).toBeInTheDocument();
  });
});
