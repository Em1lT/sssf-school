'use strict';

const stationModel = require('../model/station');
const connectionModel = require('../model/connection');
const connectionTypeModel = require('../model/connectionType');
const LevelIDModel = require('../model/level');
const currentTypeModel = require('../model/currentType');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLFloat
} = require(
    'graphql');

const stationType = new GraphQLObjectType({
    name: 'station',
    description: 'Charge station basic information',
    fields: () => ({
        Title: {
            type: GraphQLString
        },
        AddressLine1: {
            type: GraphQLString
        },
        Town: {
            type: GraphQLString
        },
        StateOrProvince: {
            type: GraphQLString
        },
        Postcode: {
            type: GraphQLString
        },
        Location: {
            type: CoordinationType
        },
        Connections: {
            type: new GraphQLList(ConnectionIDType)
        }
    }),
});

const ConnectionsType = new GraphQLObjectType({
    name: 'ConnectionsType',
    description: 'Charge station different connections',
    fields: () => ({
        id: {
            type: GraphQLString,
        }
    }),
});

const LevelIDType = new GraphQLObjectType({
    name: 'LevelIDType',
    description: 'LevelIDType',
    fields: () => ({
        Comments: {
            type: GraphQLString,
        },
        IsFastChargeCabable: {
            type: GraphQLBoolean
        },
        Title: {
            type: GraphQLString
        }
    }),
});

const CurrentTypeTypeType = new GraphQLObjectType({
    name: 'CurrentTypeTypeType',
    description: 'Fuck these types man!',
    fields: () => ({
        Description: {
            type: GraphQLString,
        },
        Title: {
            type: GraphQLString
        }
    }),
});

const ConnectionTypeType = new GraphQLObjectType({
    name: 'ConnectionTypeType',
    description: 'Connection type',
    fields: () => ({
        FormalName: {
            type: GraphQLString,
        },
        Title: {
            type: GraphQLString
        }
    }),
});

const ConnectionIDType = new GraphQLObjectType({
    name: 'ConnectionIDType',
    description: 'Charge station ',
    fields: () => ({
        ConnectionTypeID: {
            type: ConnectionTypeType,
            resolve(parent, args) {
                return connectionModel.findById({
                    _id: parent
                }).then((data) => {
                    return connectionTypeModel.findById({
                        _id: data.ConnectionTypeID
                    })
                })
            },
        },
        LevelID: {
            type: LevelIDType,
            resolve(parent, args) {
                return connectionModel.findById({
                    _id: parent
                }).then((data) => {
                    return LevelIDModel.findById({
                        _id: data.LevelID
                    })
                })
            },
        },
        CurrentTypeID: {
            type: CurrentTypeTypeType,
            resolve(parent, args) {
                return connectionModel.findById({
                    _id: parent
                }).then((data) => {
                    return currentTypeModel.findById({
                        _id: data.CurrentTypeID
                    })
                })
            }
        },
        Quantity: {
            type: GraphQLInt,
            resolve(parent, args) {
                return connectionModel.findById({
                    _id: parent
                }).then((data) => {
                    return data.Quantity
                })
            }
        }
    }),
});

const CoordinationType = new GraphQLObjectType({
    name: 'CoordinationType',
    description: 'Charge station coordinates',
    fields: () => ({
        coordinates: {
            type: new GraphQLList(GraphQLString),
        }
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootType',
    fields: {
        chargeStations: {
            type: new GraphQLList(stationType),
            description: 'Get all chargeStations',
            args: {
                limit: {
                    type: GraphQLInt
                },
                start: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return stationModel.find({}).limit(args.limit ? args.limit : 10).skip(args.start ? args.start : 0)
            },
        },
        chargeStation: {
            type: stationType,
            description: 'Get one chargeStation with id',
            args: {
                id: {
                    type: GraphQLID,
                }
            },
            resolve(parent, args) {
                return stationModel.findById({
                    _id: args.id
                })
            },
        },
        connectionTypes: {
            type: new GraphQLList(ConnectionTypeType),
            description: 'Get all connection types',
            resolve(parent, args) {
                return connectionTypeModel.find()
            },
        },
        currentTypes: {
            type: new GraphQLList(CurrentTypeTypeType),
            description: 'Get all current types',
            resolve(parent, args) {
                return currentTypeModel.find()
            },
        },
        levelTypes: {
            type: new GraphQLList(LevelIDType),
            description: 'Get all level types',
            resolve(parent, args) {
                return LevelIDModel.find()
            },
        },
        ByLocation: {
            type: stationType,
            description: 'Get one chargeStation with id',
            args: {
                topLeft: {
                    type: new GraphQLList(GraphQLFloat)
                },
                topRight: {
                    type: new GraphQLList(GraphQLFloat)
                },
                bottomRight: {
                    type: new GraphQLList(GraphQLFloat)
                }
            },
            resolve: async (parent, args) => {

                // Input longitude before latitude!
                const polygon = {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [args.topLeft[0], args.topLeft[1]],
                            [args.topRight[0], args.topRight[1]],
                            [args.bottomRight[0], args.bottomRight[1]],
                            [args.topLeft[0], args.topLeft[1]]
                        ]
                    ]
                }
                try {
                    return await stationModel.find({}).where('Location').within(polygon).populate([{
                        path: "Connections",
                        model: "Connection",
                        populate: [{
                                path: "ConnectionTypeID",
                                model: "ConnectionType"
                            },
                            {
                                path: "CurrentTypeID",
                                model: "CurrentType"
                            },
                            {
                                path: "LevelID",
                                model: "Level"
                            }
                        ]
                    }])
                } catch (e) {
                    return new Error(e.message);
                }
            },
        }
    }
});

const ConnectionIDinput = new GraphQLInputObjectType({
    name: 'ConnectionIDs',
    fields: () => ({
        ConnectionTypeID: {
            type: new GraphQLNonNull(GraphQLString),
        },
        LevelID: {
            type: new GraphQLNonNull(GraphQLString),
        },
        CurrentTypeID: {
            type: new GraphQLNonNull(GraphQLString),
        },
        Quantity: {
            type: new GraphQLNonNull(GraphQLInt),
        }
    }),
});

const CoordinateInput = new GraphQLInputObjectType({
    name: 'CoordinateInput',
    fields: () => ({
        coordinates: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLFloat)),
        }
    }),
})

const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    description: 'Mutations',
    fields: {
        addStation: {
            type: stationType,
            description: 'Add a new station',
            args: {
                Postcode: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                Title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                AddressLine1: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                StateOrProvince: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                Town: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                Connections: {
                    type: new GraphQLNonNull(new GraphQLList(ConnectionIDinput))
                },
                Location: {
                    type: new GraphQLNonNull(new GraphQLList(CoordinateInput))
                }
            },
            resolve: async (parent, args, {req, res, checkAuth}) => {

                checkAuth(req, res);
                try {
                    let connections = await saveConnections(args.Connections)
                    let station = new stationModel({
                        Title: args.Title,
                        AddressLine1: args.AddressLine1,
                        Town: args.Town,
                        StateOrProvince: args.StateOrProvince,
                        Postcode: args.Postcode,
                        Connections: connections,
                        Location: {
                            coordinates: args.Location[0].coordinates
                        }
                    })
                    return station.save();
                } catch (e) {
                return new Error(e.message);
                }

            },
        },
        removeStation: ({
            type: stationType,
            description: 'Remove station with id',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
            },
            resolve: async (parent, args, { req, res, checkAuth}) => {

                checkAuth(req, res);
                try {
                    const station = await stationModel.findByIdAndDelete({
                        _id: args.id
                    })
                    await deleteConncetions(station.Connections);
                    return station;
                } catch (e) {
                    return new Error(e.message);
                }
                /*
                return stationModel.findByIdAndDelete({
                    _id: args.id
                }).then(async (data) => {
                    await deleteConncetions(data.Connections);
                })*/
            }
        }),
        modifyStation: {
            type: station,
            description: 'Modify charge station',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                Title: {
                    type: GraphQLString
                },
            },
            resolve: async (parent, args, {req,res,checkAuth}) => {
                try {
                    checkAuth(req, res);
                    return await stationModel.findByIdAndUpdate(args.id, {
                        Title: args.Title
                    }, {
                        new: true
                    });
                } catch (e) {
                    return new Error(e.message);
                }
            },
        },
    },
});

//Add modify and bounds
const deleteConncetions = async (ids) => {
    return Promise.all(ids.map(async (id) => {
        await connectionModel.findByIdAndDelete({
            _id: id
        })
    }));
    /**/
}

const saveConnections = async (connections) => {
    let connectionArr = [];

    return Promise.all(connections.map(async (connection) => {
        let connetion = new connectionModel({
            ConnectionTypeID: connection.ConnectionTypeID,
            LevelID: connection.LevelID,
            CurrentTypeID: connection.CurrentTypeID,
            Quantity: connection.Quantity
        })
        let savedConnection = await connetion.save();
        connectionArr.push(savedConnection._id)

    })).then((arr) => {
        return connectionArr
    })
}


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});