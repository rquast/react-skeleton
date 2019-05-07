import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Section,
  Container,
  Hero,
  Heading,
  Tile,
  Image
} from 'react-bulma-components';

class Home extends Component {
  render() {
    return (
      <>
        <Section>
          <Hero color="primary">
            <Hero.Body>
              <Container>
                <Heading>Hero title Primary</Heading>
                <Heading subtitle size={3}>
                  <Link to={`/welcome`}>Welcome</Link>
                </Heading>
              </Container>
            </Hero.Body>
          </Hero>
        </Section>
        <Section>
          <Box>
            <Tile kind="ancestor">
              <Tile size={8} vertical>
                <Tile>
                  <Tile kind="parent" vertical>
                    <Tile
                      renderAs="article"
                      kind="child"
                      notification
                      color="primary"
                    >
                      <Heading>Vertical...</Heading>
                      <Heading subtitle>Top tile</Heading>
                    </Tile>
                    <Tile
                      renderAs="article"
                      kind="child"
                      notification
                      color="warning"
                    >
                      <Heading>Tiles...</Heading>
                      <Heading subtitle>Bottom Tile...</Heading>
                    </Tile>
                  </Tile>
                  <Tile kind="parent">
                    <Tile
                      renderAs="article"
                      kind="child"
                      notification
                      color="info"
                    >
                      <Heading>Middle Tile...</Heading>
                      <Heading subtitle>With image Tile...</Heading>
                      <Image
                        size="4by3"
                        src="http://bulma.io/images/placeholders/640x480.png"
                      />
                    </Tile>
                  </Tile>
                </Tile>
                <Tile kind="parent">
                  <Tile
                    renderAs="article"
                    kind="child"
                    notification
                    color="danger"
                  >
                    <Heading>Wide tile</Heading>
                    <Heading subtitle>Aligned with the right tile</Heading>
                    <div className="content" />
                  </Tile>
                </Tile>
              </Tile>
              <Tile kind="parent">
                <Tile
                  renderAs="article"
                  kind="child"
                  notification
                  color="success"
                >
                  <div className="content">
                    <Heading>Tall tile</Heading>
                    <Heading subtitle>With even more content</Heading>
                    <div className="content" />
                  </div>
                </Tile>
              </Tile>
            </Tile>
          </Box>
        </Section>
      </>
    );
  }
}

export default Home;
