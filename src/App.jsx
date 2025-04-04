import { React, useEffect, useState } from "react";

import { addComment, deleteComment } from "./redux/commentSlice";
import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { Col, Container, Form, Row, Button, Card } from "react-bootstrap";
import "./App.css";

function App() {
  const [comment, setComment] = useState("");
  const [commentNote, setCommentNote] = useState("");
  const [movies, setmovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      return;
    }

    dispatch(addComment({ text: comment, note: commentNote }));

    setComment("");
  };

  const deleteComments = (id) => {
    dispatch(deleteComment(id));
  };

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

        <h2 size="lg">Commentaires</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="comment" className="mb-3">
            <Form.Label>Ajouter un commentaire</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* <p className="err">{errors.name?.message}</p> */}
          </Form.Group>

          <Form.Group controlId="note" className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              placeholder="Note"
              value={commentNote}
              onChange={(e) => setCommentNote(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="completed" className="mb-3">
            <Form.Check
              type="checkbox"
              label="J'accepte les conditions générales"
              // {...register("isCompleted")}
            />
            {/* <p className="err">{errors.isCompleted?.message}</p> */}
          </Form.Group>

          <Button type="submit">Ajouter</Button>
        </Form>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>
                <strong>Note : {comment.note}/5</strong>
              </p>
              {comment.text}
              <Button
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={() => deleteComments(comment.id)}
              >
                Supprimer
              </Button>
            </li>
          ))}
        </ul>
      </Row>
    </Container>
  );
}

export default App;
