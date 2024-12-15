import "reflect-metadata";
import play from "./Play";

async function main(): Promise<void> {
  await play();
}

main().catch((error) => {
  console.error("Error at startup" + error);
});
