import { screen, fireEvent } from "@testing-library/react";

import { render } from "tests/utils";

import { AddUpdateItem, TAddUpdateItemProps } from "./AddUpdateItem";

describe("AddUpdateItem", () => {
  const setup = (compProps?: Partial<TAddUpdateItemProps>) => {
    const mockOnSave = jest.fn();
    const mockOnCancel = jest.fn();
    const props = {
      onSave: mockOnSave,
      onCancel: mockOnCancel,
      testIds: {
        save: "save-button",
        cancel: "cancel-button",
      },
      ...compProps,
    };

    return {
      result: render(<AddUpdateItem {...props} />),
      mockOnSave,
      mockOnCancel,
      props,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with default value", () => {
    const defaultValue = "Test Value";
    setup({ defaultValue });

    expect(screen.getByRole("textbox")).toHaveValue(defaultValue);
    expect(screen.getByTestId("save-button")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
  });

  it("calls onSave with input value when save button is clicked", () => {
    const { mockOnSave } = setup();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Item" } });

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith("New Item");
  });

  it("does not call onSave when input is empty", () => {
    const { mockOnSave } = setup();

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const { mockOnCancel } = setup();

    const cancelButton = screen.getByTestId("cancel-button");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    const {
      result: {
        container: { firstChild },
      },
    } = setup({ className: customClass });

    expect(firstChild as HTMLElement).toHaveClass(customClass);
  });

  it("sets input as required", () => {
    setup();

    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("sets input autofocus", () => {
    setup();

    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();
  });
});
