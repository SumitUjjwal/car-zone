# CAR-ZONE
Car Zone is an e-commerce website for auto parts and accessories.
Deployed link: [CarZone](https://project-car-zone.netlify.app/)

## directory structure :
```
.
├── back-end
│   └── config
│       └── db.js
│   └── middlewares
│       └── authenticate.middleware.js
│       └── validator.middleware.js
│   └── models
│       └── order.model.js
│       └── product.model.js
│       └── user.model.js
│   └── routes
│       └── order.route.js
│       └── product.route.js
│       └── user.route.js
│   └── index.js
│   └── package-lock.json
│   └── package.json
├── front-end
│   └── admin-panel
│   └── html
│   └── resources
│   └── script
│   └── style
│   └── index.html
└── README.md
```

# API Endpoints
## baseUrl :
```
       https://vast-rose-jellyfish-wrap.cyclic.app
```

## user :
```
       login -> POST `${baseUrl}/user/login`
       register -> POST `${baseUrl}/user/register`
```

## product :
```
       create -> POST `${baseUrl}/product/create`
       read -> GET `${baseUrl}/product/`
       read(query) -> POST `${baseUrl}/product?q='query'`
       read(sort=asc) -> POST `${baseUrl}/product?sort=asc`
       read(sort=desc) -> POST `${baseUrl}/product?sort=desc`
       update -> PATCH `${baseUrl}/product/update/:id`
       delete -> DELETE `${baseUrl}/product/delete/:id`
```

## orders :
```
       create -> POST `${baseUrl}/order/add`
       read -> GET `${baseUrl}/order/`
       read(query) -> POST `${baseUrl}/order?q='query'`
       update -> PATCH `${baseUrl}/product/update/:id`
```

## body for adding new product :
```
       {
              img_src: String,
              title: String,
              model: String,
              sku: Number,
              fulfillment: String,
              price: Number,
              discount: Number,
              prevPrice: Number
       }
```


## screenshot :
![alt homepage](https://i.imgur.com/wBGStuv.png)

