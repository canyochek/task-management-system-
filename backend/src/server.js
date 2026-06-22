const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const cors = require('cors');
const sql = require('mssql'); 
const mongoose = require('mongoose'); 
require('dotenv').config(); 
const taskRouter = require('./routers/taskRouter'); 
const authRouter = require('./routers/authRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRouter);

if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Успішно підключено до хмарної бази MongoDB Atlas!'))
        .catch(err => console.error('Помилка підключення до MongoDB Atlas:', err));
} else {
    const dbConfig = {
        user: 'sa', 
        password: '340294qq', 
        server: 'localhost', 
        database: 'TodoDB', 
        options: {
            encrypt: false, 
            trustServerCertificate: true,
            port: 1433 
        }
    };

    sql.connect(dbConfig)
        .then(pool => {
            if (pool.connected) console.log('Успішно підключено до локального SQL Server 2014!');
        })
        .catch(err => console.error('Помилка підключення до SQL Server:', err));
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));