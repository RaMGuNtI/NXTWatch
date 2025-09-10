// jest.setup.ts or jest.setup.js
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for TextEncoder/TextDecoder
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as typeof TextEncoder;
  global.TextDecoder = TextDecoder as typeof TextDecoder;
}
