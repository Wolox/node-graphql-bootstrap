const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          firstName,
          lastName,
          email
        }
      }`;

module.exports = { getUser };
