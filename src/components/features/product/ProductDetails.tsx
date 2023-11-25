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
import { FaInstagram, FaFacebook } from 'react-icons/fa'; // Import the Instagram and Facebook icons

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
            <Container style={{ marginTop: '50px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* Instagram Link */}
                <Link
                  href="https://instagram.com/haligonianvendormarket?igshid=MzMyNGUyNmU2YQ%3D%3D&utm_source=qr"
                  isExternal
                  mx={2}>
                  <Icon as={FaInstagram} boxSize={6} color="gray.600" />
                </Link>
                {/* Facebook Link */}
                <Link
                  href="https://www.facebook.com/profile.php?id=61552691275932&mibextid=LQQJ4d"
                  isExternal
                  mx={2}>
                  <Icon as={FaFacebook} boxSize={6} color="gray.600" />
                </Link>
              </Box>
            </Container>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};
