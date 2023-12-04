import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useTheme,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa'; // Import the Instagram and Facebook icons
import { useEffect, useState } from 'react';

import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import styled from '@emotion/styled';
import { CtfImage } from '@src/components/features/contentful/ctf-image';

import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

export const ProductDetails = ({
  name,
  price,
  description,
  featuredProductImage,
  productImagesCollection,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const theme = useTheme();
  const inspectorProps = useContentfulInspectorMode({ entryId });
  const [link, setLink] = useState('');
  useEffect(async () => {
    // Fetch Contentful data here
    const contentType = 'pageProduct'; // Replace with the content type you want to fetch
    let response = await fetch(
      `https://cdn.contentful.com/spaces/zpkn97k5l3y7/entries?access_token=ahEsX1I2XpOx_WZfd2EqeO_Zyu1W6nxnOrY3Yv0nlCw&content_type=${contentType}&sys.id=${entryId}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const content = await response.json();
    console.log(content);
    if (content.items.length > 0) {
      setLink(content.items[0]?.fields.link);
    }
  }, []);
  return (
    <Container mt={{ base: 6, lg: 16 }}>
      <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 5, lg: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 7, xl: 8 }}>
          <Flex flexDirection="column" gap={{ base: 3, lg: 5 }}>
            {featuredProductImage && (
              <CtfImage
                livePreviewProps={inspectorProps({ fieldId: 'featuredProductImage' })}
                {...featuredProductImage}
              />
            )}
            {productImagesCollection?.items &&
              productImagesCollection.items.map(image => {
                return image ? (
                  <CtfImage
                    livePreviewProps={inspectorProps({ fieldId: 'productImages' })}
                    key={image.sys.id}
                    imageProps={{
                      sizes: '(max-width: 1200px) 70vw, 100vw',
                    }}
                    {...image}
                  />
                ) : null;
              })}
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 5, xl: 4 }}>
          <Box
            width="100%"
            bg={theme.f36.gray100}
            mb="auto"
            borderRadius={4}
            px={{ base: 4, lg: 6 }}
            pt={{ base: 6, lg: 6 }}
            pb={{ base: 8, lg: 14 }}>
            <Heading {...inspectorProps({ fieldId: 'name' })} as="h1" variant="h3">
              {name}
            </Heading>
            <Text {...inspectorProps({ fieldId: 'description' })} mt={5} color={theme.f36.gray700}>
              {description}
            </Text>
            <Container style={{ marginTop: '50px', marginBottom: '-30px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* Instagram Link */}
                <Link href={link} isExternal mx={2}>
                  <Icon as={FaLink} boxSize={6} color="gray.600" />
                </Link>
                {/* Facebook Link */}
              </Box>
            </Container>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};
