import React from 'react';
import { render } from '../../utils';
import Post from '../Post';

test('Post renders without crashing', () => {
  render(<Post />);
});