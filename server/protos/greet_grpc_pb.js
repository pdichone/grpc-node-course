// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_greet_pb = require('../protos/greet_pb.js');

function serialize_greet_GreetEveryoneRequest(arg) {
  if (!(arg instanceof protos_greet_pb.GreetEveryoneRequest)) {
    throw new Error('Expected argument of type greet.GreetEveryoneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetEveryoneRequest(buffer_arg) {
  return protos_greet_pb.GreetEveryoneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetEveryoneResponse(arg) {
  if (!(arg instanceof protos_greet_pb.GreetEveryoneResponse)) {
    throw new Error('Expected argument of type greet.GreetEveryoneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetEveryoneResponse(buffer_arg) {
  return protos_greet_pb.GreetEveryoneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetManyTimesRequest(arg) {
  if (!(arg instanceof protos_greet_pb.GreetManyTimesRequest)) {
    throw new Error('Expected argument of type greet.GreetManyTimesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetManyTimesRequest(buffer_arg) {
  return protos_greet_pb.GreetManyTimesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetManyTimesResponse(arg) {
  if (!(arg instanceof protos_greet_pb.GreetManyTimesResponse)) {
    throw new Error('Expected argument of type greet.GreetManyTimesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetManyTimesResponse(buffer_arg) {
  return protos_greet_pb.GreetManyTimesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetRequest(arg) {
  if (!(arg instanceof protos_greet_pb.GreetRequest)) {
    throw new Error('Expected argument of type greet.GreetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetRequest(buffer_arg) {
  return protos_greet_pb.GreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_GreetResponse(arg) {
  if (!(arg instanceof protos_greet_pb.GreetResponse)) {
    throw new Error('Expected argument of type greet.GreetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_GreetResponse(buffer_arg) {
  return protos_greet_pb.GreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_LongGreetRequest(arg) {
  if (!(arg instanceof protos_greet_pb.LongGreetRequest)) {
    throw new Error('Expected argument of type greet.LongGreetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_LongGreetRequest(buffer_arg) {
  return protos_greet_pb.LongGreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_greet_LongGreetResponse(arg) {
  if (!(arg instanceof protos_greet_pb.LongGreetResponse)) {
    throw new Error('Expected argument of type greet.LongGreetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_greet_LongGreetResponse(buffer_arg) {
  return protos_greet_pb.LongGreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreetServiceService = exports.GreetServiceService = {
  // unary API
  greet: {
    path: '/greet.GreetService/Greet',
    requestStream: false,
    responseStream: false,
    requestType: protos_greet_pb.GreetRequest,
    responseType: protos_greet_pb.GreetResponse,
    requestSerialize: serialize_greet_GreetRequest,
    requestDeserialize: deserialize_greet_GreetRequest,
    responseSerialize: serialize_greet_GreetResponse,
    responseDeserialize: deserialize_greet_GreetResponse,
  },
  // Server streaming API
  greetManyTimes: {
    path: '/greet.GreetService/GreetManyTimes',
    requestStream: false,
    responseStream: true,
    requestType: protos_greet_pb.GreetManyTimesRequest,
    responseType: protos_greet_pb.GreetManyTimesResponse,
    requestSerialize: serialize_greet_GreetManyTimesRequest,
    requestDeserialize: deserialize_greet_GreetManyTimesRequest,
    responseSerialize: serialize_greet_GreetManyTimesResponse,
    responseDeserialize: deserialize_greet_GreetManyTimesResponse,
  },
  // Client Streaming
  longGreet: {
    path: '/greet.GreetService/LongGreet',
    requestStream: true,
    responseStream: false,
    requestType: protos_greet_pb.LongGreetRequest,
    responseType: protos_greet_pb.LongGreetResponse,
    requestSerialize: serialize_greet_LongGreetRequest,
    requestDeserialize: deserialize_greet_LongGreetRequest,
    responseSerialize: serialize_greet_LongGreetResponse,
    responseDeserialize: deserialize_greet_LongGreetResponse,
  },
  // BiDi Streaming
  greetEveryone: {
    path: '/greet.GreetService/GreetEveryone',
    requestStream: true,
    responseStream: true,
    requestType: protos_greet_pb.GreetEveryoneRequest,
    responseType: protos_greet_pb.GreetEveryoneResponse,
    requestSerialize: serialize_greet_GreetEveryoneRequest,
    requestDeserialize: deserialize_greet_GreetEveryoneRequest,
    responseSerialize: serialize_greet_GreetEveryoneResponse,
    responseDeserialize: deserialize_greet_GreetEveryoneResponse,
  },
};

exports.GreetServiceClient = grpc.makeGenericClientConstructor(GreetServiceService);
