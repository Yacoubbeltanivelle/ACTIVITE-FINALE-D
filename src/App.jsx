import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Form, Row, Button, Card } from "react-bootstrap";
import "./App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function App() {
  const [movies, setmovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les produits existants
  useEffect(() => {
    async function fetchmovies() {
      try {
        const response = await fetch("https://jsonfakery.com/movies/random");
        if (!response.ok) {
          throw new Error(
            `Erreur HTTP: ${
              response.statusText ? response.statusText + " - " : ""
            }${response.status}`
          );
        }

        const data = await response.json();
        setmovies(data);
      } catch (err) {
        setError(
          "Il y a un problème de connexion avec le serveur...... " + err.message
        );
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchmovies();
  }, []);
  if (error) return <p>Erreur grave: {error}</p>;
  // Affichage d'un message de chargement tant que les données ne sont pas disponibles
  if (loading) return <p>Chargement...</p>;

  return (
    <Container>
      <Row>
        <Col key={movies.movie_id}>
          <Card>
            <Card.Img
              variant="top"
              src={movies.poster_path}
              alt={movies.original_title}
            />
            <Card.Body>
              <Card.Title>{movies.original_title}</Card.Title>
              <Card.Text className="text">
                Sortie le {movies.created_at}
              </Card.Text>
              <Card.Text className="text">{movies.overview}</Card.Text>
              <Card.Text className="text">
                Note moyenne: {movies.vote_average} ( {movies.vote_count} votes)
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Form></Form>
      </Row>
    </Container>
  );
}

export default App;
