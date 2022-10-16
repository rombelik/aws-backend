import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv';
dotenv.config();

import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

import { BUCKET_NAME } from './src/constants'

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SQS_QUEUE_NAME: process.env.SQS_QUEUE_NAME,
      SQS_QUEUE_URL: {
        'Fn::ImportValue': 'custom-name-for-queue-catalogItemsQueueUrl'
      }



    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: `arn:aws:s3:::${BUCKET_NAME}`
          },
          {
            Effect: 'Allow',
            Action: ["sqs:*"],
            Resource: {
              'Fn::ImportValue': 'custom-name-for-queue-catalogItemsQueueArn'
            }
          }
        ],
      },
    },
    httpApi: { cors: true, shouldStartNameWithService: true },
  },

  resources: {
    Resources: {
      CsvImportBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: BUCKET_NAME,
          AccessControl: 'Private',
          CorsConfiguration: {
            CorsRules: [
              {
                AllowedHeaders: ['*'],
                AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
                AllowedOrigins: ['*'],
              },
            ],
          },
        },
      },
      CsvImportBucketPolicy: {
        Type: 'AWS::S3::BucketPolicy',
        Properties: {
          Bucket: {
            Ref: 'CsvImportBucket',
          },
          PolicyDocument: {
            Statement: {
              Sid: 'AllowPublicRead',
              Effect: 'Allow',
              Action: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
              Resource: `arn:aws:s3:::${BUCKET_NAME}/*`,
              Principal: {
                AWS: '*',
              },
            },
          },
        },
      },
    },
  },

  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    }
  },
};

module.exports = serverlessConfiguration;
