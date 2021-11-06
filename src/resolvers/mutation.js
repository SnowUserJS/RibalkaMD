const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const {
 AuthenticationError,
 ForbiddenError
 } = require('apollo-server-express');
 require('dotenv').config();
 const gravatar = require('../util/gravatar');


module.exports = {
 newNote: async (parent, args, { models, user }) => {
    if (!user) {
        throw new AuthenticationError('Вы должны войти в систему, чтобы создать заметку');
    }
 return await models.Note.create({
 content: args.content,
 author: mongoose.Types.ObjectId(user.id),
 favoriteCount: 0
 });
 },
 deleteNote: async (parent, { id }, { models, user }) => {
    if (!user) {
        throw new Authentication('Вы должны войти в систему, чтобы удалить заметку');
    }
    // Находим заметку
    const note = await models.Note.findById(id);
    // Если владелец заметки и текущий пользователь не совпадают, выбрасываем запрет на действие.
    if (note && String(note.author) !== user.id) {
        throw new ForbiddenError('У вас нет прав на удаление заметки');
    }
    try {
        await note.remove();
        return true;
    } catch (err)  { 
        return false;
    }
 },
 updateNote: async (parent, { content, id }, { models, user }) => {
    if (!user) {
        throw new AuthenticationError('Вы должны войти в систему, чтобы обновить заметку');
    }
    const note = await models.Note.findById(id);
    if (note && String(note.author) !== user.id) {
        throw new ForbiddenError('У вас нет прав на обновление заметки');
    }
    return await models.Note.findOneAndUpdate({
        _id: id,
    },
    {
        $set: {
            content
        }
    },
    {
        new: true
    });
 },
 toggleFavorite: async (parent, { id }, { models, user }) => {
    //Если контекст пользователя не передан, выбрасываем ошибку
    if (!user) {
        throw new AuthenticationError();
    }
    // Проверяем отмечал ли пользователь заметку как избранное
    let noteCheck = await models.Note.findById(id);
    const hasUser = noteCheck.favoritedBy.indexOf(user.id);

    // Если пользователь есть в списке, удаляем кго оттуда и уменьшаем значение на 1

    if (hasUser >= 0) {
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: -1
          }
        },
            {
            // Устанавливаем new как true чтобы вернуть обновленный документ
            new: true
        }
            );
    } else {
        // Если пользователя в списке нет, добавляем его туда и увеличиваем значение favoritCount на 1
        return await models.Note.findByIdAndUpdate(
            id,
            {
                $push: {
                    favoriteBy: mongoose.Types.ObjectId(user.id)
                },

                $inc: {
                    favoriteCount: 1
                }
            },
            {
                new: true
            }
            );
    }
 },
 signUp: async (parent, { username, email, password }, { models }) => {
    // Нормальный майл
    email = email.trim().toLowerCase();
    // Хешируем пароль
    const hashed = await bcrypt.hash(password, 10);
    // Создаем урл граватар изображений
    const avatar = gravatar(email);
    try {
        const user = await models.User.create({
            username,
            email,
            avatar,
            password: hashed
        });
        // Создаем и возвращаем json веб токен
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
        console.log(err);
        // Если при регистрации возникла проблема, выбрасываем ошибку
        throw new Error('Ошибка при создании аккаунта');
    }
 },
 signIn: async (parent, {username, email, password }, { models }) => {
    if (email) {
        // Нормализация емайла
        email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
        $or: [{ email }, { username }]
    });
    // Если пользователь не найден, выбрасываем ошибку аутентификации
    if (!user) {
        throw new AuthenticationError('Неудачная попытка входа в учетную запись.');
    }
    // Если пароли не совпвдают, сообщаем об ошибке
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new AuthenticationError('Ошибка входа');
    }
    // Создаем и возвращаем json вебтокен.
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
 }
 };