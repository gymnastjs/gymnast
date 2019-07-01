import * as React from "react";
import { render } from "@testing-library/react";
import Grid from "../grid";
import GymnastProvider from "./index";
import defaults from "../defaults";
import Context from "./context";

const TesterComponent = ({
  children
}: {
  children: (context: React.ContextType<typeof Context>) => null;
}) => children(React.useContext(Context)) || null;

describe("GymnastProvider", () => {
  let spy: jest.Mocked<any>;

  beforeEach(() => {
    spy = jest.fn();
  });

  it("should not crash when empty", () => {
    expect(() => render(<GymnastProvider />)).not.toThrow();
  });

  it("does not add additional DOM Elements", () => {
    const { container } = render(
      <GymnastProvider>
        <Grid />
      </GymnastProvider>
    );
    const { container: grid } = render(<Grid />);

    expect(grid).toEqual(container);
  });

  it("should return default values if provider did not provide values", () => {
    render(
      <GymnastProvider>
        <TesterComponent>{spy}</TesterComponent>
      </GymnastProvider>
    );

    expect(spy.mock.calls[0][0]).toEqual(defaults);
  });

  it("should return values received from provider", () => {
    render(
      <GymnastProvider columns={2}>
        <TesterComponent>{spy}</TesterComponent>
      </GymnastProvider>
    );

    expect(spy.mock.calls[0][0].columns).toEqual(2);
  });

  it("should allow customize alias values", () => {
    const base = 4;
    const alias = {
      meow: 1,
      woof: 2
    };
    const { container } = render(
      <GymnastProvider base={base} spacingAliases={alias}>
        <Grid margin="woof woof meow meow" />
      </GymnastProvider>
    );

    expect(container.innerHTML).toContain(
      `border-top-width: ${base * alias.woof}px`
    );
    expect(container.innerHTML).toContain(
      `border-bottom-width: ${base * alias.meow}px`
    );
  });

  it("should persist values coming from parent provider if child provider did not provide that value", () => {
    render(
      <GymnastProvider columns={2}>
        <GymnastProvider base={4}>
          <GymnastProvider gutter={10}>
            <TesterComponent>{spy}</TesterComponent>
          </GymnastProvider>
        </GymnastProvider>
      </GymnastProvider>
    );

    expect(spy.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 2,
        base: 4,
        gutter: 10
      })
    );
  });

  it("should override parent provider value if child provider provided the same value", () => {
    render(
      <GymnastProvider columns={2}>
        <GymnastProvider base={4}>
          <GymnastProvider base={2}>
            <GymnastProvider columns={9}>
              <TesterComponent>{spy}</TesterComponent>
            </GymnastProvider>
          </GymnastProvider>
        </GymnastProvider>
      </GymnastProvider>
    );

    expect(spy.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 9,
        base: 2
      })
    );
  });

  it("should handle siblings with different override values", () => {
    const child1 = jest.fn();
    const child2 = jest.fn();
    const child3 = jest.fn();

    render(
      <GymnastProvider columns={2} base={4}>
        <GymnastProvider columns={3} base={5}>
          <TesterComponent>{child1}</TesterComponent>
        </GymnastProvider>
        <GymnastProvider base={1}>
          <TesterComponent>{child2}</TesterComponent>
        </GymnastProvider>
        <TesterComponent>{child3}</TesterComponent>
      </GymnastProvider>
    );

    expect(child1.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 3,
        base: 5
      })
    );

    expect(child2.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 2,
        base: 1
      })
    );

    expect(child3.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        columns: 2,
        base: 4
      })
    );
  });
});
