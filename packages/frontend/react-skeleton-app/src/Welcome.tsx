import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Box,
  Section,
  Content,
  Container,
  Footer,
  Hero,
  Heading,
  Tile,
  Image
} from 'react-bulma-components';

class Welcome extends Component {
  render() {
    return (
      <div>
        <Navbar color="primary" fixed="top" active={false} transparent={false}>
          <Navbar.Brand>
            <Navbar.Item renderAs="a" href="#">
              <img
                src="https://bulma.io/images/bulma-logo.png"
                alt="Bulma: a modern CSS framework based on Flexbox"
                width="112"
                height="28"
              />
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Container>
              <Navbar.Item dropdown hoverable href="#">
                <Navbar.Link>First</Navbar.Link>
                <Navbar.Dropdown>
                  <Navbar.Item href="#">Subitem 1</Navbar.Item>
                  <Navbar.Item href="#">Subitem 2</Navbar.Item>
                </Navbar.Dropdown>
              </Navbar.Item>
              <Navbar.Item href="#">Second</Navbar.Item>
            </Navbar.Container>
            <Navbar.Container position="end">
              <Navbar.Item href="#">At the end</Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
        <Section>
          <Hero color="primary">
            <Hero.Body>
              <Container>
                <Heading>Hero title Primary</Heading>
                <Heading subtitle size={3}>
                  <Link to={`/`}>Home</Link>
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
        <Footer>
          <Container>
            <Content style={{ textAlign: 'center' }}>
              <p>
                <strong>Bulma</strong> by{' '}
                <a href="http://jgthms.com">Jeremy Thomas</a>. The source code
                is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
                . The website content is licensed{' '}
                <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                  CC BY NC SA 4.0
                </a>
                .
              </p>
            </Content>
          </Container>
        </Footer>
      </div>
    );
  }
}

export default Welcome;
