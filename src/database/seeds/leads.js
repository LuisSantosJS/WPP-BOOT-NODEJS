exports.seed = function (knex) {
    return knex('leads').insert([
            {
                is_active: true,
                email: 'dasilvasantosluisfelipe@gmail.com',
                number: '556896003373'
            }
    ])
}