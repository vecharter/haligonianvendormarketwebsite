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
    <div style={{ position: 'relative', marginBottom: '50px' }}>
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
      <h6
        style={{
          fontSize: '13px',
          fontFamily: 'revert-layer',
          position: 'absolute',
          bottom: '-35px',
          fontWeight: '700',
          maxWidth: '45vw',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: '2', // Adjust the number of lines before it wraps
          overflow: 'hidden',
        }}>
        {name}
      </h6>
    </div>
  ) : null;
};
