import * as aws from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();
const SpaceConfig = {
  accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
};

export const spaces = (() => {
  try {
    const spacesEndpoint = new aws.Endpoint(process.env.SPACES_URL || '');
    const space = new aws.S3({
      endpoint: spacesEndpoint,
      ...SpaceConfig,
      region: 'us-west-2',
    });
    console.log('Connection spaces digital ocean successfully');
    return space;
  } catch (error) {
    console.log(error);
    return null;
  }
})();
