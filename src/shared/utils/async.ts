export type TAsyncRecord<ErrorType extends any = Error, DataType extends any = unknown> =
  | {
      error: ErrorType;
      data: null;
    }
  | { error: null; data: DataType };

/**
 * Gracefully handles a given Promise factory.
 * @example
 * const { error, data } = await handleAsync(() => asyncAction())
 */
export const handleAsync = async <ErrorType extends any = Error, DataType extends any = unknown>(
  promise: () => Promise<DataType>
): Promise<TAsyncRecord<ErrorType, DataType>> => {
  try {
    const data = await promise().catch((error: ErrorType) => {
      throw error;
    });
    return { error: null, data };
  } catch (error) {
    return { error: error as ErrorType, data: null };
  }
};
