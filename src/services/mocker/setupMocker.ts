export const MOCKER_TYPE = {
  msw: "msw",
  mirage: "mirage",
} as const;

export type TMocker = (typeof MOCKER_TYPE)[keyof typeof MOCKER_TYPE] | undefined;

export const setupMocker = async ({ type = undefined }: { type: TMocker }) => {
  if (MOCKER_TYPE[type!]) {
    const { runServer } = await import(`./${type}/server.ts`);

    return runServer({
      withDefaultScenario: true,
    });
  }

  return Promise.resolve();
};
