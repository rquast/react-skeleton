import { defineFeature, loadFeature } from 'jest-cucumber';
import React from 'react';
import ReactDOM from 'react-dom';
import Todo from '../Todo';

const feature = loadFeature('./src/scenes/Todo/__features__/Todo.feature');

defineFeature(feature, test => {
  test('Launching a SpaceX rocket', ({ given, when, then }) => {
    let todo: any;

    given('I am Elon Musk attempting to launch a rocket into space', () => {
      const div = document.createElement('div');
      todo = <Todo />;
      ReactDOM.render(todo, div);
    });

    when('I launch the rocket', () => {
      todo.launch();
    });

    then('the rocket should end up in space', () => {
      expect(todo.isInSpace).toBe(true);
    });

    then('the booster(s) should land back on the launch pad', () => {
      expect(todo.boostersLanded).toBe(true);
    });

    then('nobody should doubt me ever again', () => {
      expect('people').not.toBe('haters');
    });
  });
});
