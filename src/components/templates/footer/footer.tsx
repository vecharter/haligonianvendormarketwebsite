import { Container, Box, Link, useTheme, Icon } from '@chakra-ui/react';
import { FaInstagram, FaFacebook } from 'react-icons/fa'; // Import the Instagram and Facebook icons

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      as="footer"
      width="full"
      py={{ base: 10, lg: 16 }}
      mt="auto"
      borderTop="1px"
      borderColor={theme.f36.gray200}>
      <Container>
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
        <h2 style={{ textAlign: 'center', marginTop: '10px' }}>
          Copyright 2023 © Haligonian Vendor Market
        </h2>
      </Container>
    </Box>
  );
};
