import { useState, useEffect } from "react";
import FormModal from "./FormModal";
import StatisticsModal from "./StatisticsModal";
import IDataUser from "./Interfaces";
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const columnHead = ["Modelo", "Marca", "Ano", "Preço", "Foto"];
export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredDataUser, setFilteredDataUser] = useState<IDataUser[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [dataUser, setDataUser] = useState<IDataUser[]>([]);

  const showModal = () => setOpenModal(true);
  const hideModal = () => setOpenModal(false);

  const showStatistics = () => setOpenStatistics(true);
  const hideStatistics = () => setOpenStatistics(false);

  const getUserInputs = (newDataUser: IDataUser) => {
    setDataUser([...dataUser, newDataUser]);
    localStorage.setItem(
      "dataUser",
      JSON.stringify([...dataUser, newDataUser])
    );
  };

  useEffect(() => {
    const cars = localStorage.getItem("dataUser");
    if (cars) {
      setDataUser(JSON.parse(cars));
    }
    if (searchInput) {
      const filteredCars = dataUser.filter((item) =>
        item.mark.toLowerCase().includes(searchInput.toLowerCase())
      );
      // Não atualize dataUser diretamente, crie um novo estado para os carros filtrados
      setFilteredDataUser(filteredCars);
    } else {
      // Se a caixa de pesquisa estiver vazia, volte para a lista original
      setFilteredDataUser(dataUser);
    }
  }, [dataUser, searchInput]);

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "5px",
          }}
        >
          <Box width={"50px"}>
            <img
              width={"100%"}
              src="https://cdn-icons-png.flaticon.com/512/3054/3054929.png"
              alt=""
            />
          </Box>
          <Typography>MotorsGladi</Typography>
        </Box>
      </AppBar>

      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          mt: "50px",
        }}
        maxWidth="xl"
      >
        <Box
          sx={{
            width: "400px",
            backgroundColor: "#F3f3f3f3",
            borderRadius: "16px",
            textAlign: "center",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h4" color={"Highlight"}>
            Veiculos
          </Typography>
          <Typography variant="subtitle1">Lista de veiculos</Typography>
          <Button variant="contained" onClick={showModal}>
            Registrar Um Veiculo
          </Button>
          <Button sx={{ mt: 3 }} variant="contained" onClick={showStatistics}>
            Mostrar Estatisticas
          </Button>
        </Box>
        <Box>
          <FormModal
            getUserInputs={getUserInputs}
            showModal={openModal}
            hideModal={hideModal}
          />

          {filteredDataUser.length == 0 ? (
            <Typography variant="subtitle1" sx={{ color: "#f3f3f3" }}>
              Nenhuma estatistica encontrado
            </Typography>
          ) : (
            <StatisticsModal
              hideStatistics={hideStatistics}
              openStatistics={openStatistics}
              dataUser={dataUser}
            />
          )}
        </Box>

        <Box
          sx={{
            backgroundColor: "#f3f3f3",
            width: "400px",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "16px",
          }}
        >
          <Typography variant="subtitle1" color={"Highlight"}>
            Pesquisar Carro por Marca
          </Typography>
          <TextField
            sx={{ width: "100%", marginBottom: "10px" }}
            variant="standard"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Box>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columnHead.map((item) => (
                    <TableCell key={item}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDataUser.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.model}</TableCell>
                    <TableCell>{data.mark}</TableCell>
                    <TableCell>{data.year}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>
                      <img width={"100px"} src={data.photo} alt={data.model} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}
