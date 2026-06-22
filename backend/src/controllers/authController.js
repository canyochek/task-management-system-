const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Заповніть усі поля' });
        }

        if (process.env.MONGO_URI) {
            const checkUser = await User.findOne({ email: email.toLowerCase() });
            if (checkUser) {
                return res.status(400).json({ message: 'Користувач з таким Email вже існує' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                email,
                passwordHash: hashedPassword
            });
            await newUser.save();

        } else {
            const checkUser = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
            if (checkUser.recordset.length > 0) {
                return res.status(400).json({ message: 'Користувач з таким Email вже існує' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await sql.query`INSERT INTO Users (Email, PasswordHash) VALUES (${email}, ${hashedPassword})`;
        }

        res.status(201).json({ message: 'Користувача успішно створено!' });

    } catch (error) {
        console.error('Помилка при реєстрації:', error);
        res.status(500).json({ message: 'Помилка сервера при реєстрації' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Заповніть усі поля' });
        }

        let userId;
        let userEmail;
        let hashedPasswordFromDB;

        if (process.env.MONGO_URI) {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (!user) {
                return res.status(400).json({ message: 'Неправильний email або пароль' });
            }
            userId = user._id;
            userEmail = user.email;
            hashedPasswordFromDB = user.passwordHash;
        } else {
            const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
            const user = result.recordset[0];
            if (!user) {
                return res.status(400).json({ message: 'Неправильний email або пароль' });
            }
            userId = user.Id;
            userEmail = user.Email;
            hashedPasswordFromDB = user.PasswordHash;
        }

        const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неправильний email або пароль' });
        }

        const token = jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET || 'super_secret_key_12345',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: userId,
                email: userEmail
            }
        });

    } catch (error) {
        console.error('Помилка при вході:', error);
        res.status(500).json({ message: 'Помилка сервера при вході' });
    }
};

module.exports = { register, login };