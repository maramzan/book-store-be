const swaggerOptions = {
    definition: {
      bookStoreApi: '1.0.0',
      info: {
        title: 'BookStoreApi API',
        version: '1.0.0',
        description: 'A simple Express BookStoreApi API',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./controllers/*.ts'], // path to the API docs
  };
  
  export default swaggerOptions;