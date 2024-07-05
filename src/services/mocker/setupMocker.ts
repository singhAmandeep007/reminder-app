export const MOCKER_TYPE = {
  msw: "msw",
  mirage: "mirage",
} as const;

export type TMocker = (typeof MOCKER_TYPE)[keyof typeof MOCKER_TYPE] | undefined;

export const setupMocker = async ({ type = undefined, shouldSeedData }: { type: TMocker; shouldSeedData: boolean }) => {
  if (MOCKER_TYPE[type!]) {
    const { runServer } = await import(`./${type}/server.ts`);

    return runServer({
      withDefaultScenario: shouldSeedData,
    });
  }

  return Promise.resolve();
};
