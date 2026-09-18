This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


RESPUESTAS PARCIAL

Punto 1 (Evolución del Contexto): Explique cómo cambió el modelo de datos dentro de CartContext respecto al preparcial y cómo aseguró la inmutabilidad de la información al manipular las cantidades y productos en memoria.

en el contexto del carro se tienen las funciones de clearitems, removeitem y updateitem. Cada una tiene su respectiva logica que en efecto manipula el item.quantity o el arreglo de items en el carro para completar su funcion.

Para asegurar la inmutabilidad de la informacion se tiene un Provider que utiliza el children para exponer el contexto del carrito hacia afuera y persistrlo al manipular las cantidades y productos, manejando las operaciones del carrito sobre este mismo de manera globa y accediendo o modificando la informacion cuando sea necesario.

de esta manera se en el carContext se creo la funcion de clearCart, updateQuantity que al modificar estos valores se retorna los valores del carrito con el CartContextProvider


Punto 2 (Cálculo de Totales): Explique la estrategia utilizada para calcular el precio total acumulado y justifique como lo hizo y almacenó esto.

Se define una variable constante que itera los items a partir del contexto del carrito y para cada uno de los items que se obtienen se multiplica su precio por su cantidad. De esta manera solo se tiene que llamar ${total} en el tailwind que se desa mostrar. Este calculo se hace tanto en la pagina del carrito como en la pagina del checkout.

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);


Punto 3 (Arquitectura del Formulario): Explique cómo se estructuró y gobernó desde React el formulario, qué implemento y en caso de hacerlo, que tecnologías integró.

el formulario se implemento desde "useclient" con useState para cada variable y ademas un estado de confirmado que se cumple una vez la variable esValido define que esta listo para enviar. Mientras no esta confirmado no se puede enviar.

Ademas se implemento un handleSumbit que ademas de revisar que esta confirmado, tiene la funcion e.preventDefault(); utilizando React.FormEvent y la funcion previa implementada para clearCart().

Tambien esta el handle change que verifica los datos ingresados y vuelve hacer consulta sobre las validaciones utilizando React.ChangeEvent

Ya luego se crearon las estructuras tailwind con los type de cada variable

