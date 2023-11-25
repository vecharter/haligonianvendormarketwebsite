import { Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ProductTile } from '@src/components/features/product/ProductTile';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

interface ProductTileGridProps {
  title: string;
  products: Array<PageProductFieldsFragment | undefined | null>;
}

export const ProductTileGrid = ({ title, products }: ProductTileGridProps) => {
  useEffect(() => {}, []);
  return (
    <Container>
      {title && (
        <Heading
          style={{
            textAlign: 'center',
            color: '#333',
            fontFamily: 'cursive',
            marginBottom: '30px',
          }}
          as="h2"
          mb={3}>
          {title}
        </Heading>
      )}
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        rowGap={{ base: 6, lg: 6 }}
        columnGap={{ base: 4, lg: 24 }}>
        {products
          .sort((a, b) => {
            const nameA = a?.name.toUpperCase(); // Ignore case
            const nameB = b?.name.toUpperCase(); // Ignore case

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0; // Names are equal
          })
          .map((product, index) => {
            return <GridItem key={index}>{product ? <ProductTile {...product} /> : null}</GridItem>;
          })}
      </Grid>
    </Container>
  );
};
