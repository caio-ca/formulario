import React, { useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  FormLabel,
  HStack,
  RadioGroup,
  Radio,
  Button,
} from "@chakra-ui/react";

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    nasc: '',
    natural: '',
    cel: '',
    telefone: '',
    endereco: '',
    cidade: '',
    sexo: 'Masculino',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = 'http://localhost:5175'; // URL do servidor Node.js
      console.log('API URL:', apiUrl);
      
      const response = await axios.post(apiUrl + '/enviar', formData);
      console.log(response.data);
      alert('Dados enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error.response || error.message);
      alert('Erro ao enviar dados. Verifique os logs para mais detalhes.');
    }
  };

  return (
    <Box h="100vh">
      <Center
        as="header"
        h={150}
        bg="teal.500"
        color="white"
        fontWeight="bold"
        fontSize="4xl"
        pb="8"
      >
        Formulário
      </Center>

      <Flex
        align="center"
        justify="center"
        bg="blackAlpha.200"
        h="calc(100vh - 150px)"
      >
        <Center
          w="100%"
          maxW={840}
          bg="white"
          top={100}
          position="absolute"
          borderRadius={5}
          p="6"
          boxShadow="0 1px 2px #ccc"
        >
          <FormControl as="form" onSubmit={handleSubmit} display="flex" flexDir="column" gap="4">
            <HStack spacing="4">
              <Box w="100%">
                <FormLabel htmlFor="nome">Nome completo</FormLabel>
                <Input id="nome" value={formData.nome} onChange={handleChange} />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} />
              </Box>
            </HStack>

            <HStack spacing="4">
              <Box w="100%">
                <FormLabel htmlFor="nasc">Data de Nascimento</FormLabel>
                <Input id="nasc" type="date" value={formData.nasc} onChange={handleChange} />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="natural">Naturalidade</FormLabel>
                <Input id="natural" value={formData.natural} onChange={handleChange} />
              </Box>
            </HStack>

            <HStack spacing="4">
              <Box w="100%">
                <FormLabel htmlFor="cel">Celular</FormLabel>
                <Input id="cel" type="text" value={formData.cel} onChange={handleChange} />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="telefone">Telefone</FormLabel>
                <Input id="telefone" type="text" value={formData.telefone} onChange={handleChange} />
              </Box>
            </HStack>

            <HStack spacing="4">
              <Box w="100%">
                <FormLabel htmlFor="endereco">Endereço</FormLabel>
                <Input id="endereco" value={formData.endereco} onChange={handleChange} />
              </Box>

              <Box w="100%">
                <FormLabel htmlFor="cidade">Cidade</FormLabel>
                <Input id="cidade" value={formData.cidade} onChange={handleChange} />
              </Box>
            </HStack>

            <HStack spacing="4">
              <Box w="100%">
                <FormLabel>Sexo</FormLabel>
                <RadioGroup defaultValue="Masculino" onChange={(value) => setFormData({ ...formData, sexo: value })}>
                  <HStack spacing="24px">
                    <Radio value="Masculino">Masculino</Radio>
                    <Radio value="Feminino">Feminino</Radio>
                    <Radio value="Outro">Outro</Radio>
                  </HStack>
                </RadioGroup>
              </Box>
            </HStack>

            <HStack justify="center">
              <Button
                w={240}
                p="6"
                type="submit"
                bg="teal.600"
                color="white"
                fontWeight="bold"
                fontSize="xl"
                mt="2"
                _hover={{ bg: "teal.800" }}
              >
                Enviar
              </Button>
            </HStack>
          </FormControl>
        </Center>
      </Flex>
    </Box>
  );
}

export default App;
