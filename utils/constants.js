module.exports = Object.freeze({
  BAD_REQUEST: { code: 400, body: { message: 'Некорректный запрос' } },
  NOT_FOUND: { code: 404, body: { message: 'Ресурс не найден' } },
  INTERNAL_SERVER: { code: 500, body: { message: 'На сервере произошла ошибка' } },
});
