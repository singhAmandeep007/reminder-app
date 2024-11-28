import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => {
    console.log("Nest JS server is running");
  })
  .catch((error) => {
    console.error("Error starting Nest JS server", error);
  });