import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { ValueSetter, TValueSetterProps } from "./ValueSetter";

describe("ValueSetter", () => {
  const setup = (props?: Partial<TValueSetterProps>) => {
    const mockedOnChange = jest.fn();

    const initalProps: TValueSetterProps = {
      initialValue: 0,
      onChange: mockedOnChange,
      min: 0,
      max: 59,
      ...props,
    };

    const getIncrementButton = () => screen.getByTestId("increment");

    const getDecrementButton = () => screen.getByTestId("decrement");

    return {
      result: render(<ValueSetter {...initalProps} />),
      mockedOnChange,
      props,
      getIncrementButton,
      getDecrementButton,
    };
  };

  it("renders with initial value", () => {
    const initialValue = 30;
    setup({ initialValue });

    expect(screen.getByText(initialValue.toString())).toBeInTheDocument();
  });

  it("increments value when increment button is clicked", async () => {
    const { mockedOnChange, getIncrementButton } = setup({ initialValue: 0 });

    userEvent.click(getIncrementButton());

    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith(1);
    });
  });

  it("does not increment value beyond max", async () => {
    const { mockedOnChange, getIncrementButton } = setup({ initialValue: 58 });

    userEvent.click(getIncrementButton());

    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith(59);
    });

    userEvent.click(getIncrementButton());

    await waitFor(() => {
      expect(getIncrementButton()).toBeDisabled();
    });
  });

  it("decrements value when decrement button is clicked", async () => {
    const { mockedOnChange, getDecrementButton } = setup({ initialValue: 10 });

    userEvent.click(getDecrementButton());
    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith(9);
    });
  });

  it("does not decrement value below min", async () => {
    const { mockedOnChange, getDecrementButton } = setup({ initialValue: 1 });

    userEvent.click(getDecrementButton());

    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledWith(0);
    });

    userEvent.click(getDecrementButton());

    await waitFor(() => {
      expect(getDecrementButton()).toBeDisabled();
    });
  });
});
