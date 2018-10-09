# node-nestor

Une API pour Nestor

## Usage

```javascript
const Nestor = require('node-nestor');
const nestor = new Nestor();
```

### Register

```javascript
nestor.signUp(email, password);
```

### Authentification

```javascript
nestor.login(email, password);
```

### Get profile

```javascript
nestor.getProfile();
```

### Update profile

```javascript
nestor.updateProfile({lastName, firstName, email, phone});
```

### Get Stripe profile

```javascript
nestor.getStripeProfile();
```

### Get menu by postal code

```javascript
nestor.getMenu(postalCode);
```

### Get orders

```javascript
nestor.getOrders();
```

### Get order by Id

```javascript
nestor.getOrderById(orderId);
```
