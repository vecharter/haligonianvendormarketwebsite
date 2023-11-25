import { Box, Text, Heading } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { CtfImage } from '@src/components/features/contentful/ctf-image';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

export const ProductTile = ({
  featuredProductImage,
  price,
  slug,
  name,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });
  useEffect(() => {}, []);
  return slug ? (
    <div style={{ position: 'relative', marginBottom: '40px' }}>
      <Box as={Link} href={slug}>
        {featuredProductImage && (
          <Box borderRadius={4} overflow="hidden">
            <CtfImage
              livePreviewProps={inspectorProps({ fieldId: 'featuredProductImage' })}
              {...featuredProductImage}
            />
          </Box>
        )}
      </Box>
      <Heading
        as="h6"
        style={{
          textAlign: 'center',
          fontSize: '16px',
          fontFamily: 'cursive',
          position: 'absolute',
          bottom: '-25px',
          fontWeight: '700',
        }}
        letterSpacing="0.03em"
        color={'#333333'}
        transform="translateY(0.33em)"
        whiteSpace="nowrap">
        {name}
      </Heading>
    </div>
  ) : null;
};
