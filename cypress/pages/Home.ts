import { LayoutElements } from "./Layout";

export class HomeElements extends LayoutElements {
  get root() {
    return this.content.findByTestId("home-page");
  }
}
