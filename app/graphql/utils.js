const { gql } = require('apollo-server');

const queries = queriesStrings => gql`extend type Query {${queriesStrings}}`;
const mutations = mutationsStrings => gql`extend type Mutation {${mutationsStrings}}`;

module.exports = { queries, mutations };
