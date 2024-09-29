const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/index'); 
const User = require('./models/User');
const Address = require('./models/Address');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { name, address } = req.body;

  try {
    if (name === "") {
      throw new Error("Name should not be empty");
    }
    const user = await User.create({ name });

    if (Array.isArray(address)) {
      const addressPromises = address
        .filter(addr => addr !== "")
        .map(addr => Address.create({ address: addr, userId: user.id }));

      await Promise.all(addressPromises);
    } else {
      if (address === "") {
        throw new Error("Address should not be empty");
      }
      await Address.create({ address, userId: user.id });
    }

    
    res.status(201).json({ message: 'User and address created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
