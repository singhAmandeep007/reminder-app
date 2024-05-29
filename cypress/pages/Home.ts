import { LayoutElements } from "./Layout";

class HomeElements extends LayoutElements {
  get root() {
    return this.content.findByTestId("home");
  }
}

export const homeElements = new HomeElements();
