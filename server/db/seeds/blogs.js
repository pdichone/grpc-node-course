
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        {author: 'Stephane', title: 'Stephs Blog Title', content: 'Fist blog'},
        {author: 'Paulo', title: 'Paulos blog title', content: 'First blog'},
        {author: 'James', title: 'James blog title', content: 'first Blog'}
      ]);
    });
};
