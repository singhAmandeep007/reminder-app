export const MOCKER_TYPE = {
  msw: "msw",
  miragejs: "miragejs",
} as const;

export type TMocker = (typeof MOCKER_TYPE)[keyof typeof MOCKER_TYPE] | undefined;

const initServer = (module: { runServer: () => void }) => {
  const { runServer } = module;
  const server = runServer();

  return server;
};

export const setupMocker = async ({ type = undefined }: { type: TMocker }) => {
  if (MOCKER_TYPE[type!]) {
    return import(`./${type}`).then(initServer);
  }

  return Promise.resolve();
};
