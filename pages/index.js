import { useCallback, useState } from "react";

import Head from "next/head";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import CarCard from "../components/CarCard";

import styles from "../styles/Home.module.css";

const API_URL =
  "https://api.carmart.ru/cars/temp?page=1&perPage=24&isNew[0]=1&orderBy[0][field]=year&orderBy[0][direction]=desc";

export async function getServerSideProps() {
  const fallbackBrands = [
    "Audi",
    "Honda",
    "Hyundai",
    "Kia",
    "Mitsubishi",
    "Volkswagen"
  ];
  try {
    const res = await fetch(API_URL);
    const {
      list,
      meta: {
        filters: { brand }
      }
    } = await res.json();
    return { props: { list, brands: brand } };
  } catch (error) {
    console.log("error", error.message);
    return { props: { list: [], brands: fallbackBrands } };
  }
}

export default function Home({ list, brands }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(list);

  const fetchCars = useCallback(async (brand) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}&brand=${brand}`);
      const data = await res.json();
      setItems(data.list);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  });

  const onBrandChange = useCallback((e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    fetchCars(brand);
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container fluid>
        <select
          className={styles.brandsSelect}
          name="brands"
          id="brands"
          value={selectedBrand}
          onChange={onBrandChange}
        >
          <option disabled value="">
            Марка
          </option>
          {brands.map((brand) => (
            <option value={brand} key={brand}>
              {brand}
            </option>
          ))}
        </select>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Row>
            {items.map((item) => (
              <CarCard item={item} key={item._id} />
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
