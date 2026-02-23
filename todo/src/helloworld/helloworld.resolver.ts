import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
  @Query(() => String, {
    description: 'A simple hello world query',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hola, Emanuel!';
  }

  @Query(() => Float, {
    description: 'Devolver numero aleatorios',
    name: 'random',
  })
  randomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    description: 'Devolver numero aleatorio entero entre 0 y 10',
    name: 'randomFromZeroTo10',
  })
  getRandomFromZeroTo10(): number {
    return Math.floor(Math.random() * (10 + 1));
  }

  @Query(() => Int, {
    description: 'Devolver numero aleatorio entero entre 0 y el maximo que se envie',
    name: 'randomFromZeroToNumber',
  })
  getRandomFromZeroToNumber(@Args('max',{type: () => Int}) max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }
}
