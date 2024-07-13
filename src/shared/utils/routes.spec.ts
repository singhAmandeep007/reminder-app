import { getRoutesList, getRoutesPathByName, getRoutesPropByKeyList } from "./routes";

describe("getRoutesList", () => {
  it("should return an array of all route objects from the given routes object", () => {
    const routes = {
      home: {
        path: "/",
        title: "Home",
      },
      about: {
        path: "/about",
        title: "About",
      },
    };
    const result = getRoutesList(routes);
    expect(result).toEqual([routes.home, routes.about]);
  });
});

describe("getRoutesPropByKeyList", () => {
  it("should return an array of the specified property values from each route object", () => {
    const routes = {
      home: {
        path: "/",
        title: "Home",
      },
      about: {
        path: "/about",
        title: "About",
      },
    };
    const result = getRoutesPropByKeyList(routes, "path");
    expect(result).toEqual(["/", "/about"]);
  });
});

describe("getRoutesPathByName", () => {
  it("should return an object with route keys and their corresponding paths", () => {
    const routes = {
      home: {
        path: "/",
        title: "Home",
      },
      about: {
        path: "/about",
        title: "About",
      },
    };
    const result = getRoutesPathByName(routes);
    expect(result).toEqual({ home: "/", about: "/about" });
  });
});
