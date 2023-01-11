import {
  TextractClient,
  DetectDocumentTextCommand,
} from '@aws-sdk/client-textract';
import fs from 'fs';

const image = new Uint8Array(fs.readFileSync('./002.jpg'));

const main = async () => {
  const client = new TextractClient({ region: 'us-east-1' });

  const params = {
    Document: { Bytes: image },
    // FeatureTypes: [FeatureType.SIGNATURES], // need to AnalyzeDocumentCommand
  };
  const command = new DetectDocumentTextCommand(params);

  const data = await client.send(command);

  data.Blocks.forEach((block) => {
    if (block.BlockType === 'LINE') {
      console.log(block.Text);
    }
  });
};

main();
