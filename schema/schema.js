 'use strict';

 const category = require('../model/category');
 const species = require('../model/species');
 const animal = require('../model/animal');

 const {
     GraphQLObjectType,
     GraphQLID,
     GraphQLString,
     GraphQLList,
     GraphQLSchema,
     GraphQLNonNull
 } = require(
     'graphql');

 const animalData = [{
     id: 1,
     animalName: 'Frank',
     species: 1,
 }, ];

 const speciesData = [{
     id: 1,
     speciesName: 'Cat',
     category: 1,
 }, ];

 const animalCategory = [{
     id: 1,
     categoryName: 'Mammal',
 }, ];

 const animalType = new GraphQLObjectType({
     name: 'animal',
     description: 'Animal name and species',
     fields: () => ({
         id: {
             type: GraphQLID
         },
         animalName: {
             type: GraphQLString
         },
         species: {
             type: speciesType,
             resolve: async (parent, args) => {
                let anim = species.findOne({
                     id: parent.species
                 })
                 return anim;
             }
         },
     }),
 });

 const speciesType = new GraphQLObjectType({
     name: 'species',
     description: 'species',
     fields: () => ({
         id: {
             type: GraphQLID
         },
         speciesName: {
             type: GraphQLString
         },
         category: {
             type: categoryType,
             resolve(parent, args) {
                let category = category.findOne({
                    id: parent.category
                })
                 return category;
             }
         },
     }),
 });

 const categoryType = new GraphQLObjectType({
     name: 'category',
     description: 'category',
     fields: () => ({
         id: {
             type: GraphQLID
         },
         categoryName: {
             type: GraphQLString
         }
     }),
 });

 const RootQuery = new GraphQLObjectType({
     name: 'RootQueryType',
     fields: {
         animals: {
             type: new GraphQLList(animalType),
             description: 'Get all animals',
             resolve(parent, args, {req, res, checkAuth}) {
                checkAuth(req, res); 
                return animal.find({})
             },
         },
         animal: {
            type: new GraphQLList(animalType),
            description: 'Get one animal',
            resolve(parent, args) {
                return animal.findOne({
                    id: args.id
                })
            },
         }
     },
 });

 const Mutation = new GraphQLObjectType({
     name: 'MutationType',
     description: 'Mutations',
     fields: {
         addCategory: {
             type: categoryType,
             description: 'Add animal category like Fish, Mammal, etc.',
             args: {
                 id: {
                     type: new GraphQLNonNull(GraphQLID)
                 },
                 categoryName: {
                     type: new GraphQLNonNull(GraphQLString)
                 },
             },
             resolve(parent, args) {
                 const newCategory = new category({
                     id: args.id,
                     categoryName: args.categoryName,
                 });
                 return newCategory.save();
             },
         },
         addSpecies: {
             type: speciesType,
             description: 'Add animal species like Cat etc.',
             args: {
                 id: {
                     type: new GraphQLNonNull(GraphQLID)
                 },
                 speciesName: {
                     type: new GraphQLNonNull(GraphQLString)
                 },
                 category: {
                    type: new GraphQLNonNull(GraphQLID)
                 }
             },
             resolve (parent, args, {req, res, checkAuth})  {
                 checkAuth(req,res);
                 const newSpecies = new species({
                     id: args.id,
                     speciesName: args.speciesName,
                     category: args.category
                 });
                 return newSpecies.save();
             },
         },
         addAnimal: {
            type: animalType,
            description: 'Add new animal ',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                animalName: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                species: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args) {
                const newAnimal = new animal({
                    id: args.id,
                    animalName: args.animalName,
                    species: args.species
                });
                return newAnimal.save()
            },
        }
     },
 });



 module.exports = new GraphQLSchema({
     query: RootQuery,
     mutation: Mutation,
 });