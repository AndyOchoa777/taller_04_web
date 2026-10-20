import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardTitle, CardText, Row, Col, Badge, Spinner } from 'reactstrap';
import './App.css';

function App() {
  const [healthMessage, setHealthMessage] = useState('');
  const [integrantesInfo, setIntegrantesInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Consumir endpoint /api/health
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setHealthMessage(data.message))
      .catch((err) => console.error('Error al conectar con /api/health:', err));

    // Consumir endpoint /api/info
    fetch('http://localhost:5000/api/info')
      .then((res) => res.json())
      .then((data) => {
        setIntegrantesInfo(data.integrantes);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al conectar con /api/info:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="my-5">
      {/* 3. Título en el Frontend */}
      <h1 className="text-center mb-4 display-4 text-primary font-weight-bold">Taller IV</h1>

      {/* 4. Sección con etiquetas: section, div, h4, p y estilos de CSS */}
      <section className="health-section">
        <div>
          <h4>Estado del Servidor API</h4>
          <p>{healthMessage || 'Verificando la conexión con el backend...'}</p>
        </div>
      </section>

      {/* 5. Componentes de Reactstrap para mostrar información de integrantes */}
      <section>
        <h3 className="mb-4">Información de los Integrantes</h3>
        {loading ? (
          <div className="text-center my-4">
            <Spinner color="primary" />
          </div>
        ) : (
          <Row>
            {integrantesInfo.map((persona, index) => (
              <Col md="6" key={index} className="mb-4">
                <Card className="shadow-sm border-0 bg-light">
                  <CardBody>
                    <CardTitle tag="h5" className="text-secondary">
                      Carnet: <strong>{persona.carnet}</strong>
                    </CardTitle>
                    <CardText>
                      <strong>Ciudad de Origen:</strong> {persona.ciudad} <br />
                      <strong>Carrera:</strong> {persona.carrera} <br />
                      <strong>Proyectos Realizados:</strong>{' '}
                      <Badge color="info">{persona.proyectosRealizados}</Badge>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </Container>
  );
}

export default App;