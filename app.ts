import "reflect-metadata";
import play from "./play";

async function main(): Promise<void> {
  await play();
}

main().catch((error) => {
  console.error("Error at startup" + error);
});
