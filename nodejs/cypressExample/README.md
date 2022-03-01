# Instrucciones:

### Instalar:

```shell
npm init -y
npm install cypress --save-dev
npm install cypress -D
```

### Modificar:

Modificar el archivo `package.json` adicionando el siguiente código en `script:`

```javascript
"cy:open": "node_modules\\.bin\\cypress open"
```

### Ejecutar:

Ejecutar en la raiz del proyecto

```shell
npm run cy:open
```

Fuentes:

https://santandergto.com/cypress-instala-y-ejecuta-tu-primera-prueba-e2e-5-minutos/

https://www.paradigmadigital.com/dev/cypress-un-framework-de-pruebas-todo-en-uno/

[Installing Cypress | Cypress Documentation](https://docs.cypress.io/guides/getting-started/installing-cypress)