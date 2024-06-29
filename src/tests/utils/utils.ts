export const mockLocation = (props: Partial<typeof global.location> = {}) => {
  Object.defineProperty(window, "location", {
    value: {
      ...props,
    },
    writable: true,
  });
};
