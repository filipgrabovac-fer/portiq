import { objectToCamel } from "ts-case-convert";

export const itemsToReplaceFn = (data: Record<string, any>) => {
  return Object.entries(objectToCamel(data) ?? {})
    .map(([variableName, variableValue]) => {
      if (Array.isArray(variableValue)) {
        return {
          key: variableValue[0].toString(),
          value: variableValue[0][1]?.toString() ?? "",
        };
      }
      return {
        key: variableName.toString(),
        value: variableValue?.toString() ?? "",
      };
    })
    .flat();
};
