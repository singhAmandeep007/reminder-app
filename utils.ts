import fs from "fs";

export function writeConfigToFile(config: Record<string, any>, filename: string) {
  const jsonContent = JSON.stringify(config, null, 2);

  fs.writeFile(filename, jsonContent, "utf8", (err) => {
    if (err) {
      console.error(`Error writing to ${filename}:`, err);
    } else {
      console.log(`Successfully wrote ${filename}`);
    }
  });
}

export function mergeUniqueArrays<T>(arr1: T[], arr2: T[]): T[] {
  // Create a Set from both arrays to automatically remove duplicates
  const uniqueSet = new Set<T>([...arr1, ...arr2]);

  // Convert the Set back to an array
  return Array.from(uniqueSet);
}
