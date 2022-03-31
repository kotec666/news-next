import {NestFactory} from '@nestjs/core'
import {AppModule} from "./app.module"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"
import {ValidationPipe} from "./pipes/validation.pipe"

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
      .setTitle('nest js docker')
      .setDescription('документация rest api')
      .setVersion('1.0.0')
      .addTag('nest js docker')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  })

   app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`server started, PORT: ${PORT}`) )
}
start()

