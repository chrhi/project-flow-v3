/* eslint-disable */ 
import React from 'react';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';
import { Button } from '@tremor/react';
import { Camera } from 'lucide-react';
import { AbdullahButton , buttonVariants } from '../used/AbdullahButton';

function downloadImage(dataUrl : any) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    //@ts-ignore
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight);
    //@ts-ignore
    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#fffff',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
    <Panel position="top-right">
      <AbdullahButton className={`${buttonVariants({variant : "secondary" , size : "sm"})}`} onClick={onClick}>
        <Camera className='  w-4 h-4' />
      </AbdullahButton>
    </Panel>
  );
}

export default DownloadButton;