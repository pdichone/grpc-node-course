// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_calculator_pb = require('../protos/calculator_pb.js');

function serialize_calculator_ComputeAverageRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAverageRequest)) {
    throw new Error('Expected argument of type calculator.ComputeAverageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageRequest(buffer_arg) {
  return protos_calculator_pb.ComputeAverageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_ComputeAverageResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAverageResponse)) {
    throw new Error('Expected argument of type calculator.ComputeAverageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageResponse(buffer_arg) {
  return protos_calculator_pb.ComputeAverageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FindMaximumRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.FindMaximumRequest)) {
    throw new Error('Expected argument of type calculator.FindMaximumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FindMaximumRequest(buffer_arg) {
  return protos_calculator_pb.FindMaximumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_FindMaximumResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.FindMaximumResponse)) {
    throw new Error('Expected argument of type calculator.FindMaximumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_FindMaximumResponse(buffer_arg) {
  return protos_calculator_pb.FindMaximumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeNumberDecompositionRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.PrimeNumberDecompositionRequest)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionRequest(buffer_arg) {
  return protos_calculator_pb.PrimeNumberDecompositionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_PrimeNumberDecompositionResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.PrimeNumberDecompositionResponse)) {
    throw new Error('Expected argument of type calculator.PrimeNumberDecompositionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_PrimeNumberDecompositionResponse(buffer_arg) {
  return protos_calculator_pb.PrimeNumberDecompositionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SquareRootRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.SquareRootRequest)) {
    throw new Error('Expected argument of type calculator.SquareRootRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SquareRootRequest(buffer_arg) {
  return protos_calculator_pb.SquareRootRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SquareRootResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.SquareRootResponse)) {
    throw new Error('Expected argument of type calculator.SquareRootResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SquareRootResponse(buffer_arg) {
  return protos_calculator_pb.SquareRootResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return protos_calculator_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return protos_calculator_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  // Unary API
  sum: {
    path: '/calculator.CalculatorService/Sum',
    requestStream: false,
    responseStream: false,
    requestType: protos_calculator_pb.SumRequest,
    responseType: protos_calculator_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  // Streaming API
  primeNumberDecomposition: {
    path: '/calculator.CalculatorService/PrimeNumberDecomposition',
    requestStream: false,
    responseStream: true,
    requestType: protos_calculator_pb.PrimeNumberDecompositionRequest,
    responseType: protos_calculator_pb.PrimeNumberDecompositionResponse,
    requestSerialize: serialize_calculator_PrimeNumberDecompositionRequest,
    requestDeserialize: deserialize_calculator_PrimeNumberDecompositionRequest,
    responseSerialize: serialize_calculator_PrimeNumberDecompositionResponse,
    responseDeserialize: deserialize_calculator_PrimeNumberDecompositionResponse,
  },
  computeAverage: {
    path: '/calculator.CalculatorService/ComputeAverage',
    requestStream: true,
    responseStream: false,
    requestType: protos_calculator_pb.ComputeAverageRequest,
    responseType: protos_calculator_pb.ComputeAverageResponse,
    requestSerialize: serialize_calculator_ComputeAverageRequest,
    requestDeserialize: deserialize_calculator_ComputeAverageRequest,
    responseSerialize: serialize_calculator_ComputeAverageResponse,
    responseDeserialize: deserialize_calculator_ComputeAverageResponse,
  },
  findMaximum: {
    path: '/calculator.CalculatorService/FindMaximum',
    requestStream: true,
    responseStream: true,
    requestType: protos_calculator_pb.FindMaximumRequest,
    responseType: protos_calculator_pb.FindMaximumResponse,
    requestSerialize: serialize_calculator_FindMaximumRequest,
    requestDeserialize: deserialize_calculator_FindMaximumRequest,
    responseSerialize: serialize_calculator_FindMaximumResponse,
    responseDeserialize: deserialize_calculator_FindMaximumResponse,
  },
  // error handling
  // this RPC wil throw an exception if the sent number is negative: -1
  squareRoot: {
    path: '/calculator.CalculatorService/SquareRoot',
    requestStream: false,
    responseStream: false,
    requestType: protos_calculator_pb.SquareRootRequest,
    responseType: protos_calculator_pb.SquareRootResponse,
    requestSerialize: serialize_calculator_SquareRootRequest,
    requestDeserialize: deserialize_calculator_SquareRootRequest,
    responseSerialize: serialize_calculator_SquareRootResponse,
    responseDeserialize: deserialize_calculator_SquareRootResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
