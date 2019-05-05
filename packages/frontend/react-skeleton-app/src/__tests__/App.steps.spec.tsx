import { defineFeature, loadFeature } from 'jest-cucumber';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const feature = loadFeature('./src/__tests__/__features__/App.feature');

defineFeature(feature, test => {
  test('Launching a SpaceX rocket', ({ given, when, then }) => {
    let app: any;

    given('I am Elon Musk attempting to launch a rocket into space', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
    });

    when('I launch the rocket', () => {
      app.launch();
    });

    then('the rocket should end up in space', () => {
      expect(app.isInSpace).toBe(true);
    });

    then('the booster(s) should land back on the launch pad', () => {
      expect(app.boostersLanded).toBe(true);
    });

    then('nobody should doubt me ever again', () => {
      expect('people').not.toBe('haters');
    });
  });
});
